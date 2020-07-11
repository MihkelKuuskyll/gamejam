import React from 'react';
import './cell.css';

type Props = {
    x: number;
    y: number;
    size: number;
};

export default function Cell({ x, y, size }: Props) {
    return (
        <div
            className="cell"
            style={{
                left: `${size * x + 1}px`,
                top: `${size * y + 1}px`,
                width: `${size - 1}px`,
                height: `${size - 1}px`,
            }}
        />
    );
}
