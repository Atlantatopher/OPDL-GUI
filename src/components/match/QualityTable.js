import React, { useState, useEffect } from 'react';
import TextInput from '../../components/utility/TextInput.js';
import NumberInput from '../../components/utility/NumberInput.js';
import SelectInput from '../../components/utility/SelectInput.js';

function QualityTable (props) {

const [qualityPoints, setQualityPoints] = useState({});
const gameIndex = props.gameIndex;

const handleInputChange = (event) => {
    qualityPoints[event.target.name]= event.target.value;
}

useEffect(() => {

   }, [props.games]);

return(
    <>
        <div>
            <h3>{props.tableName}</h3>
        </div>
        <table class="table table-sm table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <td scope="col">Player Name</td>
                    <td scope="col">6 Mark (1)</td>
                    <td scope="col">7 Mark (2)</td>
                    <td scope="col">8 Mark (3)</td>
                    <td scope="col">9 Mark (4)</td>
                    <td scope="col">3 Cork (1)</td>
                    <td scope="col">4 Cork (2)</td>
                    <td scope="col">5 Cork (3)</td>
                    <td scope="col">6 Cork (4)</td>
                    <td scope="col">95-119 (1)</td>
                    <td scope="col">120-139 (2)</td>
                    <td scope="col">140-179 (3)</td>
                    <td scope="col">180 (4)</td>
                    <td scope="col">Total Quality</td>
                </tr>
            </thead>
            <tbody>
                {props.players.map((player, index) =>{
                    return(
                        <tr>
                            <td >{player.playerName}</td>
                            <td ><input class="col-12" type="number" id="markSix" name="markSix" value={player.markSix} onChange={handleInputChange}/></td>
                            <td ><input class="col-12" type="number" id="markSeven" name="markSeven" value={player.markSeven} onChange={handleInputChange}/></td>
                            <td ><input class="col-12" type="number" id="markEight" name="markEight" value={player.markEight} onChange={handleInputChange}/></td>
                            <td ><input class="col-12" type="number" id="markNine" name="markNine" value={player.markNine} onChange={handleInputChange}/></td>
                            <td ><input class="col-12" type="number" id="corkThree" name="corkThree" value={player.corkThree} onChange={handleInputChange}/></td>
                            <td ><input class="col-12" type="number" id="corkFour" name="corkFour" value={player.corkFour} onChange={handleInputChange}/></td>
                            <td ><input class="col-12" type="number" id="corkFive" name="corkFive" value={player.corkFive} onChange={handleInputChange}/></td>
                            <td ><input class="col-12" type="number" id="corkSix" name="corkSix" value={player.corkSix} onChange={handleInputChange}/></td>
                            <td ><input class="col-12" type="number" id="ton" name="ton" value={player.ton} onChange={handleInputChange}/>{player.ton}</td>
                            <td ><input class="col-12" type="number" id="tonTwenty" name="tonTwenty" value={player.tonTwenty} onChange={handleInputChange}/></td>
                            <td ><input class="col-12" type="number" id="tonForty" name="tonForty" value={player.tonForty} onChange={handleInputChange}/></td>
                            <td ><input class="col-12" type="number" id="tonEighty" name="tonEighty" value={player.tonEighty} onChange={handleInputChange}/></td>
                            <td >{player.totalQuality}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
);
}

export default QualityTable;