
const url = "https://liiga.fi/api/v2/games?season=2027&tournament=runkosarja";
const normalizeTeamName = require("./utils/normalizeTeamName");

async function getNextGame(mode = "hifk") {
    mode = normalizeTeamName(mode);
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Game fetch failed");
        }

        const games = await response.json();

        if (!Array.isArray(games)) {
            throw new Error("API couldnt fetch any games");
        }

const upcomingGames = games.filter(game => {

    const home = game.homeTeam?.teamName;
    const away = game.awayTeam?.teamName;
    const city = game.iceRink?.city?.toLowerCase();

    const isSelectedTeam =
    home?.toLowerCase() === mode ||
    away?.toLowerCase() === mode;

    const isPKSeutu =
        city === "helsinki" ||
        city === "espoo" ||
        city === "vantaa";

    const isFuture = new Date(game.start) > new Date();

    if (mode !== "games") {
        return isSelectedTeam && isFuture && !game.ended;
    }

    if (mode === "games") {
        return isPKSeutu && isFuture && !game.ended;
    }

    return false;
});

        upcomingGames.sort((a, b) =>
            new Date(a.start) - new Date(b.start)
        );

        const game = upcomingGames[0];

        if (!game) {
            return { message: "No upcoming matches found" };
        }

        return {
    homeTeam: game.homeTeam.teamName,
    awayTeam: game.awayTeam.teamName,

    date: new Date(game.start).toLocaleString("fi-FI", {
        timeZone: "Europe/Helsinki"
    }),

    rink: game.iceRink?.name ?? "Unknown",
    city: game.iceRink?.city ?? "Unknown",
    address: game.iceRink?.streetAddress ?? "Unknown",
    tickets: game.buyTicketsUrl ?? "No vendor listed"
};

    } catch (error) {
        console.log("Error:", error.message);
    }
}

async function getNextLocalGame(city) {
  const response = await fetch(url);
  const games = await response.json();

  const upcomingLocalGames = games.filter((game) => {
    const gameCity = game.iceRink?.city?.toLowerCase();
    const isFuture = new Date(game.start) > new Date();

    return (
      gameCity === city.trim().toLowerCase() &&
      isFuture &&
      !game.ended
    );
  });

  upcomingLocalGames.sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  const game = upcomingLocalGames[0];

  if (!game) {
    return {
      message: "No upcoming games found in this city"
    };
  }

  return {
    homeTeam: game.homeTeam.teamName,
    awayTeam: game.awayTeam.teamName,
    date: new Date(game.start).toLocaleString("fi-FI", {
      timeZone: "Europe/Helsinki"
    }),
    rink: game.iceRink?.name ?? "Unknown",
    city: game.iceRink?.city ?? "Unknown",
    address: game.iceRink?.streetAddress ?? "Unknown",
    tickets: game.buyTicketsUrl ?? "No vendor listed"
  };
}

async function getUpcomingGames() {
  const response = await fetch(url);
  const games = await response.json();

  const now = new Date();

  // Monday 00:00
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();

  const daysSinceMonday = day === 0 ? 6 : day - 1;

  startOfWeek.setDate(startOfWeek.getDate() - daysSinceMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  // Next Monday 00:00
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const upcomingGames = games
    .filter((game) => {
      const gameStart = new Date(game.start);

      return (
        gameStart >= startOfWeek &&
        gameStart < endOfWeek &&
        gameStart > now &&
        !game.ended
      );
    })
    .sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );

  return upcomingGames.map((game) => ({
    gameId: game.id,
    homeTeam: game.homeTeam.teamName,
    awayTeam: game.awayTeam.teamName,
    gameStart: game.start,
    rink: game.iceRink?.name ?? "Unknown",
    city: game.iceRink?.city ?? "Unknown"
  }));
}

module.exports = {
  getNextGame,
  getNextLocalGame,
  getUpcomingGames
};