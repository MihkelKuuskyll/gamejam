import React, { useEffect, useState } from 'react';
import './game.css';
import BoardCell from '../board-cell/boardCell';
import cloneDeep from 'lodash/cloneDeep';
import { useInterval } from '../../services/hooks';
import { getLevel, levelEndMessage } from '../../services/levels';
import { CellType, Cell, getRandomCellType, Board, activateSuperSpreaders, activateAntiBodies, getNeighbors as getNeighboursCount } from '../../services/cell';
import sampleSize from 'lodash/sampleSize';

export default function Game() {
    let boardRef: any;
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [cellSize,setCellSize] = useState(0);
    const [map, setMap] = useState<Board>([]);
    const [maxClicks,setMaxClicks] = useState(0);
    const [board, setBoard] = useState<Board>(map);
    const [cells, setCells] = useState<Cell[]>([]);
    const [interval, setInterval] = useState(500);
    const [isLoading, setIsLoading] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('');
    const [cellsUsed, setCellsUsed] = useState(0);
    const [turnCounter, setTurnCounter] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1);
    const rows = height / cellSize;
    const columns = width / cellSize;
    const [hasRoundEnded,setHasRoundEnded] = useState(false);

    useEffect(() => {
        if (isLoading) {
            return;
        }
        setCells(makeCells());
    }, [board]);

    useEffect(() => {
        const level = getLevel(currentLevel);
        setHeight(level.height);
        setWidth(level.width);
        setCellSize(level.cellSize);
        setMap(level.map);
        setMaxClicks(level.maxClicks);
        setIsLoading(false);
        setBoard(level.map);
    },[currentLevel] );

    useInterval(() => {
        if (isRunning) {
            nextTurn();
        }
    }, interval, [isRunning]);

    function nextTurn() {
        const newBoard = getNextBoard();
        const hasAnyChanges = getHasAnyChanges(board, newBoard);
        

        if (hasAnyChanges) {
            setBoard(newBoard);
        }
        else { 
             setIsRunning(false); 
             const messageType = getIsEmptyBoard(newBoard) ? 'success' : 'fail';
             setMessage(levelEndMessage[messageType](turnCounter));
             setHasRoundEnded(true);
             }
        setTurnCounter(turnCounter+1);
        
    }

    function getNextBoard() {
        let newBoard = cloneDeep(board);

        const antiBodies = [];
        const superSpreaders = [];
        for (let y = 0; y < rows; y+=1) {
            for (let x = 0; x < columns; x+=1) {
                const neighboursCount = getNeighboursCount(board, x, y, columns, rows);
                const isVirusCellWithInvalidNeighborsCount = board[y][x] === CellType.virus && (neighboursCount < 2 || neighboursCount > 3);
                const isEmptyCellWith3Neighbors = board[y][x] === CellType.empty && neighboursCount === 3;

                if (isVirusCellWithInvalidNeighborsCount) {
                    newBoard[y][x] = CellType.empty;
                } else if (isEmptyCellWith3Neighbors) {
                    newBoard[y][x] = CellType.virus;
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

    function getIsEmptyBoard(board: Board) {
        let emptyBoard = true;
        for (let y = 0; y < rows; y+=1) {
            for (let x = 0; x < columns; x+=1) {
                if (board[y][x] !== CellType.empty) {
                    emptyBoard = false;
                    break;
                }
            }
        }
        return emptyBoard;
    }

    function makeCells() {
        const cells: Cell[] = [];
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < columns; x += 1) {
                if (board[y][x] !== CellType.empty) {
                    const isOriginal = board[y][x] === map[y][x];
                    cells.push({ x, y, type: board[y][x], isOriginal });
                }
            }
        }

        return cells;
    }

    function editCell({ clientX, clientY }: { clientX: number; clientY: number }) {
        if (isRunning) {
            return;
        }
        setMessage("");
        const { x, y } = getCellCoordinates(clientX, clientY);
        const isElementOnMap = x >= 0 && x <= columns && y >= 0 && y <= rows;
        if (!isElementOnMap) {
            return;
        }
        const cell = cells.find(cell => cell.x === x && cell.y === y);
        if (cell?.isOriginal) {
            return;
        }

        const newBoard = cloneDeep(board);
        newBoard[y][x] = newBoard[y][x] !== CellType.empty ? CellType.empty : getRandomCellType();
        
        if(newBoard[y][x] === CellType.empty){
            setCellsUsed(cellsUsed - 1);
        }
        else if(cellsUsed < maxClicks) {
            setCellsUsed(cellsUsed + 1);
        }
        else {
            return;
        }

        setBoard(newBoard);
    }

    function getCellCoordinates(clientX: number, clientY: number) {
        const elemOffset = getElementOffset();
        const offsetX = clientX - elemOffset.x;
        const offsetY = clientY - elemOffset.y;
        return {
            x: Math.floor(offsetX / cellSize),
            y: Math.floor(offsetY / cellSize),
        };
    }

    function getElementOffset() {
        const rect = boardRef?.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: rect.left + window.pageXOffset - doc.clientLeft,
            y: rect.top + window.pageYOffset - doc.clientTop,
        };
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
        setBoard(map);
        setTurnCounter(0);
        setCellsUsed(0);
    }

    function handleRandom() {
        setMessage('');
        const newBoard = cloneDeep(map);
        const emptyCells = [];
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < columns; x += 1) {
                if (newBoard[y][x] === CellType.empty) {
                    emptyCells.push({ x, y });
                }
            }
        }
        const randomPicks = sampleSize(emptyCells, maxClicks);
        randomPicks.forEach(pick => {
            newBoard[pick.y][pick.x] = CellType.virus;
        });

        setBoard(newBoard);
        setCellsUsed(maxClicks);
    }

    return (
        <div>
            <div className="CellsRemaining">
                <p>Cells remaining: {maxClicks-cellsUsed}</p>
            </div>
            <div className="Board"
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
                    {isRunning ?
                    <>
                        <button className="button" onClick={stopGame}>Stop</button>
                    </>:
                    null
                    }
                    {!hasRoundEnded && !isRunning ?
                    <>
                        <button className="button" onClick={runGame}>Run</button> 
                        <button className="button" onClick={handleRandom}>Random</button>
                        <button className="button" onClick={() => {handleClear(); setHasRoundEnded(false);}}>Clear</button>
                    </>:
                    null
                    }
            </div>
            <div className="Message">
                <p>{message}</p>
                {!isRunning && hasRoundEnded?
                <>
                <button className="nextButton" onClick={() => {handleClear(); setHasRoundEnded(false);}}>Try again</button>
                <button className="nextButton" onClick={() => {setCurrentLevel(currentLevel + 1);setHasRoundEnded(false);setMessage('');}}>Continue</button>
                </> :
                null
                }
                
             </div>
        </div>
    );
}
