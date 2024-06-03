import React, { useState, useEffect } from 'react';

import PlayersTable from '../components/player/PlayersTable.js';
import CurrentSeason from '../components/season/CurrentSeason.js';

import {useLocation} from 'react-router-dom';

function PlayersPage(props) {
const location = useLocation();
const [team, setTeam] = useState([]);

useEffect(() => {
      console.log("RequestBody: " + JSON.stringify({
               "id": location.state.id
             }));
      fetch('http://localhost:8080/api/v1/teams/' + location.state.id, {
         method: 'GET',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         }
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             setTeam(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });
   }, []);

    return (
        <>
            <h1>OPDL Players</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <h3>{team.teamName}</h3>
            <PlayersTable
                teamId={location.state.id}
                seasonId={props.seasonId}
            />
        </>
    )
}

export default PlayersPage;