// Season records, calculated from the GameChanger export.
import gamechanger from "../../docs/data.json";

interface Game { status: string; chambleeScore?: number; opponentScore?: number; regionalGame?: boolean | string; }
const gcTeams = gamechanger.teams as Record<string, { games?: Game[] }>;

// regionalGame may be stored as true or as the text "true"; accept both.
const isRegional = (game: Game) => game.regionalGame === true || String(game.regionalGame).toLowerCase() === "true";

// Count wins, losses and ties from FINAL games that have a score.
// Ties are shown only when there is at least one (e.g. JV displays "8–6").
function record(games: Game[]) {
  let wins = 0, losses = 0, ties = 0;
  for (const game of games) {
    if (game.status !== "FINAL" || typeof game.chambleeScore !== "number" || typeof game.opponentScore !== "number") continue;
    if (game.chambleeScore > game.opponentScore) wins++;
    else if (game.chambleeScore < game.opponentScore) losses++;
    else ties++;
  }
  return ties > 0 ? `${wins}–${losses}–${ties}` : `${wins}–${losses}`;
}

function teamRecords(key: string) {
  const games = gcTeams[key]?.games ?? [];
  const regionalGames = games.filter(isRegional);
  return {
    overall: record(games),
    // Only shown when the team has at least one game marked regionalGame = true.
    region: regionalGames.length > 0 ? record(regionalGames) : null,
  };
}

export const seasonRecords = {
  varsity: { name: "Varsity", ...teamRecords("varsity") },
  "junior-varsity": { name: "Junior Varsity", ...teamRecords("jv") },
  "middle-school": { name: "Middle School", ...teamRecords("ms") },
};
