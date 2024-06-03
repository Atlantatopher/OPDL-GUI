import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";

function TeamsTable (props) {
const [teams, setTeams] = useState([]);
const [season, setSeason] = useState({"id":props.seasonId});
const [homeBar, setHomeBar] = useState({id:props.homeBarId, seasonId:props.seasonId});

const navigate = useNavigate();
const navigateToPlayers = (playerId) => {
    navigate('/players',{state:{id:playerId}});
}

useEffect(() => {
      console.log("RequestBody: " + JSON.stringify({
               "seasonId": props.seasonId,
               "homeBar": homeBar
             }));
      fetch('http://localhost:8080/api/v1/team', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           "seasonId": props.seasonId,
           "homeBar": homeBar
         }),
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             setTeams(data);
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
                            <th class="col-6" scope="col">Team Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) =>{
                            return(
                                <tr>
                                    <td onClick={()=>{navigateToPlayers(team.id)}}>{team.teamName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default TeamsTable;