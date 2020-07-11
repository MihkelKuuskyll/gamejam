export type Cell = {
    x: number;
    y: number;
    type: CellType;
    isOriginal: boolean;
}

export enum CellType {
    empty = 'empty',
    normal = 'normal',
    deadMatter = 'deadMatter',
}

export function getRandomCellType() {
    return Math.random() > 0.3 ? CellType.normal : CellType.deadMatter;
}