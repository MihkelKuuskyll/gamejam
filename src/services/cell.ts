export type Board = CellType[][];
export type CellLocation = { x: number; y: number };

export type Cell = {
    x: number;
    y: number;
    type: CellType;
}

export enum CellType {
    antibody = 'antibody',
    deadMatter = 'deadMatter',
    empty = 'empty',
    normal = 'normal',
    superSpreader = 'superSpreader',
}

export function activateAntiBodies(antiBodies: CellLocation[], board: Board, columns: number, rows: number) {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    antiBodies.forEach(antibody => {
        directions.forEach(direction => {
            const y1 = antibody.y + direction[0];
            const x1 = antibody.x + direction[1];
            if (x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && board[y1][x1] === CellType.normal) {
                board = killAllNearbyEnemies(antibody, board, columns, rows);
            }
        });
    });
    return board;
}

export function activateSuperSpreaders(superSpreaders: CellLocation[], board: Board, columns: number, rows: number) {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    superSpreaders.forEach(superSpreader => {
        directions.forEach(direction => {
            const y1 = superSpreader.y + direction[0];
            const x1 = superSpreader.x + direction[1];
            if (x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && board[y1][x1] === CellType.normal) {
                board = infectAllNearbyEmpty(superSpreader, board, columns, rows);
            }
        });
    });
    return board;
}

export function getRandomCellType() {
    if (Math.random() > 0.5) {
        return CellType.normal;
    }
    if (Math.random() > 0.5) {
        return CellType.deadMatter;
    }
    if (Math.random() > 0.5) {
        return CellType.superSpreader;
    }
    return CellType.antibody;
}

function infectAllNearbyEmpty(superSpreader: CellLocation, board: Board, columns: number, rows: number) {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    directions.forEach(direction => {
        const y1 = superSpreader.y + direction[0];
        const x1 = superSpreader.x + direction[1];
        if (x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && board[y1][x1] === CellType.normal) {
            board[y1][x1] = CellType.empty;
        }
    });
    board[superSpreader.y][superSpreader.x] = CellType.normal;
    return board;
}

function killAllNearbyEnemies(antibody: CellLocation, board: Board, columns: number, rows: number) {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    directions.forEach(direction => {
        const y1 = antibody.y + direction[0];
        const x1 = antibody.x + direction[1];
        if (x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && [CellType.superSpreader, CellType.normal].includes(board[y1][x1])) {
            board[y1][x1] = CellType.empty;
        }
    });
    board[antibody.y][antibody.x] = CellType.empty;
    return board;
}