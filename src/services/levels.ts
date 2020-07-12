import { CellType, Board } from './cell';

export function getLevel(levelNumber: number) {
    const x: { [key: string]: Level } = {
        1: level1,
        2: level2,
        3: firstGlider,
        4: firstDeadMatter,
        5: firstSuperSpread,
        6: level6,
        7: level7,
        8: level8,
    };
    return x[levelNumber];
}

type Level = {
    cellSize: number;
    height: number;
    width: number;
    maxClicks: number;
    map: Board;
};

export const levelEndMessage = {
    success: (turnCounter: number) =>
        `GG, you did it! It took ${turnCounter} you iterations. Next time it won't be as easy!`,
    fail: (turnCounter: number) =>
        `You have failed to stop the virus from spreading, it took you  ${turnCounter} iterations.`,
};

const level1 = {
    cellSize: 80,
    height: 240,
    width: 240,
    maxClicks: 1,
    map: [
        [CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.virus, CellType.virus],
        [CellType.empty, CellType.virus, CellType.virus],
    ],
};

const level2 = {
    cellSize: 60,
    height: 420,
    width: 420,
    maxClicks: 1,
    map: [
        [CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.virus, CellType.virus, CellType.virus],
        [CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
    ],
};

const firstGlider = {
    cellSize: 47,
    height: 470,
    width: 470,
    maxClicks: 1,
    map: [
        [
            CellType.empty,
            CellType.virus,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
        ],
        [
            CellType.empty,
            CellType.empty,
            CellType.virus,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
        ],
        [
            CellType.virus,
            CellType.virus,
            CellType.virus,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
        ],
        [
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
        ],
        [
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
        ],
        [
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
        ],
        [
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.virus,
        ],
        [
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.virus,
            CellType.empty,
        ],
        [
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.virus,
            CellType.virus,
            CellType.empty,
            CellType.virus,
        ],
        [
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.empty,
            CellType.virus,
            CellType.empty,
            CellType.empty,
            CellType.virus,
            CellType.empty,
        ],
    ],
};

const firstDeadMatter = {
    cellSize: 70,
    height: 420,
    width: 420,
    maxClicks: 1,
    map: [
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.virus, CellType.virus, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.virus, CellType.virus, CellType.empty, CellType.empty, CellType.empty],
        [CellType.deadMatter, CellType.deadMatter, CellType.deadMatter, CellType.virus, CellType.virus, CellType.empty],
        [CellType.virus, CellType.virus, CellType.empty, CellType.virus, CellType.virus, CellType.empty],
        [CellType.virus, CellType.virus, CellType.empty, CellType.empty, CellType.virus, CellType.virus],
    ],
};

const firstSuperSpread
 = {
    cellSize: 47,
    height: 470,
    width: 470,
    maxClicks: 1,
    map: [
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.virus, CellType.virus, CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.superSpreader, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
    ],
};


const level6 = {
    cellSize: 47,
    height: 470,
    width: 470,
    maxClicks: 2,
    map: [
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.superSpreader, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.superSpreader, CellType.superSpreader, CellType.empty],
        [CellType.virus, CellType.empty, CellType.empty, CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.deadMatter],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.superSpreader],
        [CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.virus, CellType.virus, CellType.virus, CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.superSpreader],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.deadMatter],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.superSpreader, CellType.empty, CellType.empty],
        [CellType.empty, CellType.superSpreader, CellType.empty, CellType.superSpreader, CellType.empty, CellType.superSpreader, CellType.superSpreader, CellType.empty, CellType.empty, CellType.empty],
    ],
};

const level7 = {
    cellSize: 47,
    height: 470,
    width: 470,
    maxClicks: 1,
    map: [
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.deadMatter, CellType.superSpreader],
        [CellType.empty, CellType.virus, CellType.virus, CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.deadMatter, CellType.empty],
        [CellType.virus, CellType.virus, CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.superSpreader, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.superSpreader, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.deadMatter, CellType.deadMatter, CellType.deadMatter, CellType.superSpreader, CellType.empty, CellType.superSpreader, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.virus, CellType.virus, CellType.empty, CellType.empty],
        [CellType.empty, CellType.superSpreader, CellType.deadMatter, CellType.empty, CellType.empty, CellType.empty, CellType.virus, CellType.virus, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.deadMatter, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.virus, CellType.virus],
        [CellType.virus, CellType.virus, CellType.virus, CellType.virus, CellType.virus, CellType.virus, CellType.virus, CellType.virus, CellType.virus, CellType.virus],
    ],
};

const level8 = {
    cellSize: 47,
    height: 470,
    width: 470,
    maxClicks: 3,
    map: [
        [CellType.empty, CellType.virus, CellType.empty, CellType.deadMatter, CellType.antibody, CellType.antibody, CellType.deadMatter, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.virus, CellType.empty, CellType.deadMatter, CellType.empty, CellType.empty, CellType.deadMatter, CellType.virus, CellType.virus, CellType.virus],
        [CellType.empty, CellType.virus, CellType.empty, CellType.deadMatter, CellType.empty, CellType.empty, CellType.deadMatter, CellType.empty, CellType.empty, CellType.empty],
        [CellType.deadMatter, CellType.empty, CellType.deadMatter, CellType.deadMatter, CellType.virus, CellType.empty, CellType.deadMatter, CellType.deadMatter, CellType.empty, CellType.empty],
        [CellType.superSpreader, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.virus, CellType.empty, CellType.empty, CellType.superSpreader, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.virus, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.superSpreader, CellType.deadMatter, CellType.deadMatter, CellType.virus, CellType.empty, CellType.deadMatter, CellType.deadMatter, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.deadMatter, CellType.empty, CellType.empty, CellType.deadMatter, CellType.empty, CellType.virus, CellType.empty],
        [CellType.virus, CellType.virus, CellType.virus, CellType.deadMatter, CellType.empty, CellType.empty, CellType.deadMatter, CellType.empty, CellType.virus, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.deadMatter, CellType.antibody, CellType.antibody, CellType.deadMatter, CellType.empty, CellType.virus, CellType.empty],
    ]
};
