import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';


import CurrentSeason from '../components/season/CurrentSeason.js';
import ButtonBar from '../components/utility/ButtonBar.js';

import {useLocation} from 'react-router-dom';


function StandingsPage(props) {
const location = useLocation();
const navigate = useNavigate();

const [teamStandings, setTeamStandings] = useState([]);

useEffect(() => {
      fetch('http://localhost:8080/api/v1/stats/standings/team', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           "seasonId": props.seasonId,
           "weekId": 11
         }),
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             setTeamStandings(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });
   }, []);

    return (
        <>
            <h1>OPDL Standings</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <p>As of Week 11</p>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <td scope="col">Rank</td>
                                <td scope="col">Team</td>
                                <td scope="col">Games Won</td>
                                <td scope="col">Games Played</td>
                                <td scope="col">Win %</td>
                                <td scope="col">Games Behind</td>
                            </tr>
                        </thead>
                        <tbody>
                            {teamStandings.map((teamStanding, index) =>{
                                return(
                                    <tr>
                                        <td >{index+1}</td>
                                        <td >{teamStanding.team.teamName}</td>
                                        <td >{teamStanding.score}</td>
                                        <td >{teamStanding.totalGamesPlayed}</td>
                                        <td >{Math.floor(teamStanding.winPercentage * 100) + "%"}</td>
                                        <td >{(teamStanding.numGamesBehind == 0) ? "None" : teamStanding.numGamesBehind}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default StandingsPage;