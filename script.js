const expRequired = {
    80: 5992000,
    81: 6171000,
    82: 6942000,
    83: 7205000,
    84: 7948000,
    85: 8287000,
    86: 9231000,
    87: 9529000,
    88: 10459000,
    89: 10838000,
    90: 13278000,
    91: 13659000,
    92: 15348000,
    93: 15912000,
    94: 17534000,
    95: 18263000,
    96: 20322000,
    97: 20957000,
    98: 22979000,
    99: 23789000,
    100: 24600000,
};

const expPerDungeon = {
    80: 2208400,
    81: 6566000,
    82: 6566000,
    83: 7590500,
    84: 7590500,
    85: 8814000,
    86: 8814000,
    87: 9967000,
    88: 9967000,
    89: 10795000,
    90: 10795000,
    91: 13278000,
    92: 13278000,
    93: 15348000,
    94: 15348000,
    95: 17534000,
    96: 17534000,
    97: 20322000,
    98: 20322000,
    99: 22979000,
    100: 22979000,
};

const dungeonNames = {
    80: "Amaurot",
    81: "The Tower of Zot",
    82: "The Tower of Zot",
    83: "The Tower of Babil",
    84: "The Tower of Babil",
    85: "Vanaspati",
    86: "Vanaspati",
    87: "Ktisis Hyperboreia",
    88: "Ktisis Hyperboreia",
    89: "The Aitiascope",
    90: "The Aitiascope",
    91: "Alzadaal's Legacy",
    92: "Alzadaal's Legacy",
    93: "The Fell Court of Troia",
    94: "The Fell Court of Troia",
    95: "Lapis Manalis",
    96: "Lapis Manalis",
    97: "The Aetherfont",
    98: "The Aetherfont",
    99: "The Lunar Subterrane",
    100: "The Lunar Subterrane",
};

function calculateDungeons() {
    const currentLevel = parseInt(document.getElementById('current-level').value);
    const currentExp = parseInt(document.getElementById('current-exp').value);
    const targetLevel = parseInt(document.getElementById('target-level').value);
    const armoryBuffMultiplier = parseFloat(document.getElementById('armory-buff').value);
    const hasRestedBonus = document.getElementById('rested-bonus-checkbox').checked;
    const hasExpFoodBuff = document.getElementById('exp-food-checkbox').checked;
    const restedBonusMultiplier = hasRestedBonus ? 0.5 : 0;
    const expFoodBuffMultiplier = hasExpFoodBuff ? 1.03 : 1;
    let level = currentLevel;
    let exp = currentExp;
    let result = '';
    let dungeonsSummary = {};
    let totalExpNeeded = 0;

    while (level < targetLevel) {
        const expToNextLevel = expRequired[level];
        const expNeeded = expToNextLevel - exp;
        const effectiveExpPerDungeon = expPerDungeon[level] * expFoodBuffMultiplier * (1 + armoryBuffMultiplier + restedBonusMultiplier);
        const dungeonsForThisLevel = Math.ceil(expNeeded / effectiveExpPerDungeon);
        dungeonsSummary[dungeonNames[level]] = dungeonsSummary[dungeonNames[level]] || 0;
        dungeonsSummary[dungeonNames[level]] += dungeonsForThisLevel;
        totalExpNeeded += dungeonsForThisLevel * effectiveExpPerDungeon;
        level += 1;
        exp = 0; // Reset exp after reaching next level
    }

    result += 'To reach your target level, you should run the following dungeons:\n\n';
    for (const dungeon in dungeonsSummary) {
        result += `${dungeon}: ${dungeonsSummary[dungeon]} times\n`;
    }
    result += `\nTotal dungeons needed: ${Math.ceil(totalExpNeeded / (expPerDungeon[currentLevel] * expFoodBuffMultiplier * (1 + armoryBuffMultiplier + restedBonusMultiplier)))}`;
    document.getElementById('result').innerText = result;
}
