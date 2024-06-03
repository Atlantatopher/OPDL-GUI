import React, { useState, useEffect } from 'react';

function PlayersTable (props) {
const [players, setPlayers] = useState([]);
const [season, setSeason] = useState(props.seasonId);
const [team, setTeam] = useState({id: (props.teamId == null)? null : props.teamId});


useEffect(() => {
        console.log("Request Body: " + JSON.stringify({
                                                  "seasonId": props.seasonId,
                                                  "team": team
                                                }));
      fetch('http://localhost:8080/api/v1/player', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           "seasonId": season,
           "team": team
         }),
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             setPlayers(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });
   }, []);

    return(

        <div class="row justify-content-center">
            <div class="col-md-8">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th class="col-4" scope="col">Player Name</th>
                            <th class="col-4" scope="col">Player Role</th>
                            <th class="col-4" scope="col">Eligible for Playoffs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) =>{
                            return(
                                <tr>
                                    <td >{player.playerName}</td>
                                    <td >{player.playerType}</td>
                                    <td >{player.isPlayoffEligible? "Yes": "No"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default PlayersTable;