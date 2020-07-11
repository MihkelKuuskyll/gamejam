import React, { useEffect, useState } from 'react';
import './game.css';
import BoardCell from '../board-cell/boardCell';
import cloneDeep from 'lodash/cloneDeep';
import { useInterval } from '../../services/hooks';
import { CellType, Cell, getRandomCellType, Board, activateSuperSpreaders, activateAntiBodies } from '../../services/cell';
import { getLevel } from '../../services/levels';

export default function Game() {
    const { height, width, cellSize, map } = getLevel(1);
    const rows = height / cellSize;
    const columns = width / cellSize;
    let boardRef: any;
    const [board, setBoard] = useState<Board>(map);
    const [cells, setCells] = useState<Cell[]>([]);
    const [interval, setInterval] = useState(100);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('');
    const [turnCounter, setTurnCounter] = useState(0);

    useEffect(() => {
        setCells(makeCells());
    }, [board]);

    useInterval(() => {
        if (isRunning) {
            nextTurn();
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

    function nextTurn() {
        const newBoard = getNextBoard(board);
        const hasAnyChanges = getHasAnyChanges(board, newBoard);
        if (hasAnyChanges) {
            setBoard(newBoard);
        }
        else {
            setIsRunning(false);
            setMessage(`GG no re, it took ${turnCounter} iterations.`);
        }
        setTurnCounter(turnCounter+1);
    }

    function getNextBoard(board: Board) {
        let newBoard = cloneDeep(board);

        const antiBodies = [];
        const superSpreaders = [];
        for (let y = 0; y < rows; y+=1) {
            for (let x = 0; x < columns; x+=1) {
                const neighbors = calculateNeighbors(board, x, y);
                const isEmptyWith3Neighbors = board[y][x] === CellType.empty && neighbors === 3;
                if (board[y][x] === CellType.normal) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = CellType.normal;
                    } else {
                        newBoard[y][x] = CellType.empty;
                    }
                } else if (isEmptyWith3Neighbors) {
                    newBoard[y][x] = CellType.normal;
                } else if (board[y][x] === CellType.antibody) {
                    antiBodies.push({ x, y });
                } else if (board[y][x] === CellType.superSpreader) {
                    superSpreaders.push({ x, y });
                }
            }
        }
        newBoard = activateSuperSpreaders(superSpreaders, newBoard, columns, rows);
        newBoard = activateAntiBodies(antiBodies, newBoard, columns, rows);
        return newBoard;
    }

    function calculateNeighbors(board: Board, x: number, y: number) {
        let neighbors = 0;
        const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < directions.length; i+=1) {
            const direction = directions[i];
            const y1 = y + direction[0];
            const x1 = x + direction[1];

            if (x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && board[y1][x1] !== CellType.empty) {
                neighbors += 1;
            }
        }

        return neighbors;
    }

    function getHasAnyChanges(board: Board, newBoard: Board) {
        let hasAnyChanges = false;
        for (let y = 0; y < rows; y+=1) {
            for (let x = 0; x < columns; x+=1) {
                if (board[y][x] !== newBoard[y][x]) {
                    hasAnyChanges = true;
                    break;
                }
            }
        }
        return hasAnyChanges;
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

    function editCell({ clientX, clientY }: { clientX: number; clientY: number }) {
        setMessage("");
        const elemOffset = getElementOffset();
        const offsetX = clientX - elemOffset.x;
        const offsetY = clientY - elemOffset.y;

        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);

        if (x >= 0 && x <= columns && y >= 0 && y <= rows) {
            const newBoard = cloneDeep(board);
            newBoard[y][x] = newBoard[y][x] !== CellType.empty ? CellType.empty : getRandomCellType();
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
        setTurnCounter(0);
    }

    function handleClear() {
        setMessage("");
        setBoard(createEmptyBoard());
    }

    function handleRandom() {
        setMessage("");
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
                onClick={editCell}
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
            <div className="Message">
                {message}
            </div>
        </div>
    );
}
