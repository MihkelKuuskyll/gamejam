import React, { useEffect, useState } from 'react';
import './game.css';
import Cell from '../cell/cell';
import cloneDeep from 'lodash/cloneDeep';
import { useInterval } from '../../services/hooks';

export default function Game() {
    const cellSize = 20;
    const height = 60;
    const width = 60;
    const rows = height / cellSize;
    const columns = width / cellSize;
    let boardRef: any;
    const [board, setBoard] = useState<number[][]>(createEmptyBoard());
    const [cells, setCells] = useState<{ x: number; y: number }[]>([]);
    const [interval, setInterval] = useState(100);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setCells(makeCells());
    }, [board]);

    useInterval(() => {
        if (isRunning) {
            runIteration();
        }
    }, interval, [isRunning]);

    function createEmptyBoard() {
        const board: number[][] = [];
        for (let y = 0; y < rows; y += 1) {
            board[y] = [];
            for (let x = 0; x < columns; x += 1) {
                board[y][x] = 0;
            }
        }

        return board;
    }

    function onUserClick({ clientX, clientY }: { clientX: number; clientY: number }) {
        setMessage("");
        const elemOffset = getElementOffset();
        const offsetX = clientX - elemOffset.x;
        const offsetY = clientY - elemOffset.y;

        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);

        if (x >= 0 && x <= columns && y >= 0 && y <= rows) {
            const newBoard = cloneDeep(board);
            newBoard[y][x] = Boolean(newBoard[y][x]) === true ? 0 : 1;
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

    function makeCells() {
        const cells = [];
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < columns; x += 1) {
                if (board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
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
        setMessage("");
        setBoard(createEmptyBoard());
    }

    function handleRandom() {
        setMessage("");
        const newBoard = cloneDeep(board);
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < columns; x += 1) {
                newBoard[y][x] = (Math.random() >= 0.7) ? 1 : 0;
            }
        }
        setBoard(newBoard);
    } 
    function runIteration() {
        const newBoard = createEmptyBoard();

        for (let y = 0; y < rows; y+=1) {
            for (let x = 0; x < columns; x+=1) {
                const neighbors = calculateNeighbors(board, x, y);
                if (board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = 1;
                    } else {
                        newBoard[y][x] = 0;
                    }
                } else if (!board[y][x] && neighbors === 3) {
                    newBoard[y][x] = 1;
                }
            }
        }

        let hasAnyChanges = false;
        for (let y = 0; y < rows; y+=1) {
            for (let x = 0; x < columns; x+=1) {
                if (board[y][x] !== newBoard[y][x]) {
                    hasAnyChanges = true;
                    break;
                }
            }
        }
        if (hasAnyChanges) {
            setBoard(newBoard);
        }
        else {
            setIsRunning(false);
            setMessage("GG no re");
        }
    }

    function calculateNeighbors(board: number[][], x: number, y: number) {
        let neighbors = 0;
        const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < directions.length; i+=1) {
            const dir = directions[i];
            const y1 = y + dir[0];
            const x1 = x + dir[1];

            if (x1 >= 0 && x1 < columns && y1 >= 0 && y1 < rows && board[y1][x1]) {
                neighbors += 1;
            }
        }

        return neighbors;
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
                    <Cell size={cellSize} x={cell.x} y={cell.y} key={`${cell.x}-${cell.y}`}/>
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