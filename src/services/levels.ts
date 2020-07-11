import { CellType } from "./cell";


const level1 = {
    cellSize: 20,
    height: 60,
    width: 60,
    maxClicks: 2,
    map: [[CellType.empty,CellType.empty,CellType.empty],
[CellType.empty, CellType.normal, CellType.normal],
[CellType.empty, CellType.normal, CellType.normal]],
};

const level2 = {
    cellSize: 20,
    height: 60,
    width: 60,
    maxClicks: 3,
    map: [[CellType.normal,CellType.empty,CellType.empty],
[CellType.empty, CellType.normal, CellType.empty],
[CellType.normal, CellType.empty, CellType.normal]],
};

const level3 = {
    cellSize: 20,
    height: 60,
    width: 60,
    maxClicks: 3,
    map: [[CellType.normal,CellType.empty,CellType.empty],
[CellType.empty, CellType.normal, CellType.empty],
[CellType.normal, CellType.empty, CellType.normal]],
};

const level4 = {
    cellSize: 20,
    height: 60,
    width: 60,
    maxClicks: 3,
    map: [[CellType.empty,CellType.empty,CellType.empty],
[CellType.deadMatter, CellType.empty, CellType.empty],
[CellType.empty, CellType.empty, CellType.normal]],
};

const level5 = {
    cellSize: 20,
    height: 60,
    width: 60,
    maxClicks: 3,
    map: [[CellType.normal,CellType.empty,CellType.deadMatter],
[CellType.deadMatter, CellType.deadMatter, CellType.empty],
[CellType.empty, CellType.empty, CellType.empty]],
};
const level6 = {
    cellSize: 20,
    height: 100,
    width: 100,
    maxClicks: 5,
    map: [[CellType.empty,CellType.empty,CellType.empty,CellType.empty,CellType.empty],
[CellType.empty,CellType.empty,CellType.empty,CellType.empty,CellType.empty],
[CellType.empty,CellType.empty,CellType.empty,CellType.empty,CellType.empty],
[CellType.empty,CellType.empty,CellType.empty,CellType.empty,CellType.empty],
[CellType.empty,CellType.empty,CellType.empty,CellType.empty,CellType.empty]],
};

export function getLevel(levelNumber: number) {
    const x: { [key: string]: Level} = {
        1: level1,
        2: level2,
        3: level3,
        4: level4,
        5: level5,
        6: level6,
    };
console.log(x[levelNumber.toString()]);
    return x[levelNumber];
}

type Level = {
    cellSize: number;
    height: number;
    width: number;
    map: CellType[][];
}