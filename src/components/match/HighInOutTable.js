import React, { useState, useEffect } from 'react';
import TextInput from '../../components/utility/TextInput.js';
import NumberInput from '../../components/utility/NumberInput.js';
import SelectInput from '../../components/utility/SelectInput.js';

function HighInOutTable (props) {
useEffect(() => {

   }, [props]);

return(
    <>
        <div>
            <h3>{props.tableName}</h3>
        </div>
        <table class="table table-sm table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <td scope="col">Player Name</td>
                    <td scope="col">High In (95+)</td>
                    <td scope="col">High Out (75+)</td>
                </tr>
            </thead>
            <tbody>
                {props.players.map((player, index) =>{
                    const currentHighInOuts = props.highInOuts.find((highInOut) => {
                       return highInOut.player.id == player.id;
                     })
                    return(
                        <tr>
                            <td >{player.playerName}</td>
                            <td ><input type="number" id="highIn" name="highIn" value={currentHighInOuts == null? 0 : currentHighInOuts.highIn} onChange={(event)=>props.onChange(event, currentHighInOuts, player)}/></td>
                            <td ><input type="number" id="highOut" name="highOut" value={currentHighInOuts == null? 0 : currentHighInOuts.highOut} onChange={(event)=>props.onChange(event, currentHighInOuts, player)}/></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </>
);
}

export default HighInOutTable;