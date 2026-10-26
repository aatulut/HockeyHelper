const url = "https://liiga.fi/api/v2/standings?season=2027";


async function getStandings(teamName = "hifk") {
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
    return { message: "Team not found" };
}

        const stats = {
            teamName: team.teamName,
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

        return stats;

    } catch (error) {
        return { error: error.message };
    }
}

module.exports = getStandings;