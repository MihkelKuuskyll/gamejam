import React, { useState } from 'react';
import './game.css';
import Cell from '../cell/cell';

export default function Game() {
    const cellSize = 20;
    const height = 600;
    const width = 800;
    const rows = height / cellSize;
    const columns = width / cellSize;
    let boardRef: any;
    const board = createEmptyBoard();
    const [cells, setCells] = useState<{ x: number; y: number }[]>([]);

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
        const elemOffset = getElementOffset();
        const offsetX = clientX - elemOffset.x;
        const offsetY = clientY - elemOffset.y;

        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);

        if (x >= 0 && x <= columns && y >= 0 && y <= rows) {
            board[y][x] = Boolean(board[y][x]) === true ? 0 : 1;
        }

        setCells(makeCells());
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
            <div>Control go in here</div>
        </div>
    );
}
