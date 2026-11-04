function normalizeTeamName(name) {
  const normalized = name.trim().toLowerCase();

  const aliases = {

    //HIFK
    hifki: "hifk",
    ifk: "hifk",
    "stadin kingit":"hifk",

    //TPS
    tepsi: "tps",

    //Tappara
    mohlot:"tappara",
    mouhot:"tappara",

    //ilves
    tupsukorvat:"ilves",
    ipa:"ilves",

    //K-espoo
    "kiekko-espoo": "k-espoo",
    "kiekko espoo": "k-espoo",

    // HPK
    kerho: "hpk",
    "hämeenlinnan pallokerho": "hpk",

     // Jokerit
    narrit: "jokerit",

    // JYP
    jypi: "jyp",
    jyppi: "jyp",
    "jyväskylän jyp": "jyp",

    // Pelicans
    pelsut: "pelicans",

    // Ässät
    pata: "ässät"
  };

  return aliases[normalized] || normalized;
}

module.exports = normalizeTeamName;