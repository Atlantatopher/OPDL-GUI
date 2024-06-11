import React, { useState, useEffect } from 'react';
import TextInput from '../../components/utility/TextInput.js';
import NumberInput from '../../components/utility/NumberInput.js';
import SelectInput from '../../components/utility/SelectInput.js';

function QualityTable (props) {
useEffect(() => {

   }, [props.qualityPoints]);

   //console.log("props.qualities: " + JSON.stringify(props.qualities));

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
                    const currentQualityPoints = props.qualities.find((quality) => {
                                                       return quality.player.id == player.id;
                                                     })
                    return(
                        <tr>
                            <td >{player.playerName}</td>
                            <td ><input class="col-12" type="number" id="markSix" name="numMark6" value={currentQualityPoints == null? 0 : currentQualityPoints.numMark6} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td ><input class="col-12" type="number" id="markSeven" name="numMark7" value={currentQualityPoints == null? 0 : currentQualityPoints.numMark7} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td ><input class="col-12" type="number" id="markEight" name="numMark8" value={currentQualityPoints == null? 0 : currentQualityPoints.numMark8} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td ><input class="col-12" type="number" id="markNine" name="numMark9" value={currentQualityPoints == null? 0 : currentQualityPoints.numMark9} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td ><input class="col-12" type="number" id="corkThree" name="numCork3" value={currentQualityPoints == null? 0 : currentQualityPoints.numCork3} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td ><input class="col-12" type="number" id="corkFour" name="numCork4" value={currentQualityPoints == null? 0 : currentQualityPoints.numCork4} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td ><input class="col-12" type="number" id="corkFive" name="numCork5" value={currentQualityPoints == null? 0 : currentQualityPoints.numCork5} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td ><input class="col-12" type="number" id="corkSix" name="numCork6" value={currentQualityPoints == null? 0 : currentQualityPoints.numCork6} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td ><input class="col-12" type="number" id="ton" name="numTon" value={currentQualityPoints == null? 0 : currentQualityPoints.numTon} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/>{player.ton}</td>
                            <td ><input class="col-12" type="number" id="tonTwenty" name="numTon20" value={currentQualityPoints == null? 0 : currentQualityPoints.numTon20} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td ><input class="col-12" type="number" id="tonForty" name="numTon40" value={currentQualityPoints == null? 0 : currentQualityPoints.numTon40} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td ><input class="col-12" type="number" id="tonEighty" name="numTon80" value={currentQualityPoints == null? 0 : currentQualityPoints.numTon80} onChange={(event)=>props.onChange(event, currentQualityPoints, player)}/></td>
                            <td >{currentQualityPoints == null? 0 : currentQualityPoints.total}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
);
}

export default QualityTable;