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

function calculateDungeons() {
    const currentLevel = parseInt(document.getElementById('current-level').value);
    const currentExp = parseInt(document.getElementById('current-exp').value);
    const targetLevel = parseInt(document.getElementById('target-level').value);
    let dungeonsNeeded = 0;
    let level = currentLevel;
    let exp = currentExp;

    while (level < targetLevel) {
        const expToNextLevel = expRequired[level];
        const expNeeded = expToNextLevel - exp;
        const dungeonsForThisLevel = Math.ceil(expNeeded / expPerDungeon[level]);
        dungeonsNeeded += dungeonsForThisLevel;
        level += 1;
        exp = 0;
    }

    document.getElementById('result').innerText = `Number of dungeons needed: ${dungeonsNeeded}`;
}
