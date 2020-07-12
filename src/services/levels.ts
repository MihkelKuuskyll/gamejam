import { CellType, Board } from './cell';

const level1 = {
    cellSize: 20,
    height: 60,
    width: 60,
    maxClicks: 3,
    map: [
        [CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.virus, CellType.virus],
        [CellType.empty, CellType.virus, CellType.virus],
    ],
};

const level2 = {
    cellSize: 20,
    height: 60,
    width: 60,
    maxClicks: 3,
    map: [
        [CellType.virus, CellType.empty, CellType.empty],
        [CellType.empty, CellType.virus, CellType.empty],
        [CellType.virus, CellType.empty, CellType.virus],
    ],
};

const oneAntibodyLevel = {
    cellSize: 20,
    height: 200,
    width: 200,
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

const level4 = {
    cellSize: 20,
    height: 60,
    width: 60,
    maxClicks: 3,
    map: [
        [CellType.empty, CellType.empty, CellType.empty],
        [CellType.deadMatter, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.virus],
    ],
};

const level5 = {
    cellSize: 20,
    height: 60,
    width: 60,
    maxClicks: 3,
    map: [
        [CellType.virus, CellType.empty, CellType.deadMatter],
        [CellType.deadMatter, CellType.deadMatter, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty],
    ],
};
const level6 = {
    cellSize: 20,
    height: 100,
    width: 100,
    maxClicks: 5,
    map: [
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
    ],
};
const antibodyExampleLevel = {
    cellSize: 20,
    height: 100,
    width: 100,
    maxClicks: 5,
    map: [
        [CellType.antibody, CellType.empty, CellType.virus, CellType.empty, CellType.empty],
        [CellType.empty, CellType.antibody, CellType.virus, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.antibody, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.antibody, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
    ],
};
const superSpreaderExampleLevel = {
    cellSize: 20,
    height: 100,
    width: 100,
    maxClicks: 5,
    map: [
        [CellType.superSpreader, CellType.virus, CellType.virus, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.virus, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
        [CellType.empty, CellType.empty, CellType.empty, CellType.empty, CellType.empty],
    ],
};

export function getLevel(levelNumber: number) {
    const x: { [key: string]: Level } = {
        1: level1,
        2: level2,
        3: oneAntibodyLevel,
        4: level4,
        5: level5,
        6: level6,
        7: antibodyExampleLevel,
        8: superSpreaderExampleLevel,
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
