import React, { useState, useEffect } from 'react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

function SelectTeam (props) {
const teams = props.teams == null ? {} : props.teams;
//let teamId = (props.match == null || props.match[props.selectName] == null || props.match[props.selectName].id == null) ? null : props.match[props.selectName].id;
//console.log("match: " + JSON.stringify(match));
    return(
        <>
            <select name={props.selectName} value={(props.match == null || props.match[props.selectName] == null || props.match[props.selectName].id == null) ? null : props.match[props.selectName].id}
            onChange={(event) => props.handleMatchChange(event, props.matches, props.match, props.weekId, props.matchIndex)}>
                <option value={0}>Select a Team</option>
                {teams.map((team, index) =>{
                    return(<option key={team.id} value={team.id}>{team.teamName}</option>);
                })}
            </select>
        </>
    );

}

export default SelectTeam;