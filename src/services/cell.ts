export type Board = CellType[][];
export type CellLocation = { x: number; y: number };

export type Cell = {
    x: number;
    y: number;
    type: CellType;
    isOriginal: boolean;
};

export enum CellType {
    antibody = 'antibody',
    deadMatter = 'deadMatter',
    empty = 'empty',
    virus = 'virus',
    superSpreader = 'superSpreader',
}

export function activateAntiBodies(antiBodies: CellLocation[], board: Board, columns: number, rows: number) {
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
    ];
    antiBodies.forEach((antibody) => {
        directions.forEach((direction) => {
            const y1 = antibody.y + direction[0];
            const x1 = antibody.x + direction[1];
            if (x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && [CellType.virus, CellType.superSpreader].includes(board[y1][x1])) {
                board = killAllNearbyEnemies(antibody, board, columns, rows);
            }
        });
    });
    return board;
}

export function activateSuperSpreaders(superSpreaders: CellLocation[], board: Board, columns: number, rows: number) {
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
    ];
    superSpreaders.forEach((superSpreader) => {
        directions.forEach((direction) => {
            const y1 = superSpreader.y + direction[0];
            const x1 = superSpreader.x + direction[1];
            const hasNearbyVirus = x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && board[y1][x1] === CellType.virus;
            if (hasNearbyVirus) {
                board = infectAllNearbyEmpty(superSpreader, board, columns, rows);
            }
        });
    });
    return board;
}

export function getNeighbors(board: Board, x: number, y: number, columns: number, rows: number) {
    let neighbors = 0;
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
    ];
    for (let i = 0; i < directions.length; i += 1) {
        const direction = directions[i];
        const y1 = y + direction[0];
        const x1 = x + direction[1];

        const isNearbyCellViralFriendly =
            x1 >= 0 &&
            x1 < columns &&
            y1 >= 0 &&
            y1 < rows &&
            board[y1][x1] === CellType.virus;
        if (isNearbyCellViralFriendly) {
            neighbors += 1;
        }
    }

    return neighbors;
}

function infectAllNearbyEmpty(superSpreader: CellLocation, board: Board, columns: number, rows: number) {
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
    ];
    directions.forEach((direction) => {
        const y1 = superSpreader.y + direction[0];
        const x1 = superSpreader.x + direction[1];
        const isNearbyEmptyCell = x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && board[y1][x1] === CellType.empty;
        if (isNearbyEmptyCell) {
            board[y1][x1] = CellType.virus;
        }
    });
    board[superSpreader.y][superSpreader.x] = CellType.virus;
    return board;
}

function killAllNearbyEnemies(antibody: CellLocation, board: Board, columns: number, rows: number) {
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
    ];
    let hasKilledEnemies = false;
    directions.forEach((direction) => {
        const y1 = antibody.y + direction[0];
        const x1 = antibody.x + direction[1];
        const isNearbyViralCell =
            x1 >= 0 &&
            x1 < columns &&
            y1 >= 0 &&
            y1 < rows &&
            [CellType.superSpreader, CellType.virus].includes(board[y1][x1]);
        if (isNearbyViralCell) {
            hasKilledEnemies = true;
            board[y1][x1] = CellType.empty;
        }
    });
    if (hasKilledEnemies) {
        board[antibody.y][antibody.x] = CellType.empty;
    }

    return board;
}
