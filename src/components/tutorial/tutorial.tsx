import React from 'react';
import './tutorial.css';
import virus from '../board-cell/virus.svg';
import antibody from '../board-cell/antibody.svg';
import deadmatter from '../board-cell/deadmatter.svg';
import superspreader from '../board-cell/superspreader.svg';

export default function Tutorial() {

   return (
    <div className="Tutorial">

    <h3>Instructions</h3>

    <table>

        <tr>
            <th></th>
            <th>Type</th> 
            <th>Description</th>
        </tr>

        <tr>
            <td><img id="CellPicture" src={virus} alt="Virus"/></td>
            <td>Virus</td>
            <td id="description">This little guy survives if it has 2 or 3 infected cells around it. Also if a healthy cell is surrounded by 3 infected cells it becomes infected.</td>
        </tr>

        <tr>
            <td><img id="CellPicture" src={antibody} alt="Antibody"/></td>
            <td>Antibody</td>
            <td>This little guy is a hero. Antibodies kill virus cells if they come into contact with eachother.</td>
        </tr>

        <tr>
            <td><img id="CellPicture" src={deadmatter} alt="Dead matter"/></td>
            <td>Dead cell</td>
            <td>This cell has died and is inert. Dead cells can't turn into a virus.</td>
        </tr>

        <tr>
            <td><img id="cellPicture"src={superspreader} alt="Super Spreader"/></td>
            <td>Super spreader</td>
            <td>This cell is a superspreader, it explodes and spreads the virus everywhere around it.</td>
        </tr>

    </table>

    </div>
   );
}