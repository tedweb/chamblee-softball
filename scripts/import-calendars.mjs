import fs from 'node:fs';
// Only public game fields are copied from the locally downloaded feeds.
const unescape = value => value.replace(/\\n/gi, '\n').replace(/\\([,;\\])/g, '$1');
const games = [], calendars = [];
for (const [key, slug, name] of [['varsity', 'varsity', 'Varsity'], ['jv', 'junior-varsity', 'Junior Varsity'], ['middle', 'middle-school', 'Middle School']]) {
  const source = fs.readFileSync(`work/calendars/${key}.ics`, 'utf8').replace(/\r?\n[ \t]/g, '');
  const publicEvents = [];
  for (const block of source.matchAll(/BEGIN:VEVENT\r?\n([\s\S]*?)END:VEVENT/g)) {
    const fields = Object.fromEntries(block[1].trim().split(/\r?\n/).map(line => {
      const separator = line.indexOf(':');
      return [line.slice(0, separator), line.slice(separator + 1)];
    }));
    if (fields.CLASS !== 'PUBLIC' || !/ (vs|@) /.test(fields.SUMMARY ?? '')) continue;
    if (!/^\d{8}T\d{6}Z$/.test(fields.DTSTART)) throw new Error('Unsupported calendar date format');
    const date = fields.DTSTART.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, '$1-$2-$3T$4:$5:$6Z');
    games.push({ team: slug, name, title: unescape(fields.SUMMARY), start: date, location: unescape(fields.LOCATION ?? ''), status: fields.STATUS ?? 'CONFIRMED' });
    publicEvents.push(['BEGIN:VEVENT', ...['UID', 'DTSTAMP', 'DTSTART', 'DTEND', 'SUMMARY', 'LOCATION', 'STATUS'].filter(key => fields[key]).map(key => `${key}:${fields[key]}`), 'END:VEVENT'].join('\r\n'));
  }
  const calendar = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Chamblee Softball//Schedule//EN', `X-WR-CALNAME:Chamblee ${name}`, ...publicEvents, 'END:VCALENDAR', ''].join('\r\n');
  fs.mkdirSync('public/calendars', { recursive: true });
  fs.writeFileSync(`public/calendars/${slug}.ics`, calendar);
  calendars.push({ team: slug, name, count: publicEvents.length });
}
games.sort((a, b) => a.start.localeCompare(b.start));
fs.writeFileSync('src/data/schedule.json', JSON.stringify({ updated: new Date().toISOString(), calendars, games }, null, 2) + '\n');
console.log(calendars);
