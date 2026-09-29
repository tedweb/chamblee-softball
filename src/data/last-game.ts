// Homepage "Last game" and "Next on the calendar" data, derived from the GameChanger export.
// Update docs/data.json and rebuild to refresh.
import data from "../../docs/data.json";

interface Game {
  date: string;              // YYYY-MM-DD, in data.timezone
  opponent: string;
  homeAway: string;
  status: string;            // FINAL, SCHEDULED_TIME_ONLY, ...
  time?: string;             // e.g. "5:30 PM"
  chambleeScore?: number;
  opponentScore?: number;
}

export interface UpcomingGame {
  team: string;              // "Varsity", "Junior Varsity", "Middle School"
  title: string;             // "Chamblee Varsity Bulldogs @ Alcovy"
  start: string;             // ISO timestamp (UTC)
  label: string;             // "September 29, 5:30 PM ET"
}

const timeZone = data.timezone || "America/New_York";
const teamLabels: Record<string, string> = { varsity: "Varsity", jv: "Junior Varsity", ms: "Middle School", cms: "Middle School" };
const teamOrder = Object.keys(teamLabels);

// Convert a wall-clock date/time in `timeZone` to a real Date (handles EDT/EST automatically).
function zonedDate(date: string, time = "11:59 PM"): Date {
  const [y, m, d] = date.split("-").map(Number);
  const match = time.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
  let hour = match ? Number(match[1]) % 12 : 23;
  if (match && match[3].toUpperCase() === "PM") hour += 12;
  const minute = match ? Number(match[2]) : 59;
  const guess = Date.UTC(y, m - 1, d, hour, minute);
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
    .formatToParts(new Date(guess)).map(p => [p.type, p.value]));
  const asZoned = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute));
  return new Date(guess - (asZoned - guess));
}

const longDate = (date: string, withYear: boolean) =>
  zonedDate(date, "12:00 PM").toLocaleDateString("en-US", { timeZone, month: "long", day: "numeric", ...(withYear ? { year: "numeric" } : {}) });

const allGames = Object.entries(data.teams as Record<string, { name: string; games: Game[] }>)
  .flatMap(([key, team]) => team.games.map(game => ({ key, teamName: team.name, game })))
  .sort((a, b) => a.game.date.localeCompare(b.game.date) || teamOrder.indexOf(a.key) - teamOrder.indexOf(b.key));

// Most recent final with a score. On a shared date, Varsity wins over JV, JV over Middle School.
const finals = allGames.filter(({ game }) => game.status === "FINAL" && typeof game.chambleeScore === "number" && typeof game.opponentScore === "number");
const latestDate = finals.at(-1)?.game.date;
const last = finals.find(({ game }) => game.date === latestDate);

export const lastGame = last
  ? {
      team: teamLabels[last.key] ?? last.teamName,
      opponent: last.game.opponent,
      chambleeScore: last.game.chambleeScore as number,
      opponentScore: last.game.opponentScore as number,
      date: longDate(last.game.date, true),
    }
  : undefined;

// Every game not yet played, in start order. The page picks the first one still in the future.
export const upcomingGames: UpcomingGame[] = allGames
  .filter(({ game }) => game.status !== "FINAL" && !/cancel|postpone/i.test(game.status))
  .map(({ key, teamName, game }) => ({
    team: teamLabels[key] ?? teamName,
    title: `${teamName} ${game.homeAway === "away" ? "@" : "vs"} ${game.opponent}`,
    start: zonedDate(game.date, game.time).toISOString(),
    label: `${longDate(game.date, false)}${game.time ? `, ${game.time} ET` : ""}`,
  }))
  .sort((a, b) => a.start.localeCompare(b.start));
