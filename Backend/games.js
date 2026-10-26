
const url = "https://liiga.fi/api/v2/games?season=2027&tournament=runkosarja";

async function getNextGame(mode = "hifk") {
    mode = mode.toLowerCase();
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

module.exports = getNextGame;
