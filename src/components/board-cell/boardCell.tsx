import React from 'react';
import './boardCell.css';
import { Cell } from '../../services/cell';

type Props = {
    cell: Cell;
    size: number;
};

export default function BoardCell({ cell, size }: Props) {
    return (
        <div
            className={`cell ${cell.type}`}
            style={{
                left: `${size * cell.x + 1}px`,
                top: `${size * cell.y + 1}px`,
                width: `${size - 1}px`,
                height: `${size - 1}px`,
            }}
        />
    );
}
