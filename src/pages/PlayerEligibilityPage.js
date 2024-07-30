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


function PlayerEligibilityPage(props) {
const location = useLocation();
const navigate = useNavigate();

const [playerEligibility, setPlayerEligibility] = useState([]);

useEffect(() => {
      fetch('http://localhost:8080/api/v1/stats/players/eligible', {
         method: 'GET',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             setPlayerEligibility(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });
   }, []);

    return (
        <>
            <h1>OPDL Player Eligibility</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <p>As of Week 16</p>
            <p>
                Here is a list of the people who have not played enough matches to qualify for the playoffs-
                "Needs Permission" means that you will have to ask GREG CASON for an exception
                due to special circumstances that your player could not play in 9 matches that are
                required to be eligible for the playoffs. *MATCHES* means the weekly matches to be
                played, not individual *GAMES* played on any given night.
            </p>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <td scope="col">Name</td>
                                <td scope="col">Team</td>
                                <td scope="col">Matches Played</td>
                                <td scope="col">Is Playoff Eligible</td>
                            </tr>
                        </thead>
                        <tbody>
                            { playerEligibility.map((eligibility, index) =>{
                                return(
                                (eligibility.PlayerName != " " && eligibility.isPlayoffEligible == "true")
                                ? <></>
                                :      <tr>
                                          <td >{eligibility.PlayerName}</td>
                                          <td >{eligibility.PlayerTeam}</td>
                                          <td >{eligibility.MatchesPlayed}</td>
                                          <td >{eligibility.isPlayoffEligible}</td>
                                      </tr>
                                  );
                              })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PlayerEligibilityPage;