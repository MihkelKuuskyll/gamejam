import React, { useEffect, useState } from 'react';
import './game.css';
import BoardCell from '../board-cell/boardCell';
import cloneDeep from 'lodash/cloneDeep';
import { useInterval } from '../../services/hooks';
import { CellType, Cell, getRandomCellType } from '../../services/cell';

export default function Game() {
    const cellSize = 20;
    const height = 600;
    const width = 800;
    const rows = height / cellSize;
    const columns = width / cellSize;
    let boardRef: any;
    const [board, setBoard] = useState<Board>(createEmptyBoard());
    const [cells, setCells] = useState<Cell[]>([]);
    const [interval, setInterval] = useState(100);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setCells(makeCells());
    }, [board]);

    useInterval(() => {
        if (isRunning) {
            runIteration();
        }
    }, interval, [isRunning]);

    function createEmptyBoard() {
        const board: Board = [];
        for (let y = 0; y < rows; y += 1) {
            board[y] = [];
            for (let x = 0; x < columns; x += 1) {
                board[y][x] = CellType.empty;
            }
        }

        return board;
    }

    function runIteration() {
        const newBoard = cloneDeep(board);

        for (let y = 0; y < rows; y+=1) {
            for (let x = 0; x < columns; x+=1) {
                const neighbors = calculateNeighbors(board, x, y);
                if (board[y][x] === CellType.normal) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = CellType.normal;
                    } else {
                        newBoard[y][x] = CellType.empty;
                    }
                } else if (board[y][x] === CellType.empty && neighbors === 3) {
                    newBoard[y][x] = CellType.normal;
                }
            }
        }
        setBoard(newBoard);
    }

    function calculateNeighbors(board: Board, x: number, y: number) {
        let neighbors = 0;
        const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < directions.length; i+=1) {
            const dir = directions[i];
            const y1 = y + dir[0];
            const x1 = x + dir[1];

            if (x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && board[y1][x1] !== CellType.empty) {
                neighbors += 1;
            }
        }

        return neighbors;
    }

    function makeCells() {
        const cells: Cell[] = [];
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < columns; x += 1) {
                if (board[y][x] !== CellType.empty) {
                    cells.push({ x, y, type: board[y][x]});
                }
            }
        }

        return cells;
    }

    function onUserClick({ clientX, clientY }: { clientX: number; clientY: number }) {
        const elemOffset = getElementOffset();
        const offsetX = clientX - elemOffset.x;
        const offsetY = clientY - elemOffset.y;

        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);

        if (x >= 0 && x <= columns && y >= 0 && y <= rows) {
            const newBoard = cloneDeep(board);
            newBoard[y][x] = newBoard[y][x] === CellType.normal ? CellType.empty : getRandomCellType();
            setBoard(newBoard);
        }
    }

    function getElementOffset() {
        const rect = boardRef?.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: rect.left + window.pageXOffset - doc.clientLeft,
            y: rect.top + window.pageYOffset - doc.clientTop,
        };
    }

    function onIntervalChanged(event: any) {
        setInterval(event?.target?.value);
    }

    function stopGame() {
        setIsRunning(false);
    }

    function runGame() {
        setIsRunning(true);
    }

    function handleClear() {
        setBoard(createEmptyBoard());
    }

    function handleRandom() {
        const newBoard = cloneDeep(board);
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < columns; x += 1) {
                newBoard[y][x] = (Math.random() >= 0.7) ? CellType.normal : CellType.empty;
            }
        }
        setBoard(newBoard);
    }

    return (
        <div>
            <div
                className="Board"
                style={{ width, height, backgroundSize: `${cellSize}px ${cellSize}px` }}
                onClick={onUserClick}
                ref={(n) => {
                    boardRef = n;
                }}
            >
                {cells.map((cell) => (
                    <BoardCell cell={cell} size={cellSize} key={`${cell.x}-${cell.y}`}/>
                ))}
            </div>
            <div className="Controls">
            Update every <input value={interval} onChange={onIntervalChanged} /> msec
                    {isRunning ?
                        <button className="button" onClick={stopGame}>Stop</button> :
                        <button className="button" onClick={runGame}>Run</button> 
                    }
                        <button className="button" onClick={handleRandom}>Random</button>
                        <button className="button" onClick={handleClear}>Clear</button>
            </div>
        </div>
    );
}

type Board = CellType[][];