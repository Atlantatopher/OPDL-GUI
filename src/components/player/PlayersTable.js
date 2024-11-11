import React, { useState, useEffect } from 'react';

function PlayersTable (props) {
const [players, setPlayers] = useState([]);
const [season, setSeason] = useState(props.seasonId);
const [team, setTeam] = useState({id: (props.teamId == null)? null : props.teamId});


useEffect(() => {
    if(props.isCaptains != true){
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
    } else {
        fetch('http://localhost:8080/api/v1/captains/' + props.seasonId, {
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
             setPlayers(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });
    }
   }, []);

let colSize = "col-3";
if(props.isCaptains){
    colSize = "col-2";
}

    return(

        <div class="row justify-content-center">
            <div class="col-md-8">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            {(props.isCaptains)?<th class={colSize} scope="col">Team</th>:<></>}
                            <th class={colSize} scope="col">Player Name</th>
                            <th class={colSize} scope="col">Player Role</th>
                            <th class={colSize} scope="col">Email</th>
                            <th class={colSize} scope="col">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) =>{
                            let phoneFormatted = ""
                            if(player.phoneNumber != null){
                                const numberInput = player.phoneNumber.replace(/[^\d]/g, "");
                                phoneFormatted = `(${numberInput.slice(0, 3)}) ${numberInput.slice(3,6)}-${numberInput.slice(6, 10)}`;
                            }
                            return(
                                <tr>
                                    {(props.isCaptains)?<td >{player.team.teamName}</td>:<></>}
                                    <td >{player.playerName}</td>
                                    <td >{player.playerType}</td>
                                    <td >{player.emailAddress}</td>
                                    <td >{(player.phoneNumber != null)?phoneFormatted:""}</td>
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