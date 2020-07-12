/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './game.css';
import BoardCell from '../board-cell/boardCell';
import cloneDeep from 'lodash/cloneDeep';
import { useInterval } from '../../services/hooks';
import { getLevel, levelEndMessage } from '../../services/levels';
import {
    CellType,
    Cell,
    Board,
    activateSuperSpreaders,
    activateAntiBodies,
    getNeighbors as getNeighboursCount,
} from '../../services/cell';
import sampleSize from 'lodash/sampleSize';
import logo from '../art/logo.png';
import Tutorial from '../tutorial/tutorial';
/* import soundfile from './background.mp3'; */
import Sound from 'react-sound';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const x = require('./background.mp3');

export default function Game() {
    let boardRef: any;
    const interval = 300;
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [cellSize, setCellSize] = useState(0);
    const [map, setMap] = useState<Board>([]);
    const [maxClicks, setMaxClicks] = useState(0);
    const [board, setBoard] = useState<Board>(map);
    const [cells, setCells] = useState<Cell[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('');
    const [cellsUsed, setCellsUsed] = useState(0);
    const [turnCounter, setTurnCounter] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1);
    const rows = height / cellSize;
    const columns = width / cellSize;
    const [hasRoundEnded, setHasRoundEnded] = useState(false);
    const [hasWonRound, setHasWonRound] = useState(false);

    useEffect(() => {
        if (isLoading) {
            return;
        }
        setCells(makeCells());
    }, [board]);

    useEffect(() => {
        if (currentLevel > 8) {
            return;
        }
        const level = getLevel(currentLevel);
        setHeight(level.height);
        setWidth(level.width);
        setCellSize(level.cellSize);
        setMap(level.map);
        setMaxClicks(level.maxClicks);
        setIsLoading(false);
        reset(level.map);
    }, [currentLevel]);

    useEffect(() => {
        if (!hasRoundEnded) {
            return setMessage('');
        }
        if (hasWonRound) {
            setMessage(levelEndMessage.success(turnCounter));
        } else {
            setMessage(levelEndMessage.fail(turnCounter));
        }
    }, [hasRoundEnded, hasWonRound]);

    useInterval(
        () => {
            if (isRunning) {
                nextTurn();
            }
        },
        interval,
        [isRunning],
    );

    function nextTurn() {
        const newBoard = getNextBoard();
        const hasAnyChanges = getHasAnyChanges(board, newBoard);

        if (!hasAnyChanges) {
            return endRound(board);
        }

        setBoard(newBoard);
        setTurnCounter(turnCounter + 1);  
    }

    function getNextBoard() {
        let newBoard = cloneDeep(board);

        const antiBodies = [];
        const superSpreaders = [];
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < columns; x += 1) {
                const neighboursCount = getNeighboursCount(board, x, y, columns, rows);
                const isVirusCellWithInvalidNeighborsCount =
                    board[y][x] === CellType.virus && (neighboursCount < 2 || neighboursCount > 3);
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
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < columns; x += 1) {
                if (board[y][x] !== newBoard[y][x]) {
                    hasAnyChanges = true;
                    break;
                }
            }
        }
        return hasAnyChanges;
    }

    function getHasWonRound(board: Board) {
        let hasWon = true;
        for (let y = 0; y < rows; y += 1) {
            for (let x = 0; x < columns; x += 1) {
                if ([CellType.virus, CellType.superSpreader].includes(board[y][x])) {
                    hasWon = false;
                    break;
                }
            }
        }
        return hasWon;
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
        if (isRunning || hasRoundEnded) {
            return;
        }
        setMessage('');
        const { x, y } = getCellCoordinates(clientX, clientY);
        const isElementOnMap = x >= 0 && x <= columns && y >= 0 && y <= rows;
        if (!isElementOnMap) {
            return;
        }
        const cell = cells.find((cell) => cell.x === x && cell.y === y);
        if (cell?.isOriginal) {
            return;
        }

        const newBoard = cloneDeep(board);
        newBoard[y][x] = newBoard[y][x] !== CellType.empty ? CellType.empty : CellType.antibody;

        if (newBoard[y][x] === CellType.empty) {
            setCellsUsed(cellsUsed - 1);
        } else if (cellsUsed < maxClicks) {
            setCellsUsed(cellsUsed + 1);
        } else {
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

    function endRound(board: Board) {
        setIsRunning(false);
        setHasRoundEnded(true);
        setHasWonRound(getHasWonRound(board));
    }

    function pauseGame() {
        setIsRunning(false);
    }

    function runGame() {
        setIsRunning(true);
        setTurnCounter(0);
    }

    function reset(newMap?: Board) {
        setMessage('');
        setBoard(newMap || map);
        setTurnCounter(0);
        setCellsUsed(0);
        setHasRoundEnded(false);
        setHasWonRound(false);
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
        randomPicks.forEach((pick) => {
            newBoard[pick.y][pick.x] = CellType.antibody;
        });

        setBoard(newBoard);
        setCellsUsed(maxClicks);
    }

    return (
        <div>
            <div className="Logo">
                <img src={logo} alt="Logo"/>
                <p>Virus goes brr brr - you better stop it!</p>
            </div>
            <div className="CellsRemaining">
                <p>Antibodies remaining: {maxClicks - cellsUsed}</p>
            </div>
            <div
                className="Board"
                style={{ width, height, backgroundSize: `${cellSize}px ${cellSize}px` }}
                onClick={editCell}
                ref={(n) => {
                    boardRef = n;
                }}
            >
                {cells.map((cell) => (
                    <BoardCell cell={cell} size={cellSize} key={`${cell.x}-${cell.y}`} />
                ))}
            </div>

            <div className="Controls">
                {isRunning && (
                    <>
                        <button className="button" onClick={pauseGame}>
                            Pause
                        </button>
                    </>
                )}
                {!hasRoundEnded && !isRunning && (
                    <>
                        <button className="button" onClick={runGame}>
                            Run
                        </button>
                        <button className="button" onClick={handleRandom}>
                            {`I'm feeling lucky`}
                        </button>
                        <button
                            className="button"
                            onClick={() => {
                                reset();
                            }}
                        >
                            Clear
                        </button>
                    </>
                )}
            </div>
            <div className="Message">
                <p>{message}</p>
                {!isRunning && hasRoundEnded && (
                    <>
                        {!hasWonRound && <button
                            className="nextButton"
                            onClick={() => {
                                reset();
                            }}
                        >
                            Try again
                        </button>}
                        {hasWonRound && <button
                            className="nextButton"
                            onClick={() => {
                                setCurrentLevel(currentLevel + 1);
                            }}
                        >
                            Continue
                        </button>}
                    </>
                )}
            <Tutorial />
            <div className="Authors">
                <p>created by not mario brothers
                </p>
            </div>
            
            <Sound loop
                url={x}
                playStatus="PLAYING"
            />
        </div>
        </div>
    );
}
