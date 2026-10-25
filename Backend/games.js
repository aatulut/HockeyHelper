
const url = "https://liiga.fi/api/v2/games?season=2027&tournament=runkosarja";

const mode = (process.argv[2] || "hifk").toLowerCase();

async function getNextGame() {
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

    const isHIFK =
        home?.toLowerCase() === "hifk" ||
        away?.toLowerCase() === "hifk";

    const isPKSeutu =
        city === "helsinki" ||
        city === "espoo" ||
        city === "vantaa";

    const isFuture = new Date(game.start) > new Date();

    if (mode === "hifk") {
        return isHIFK && isFuture && !game.ended;
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
            console.log("Tulevia otteluita ei löytynyt.");
            return;
        }

        console.log(
            "Match:",
            game.homeTeam.teamName,
            "-",
            game.awayTeam.teamName
        );

        console.log(
            "Date and time:",
            new Date(game.start).toLocaleString("fi-FI", {
                timeZone: "Europe/Helsinki"
            })
        );

        console.log("Rink:", game.iceRink?.name ?? "Unknown");
        console.log("City:", game.iceRink?.city ?? "Unknown");
        console.log("Address:", game.iceRink?.streetAddress ?? "Unknown");
        console.log("Tickets:", game.buyTicketsUrl ?? "No vendor listed");

    } catch (error) {
        console.log("Error:", error.message);
    }
}

getNextGame();
