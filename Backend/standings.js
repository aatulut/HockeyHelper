const url = "https://liiga.fi/api/v2/standings?season=2027";

const teamName = process.argv[2];

async function getStandings() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Tietojen haku epäonnistui!");
        }

        const data = await response.json();


const team = data.season.find(item =>
    item.teamName?.toLowerCase() === teamName.toLowerCase()
);

        if (!team) {
            console.log("Joukkuetta ei löytynyt!");
            return;
        }

        // Valitaan halutut attribuutit
        const stats = {
            ranking: team.ranking,
            games: team.games,
            wins: team.wins,
            overtimeWins: team.overtimeWins,
            losses: team.losses,
            ties: team.ties,
            points: team.points,
            goals: team.goals,
            goalsAgainst: team.goalsAgainst,
        };

        console.log(stats);

    } catch (error) {
        console.log("Virhe:", error.message);
    }
}

if (!teamName) {
    console.log("Anna joukkue, esim. node standings.js HIFK");
} else {
    getStandings();
}