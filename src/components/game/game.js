import React from 'react'; 
import'./game.css';

const cellSize = 20; 
const width = 800; 
const height = 600;

class Game extends React.Component { 
    render() {
        return (
            <div>
                <div className="Board"></div>
            </div>
        )
    }
}

export default Game;