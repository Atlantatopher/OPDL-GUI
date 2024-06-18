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


function PlayerStatsPage(props) {
const location = useLocation();
const navigate = useNavigate();

const [playerStats, setPlayerStats] = useState([]);

useEffect(() => {
      fetch('http://localhost:8080/api/v1/stats/standings/player', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           "seasonId": props.seasonId,
           "weekId": 10
         }),
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             setPlayerStats(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });
   }, []);

    return (
        <>
            <h1>OPDL Player Stats</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <p>As of Week 10</p>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <td colspan="2" scope="colgroup"></td>
                                <td colspan="3" scope="colgroup">Singles Cricket</td>
                                <td colspan="3" scope="colgroup">Singles 301</td>
                                <td colspan="3" scope="colgroup">Doubles Cricket</td>
                                <td colspan="3" scope="colgroup">Doubles 401</td>
                                <td colspan="3" scope="colgroup">Overall</td>
                            </tr>
                            <tr>
                                <td scope="col">Name</td>
                                <td scope="col">Team</td>
                                <td scope="col">Won</td>
                                <td scope="col">Lost</td>
                                <td scope="col">%</td>
                                <td scope="col">Won</td>
                                <td scope="col">Lost</td>
                                <td scope="col">%</td>
                                <td scope="col">Won</td>
                                <td scope="col">Lost</td>
                                <td scope="col">%</td>
                                <td scope="col">Won</td>
                                <td scope="col">Lost</td>
                                <td scope="col">%</td>
                                <td scope="col">Won</td>
                                <td scope="col">Lost</td>
                                <td scope="col">%</td>
                            </tr>
                        </thead>
                        <tbody>
                            { playerStats.map((playerStat, index) =>{
                                return(
                                (playerStat.player == null)
                                ? <></>
                                :      <tr>
                                          <td >{playerStat.player.playerName}</td>
                                          <td >{playerStat.team.teamName}</td>

                                          <td >{playerStat.singlesCricket.numWins}</td>
                                          <td >{playerStat.singlesCricket.numLosses}</td>
                                          <td >{Math.floor(playerStat.singlesCricket.winPercentage * 100) + "%"}</td>

                                          <td >{playerStat.singlesX01.numWins}</td>
                                          <td >{playerStat.singlesX01.numLosses}</td>
                                          <td >{Math.floor(playerStat.singlesX01.winPercentage * 100) + "%"}</td>

                                          <td >{playerStat.doublesCricket.numWins}</td>
                                          <td >{playerStat.doublesCricket.numLosses}</td>
                                          <td >{Math.floor(playerStat.doublesCricket.winPercentage * 100) + "%"}</td>

                                          <td >{playerStat.doublesX01.numWins}</td>
                                          <td >{playerStat.doublesX01.numLosses}</td>
                                          <td >{Math.floor(playerStat.doublesX01.winPercentage * 100) + "%"}</td>

                                          <td >{playerStat.overall.numWins}</td>
                                          <td >{playerStat.overall.numLosses}</td>
                                          <td >{Math.floor(playerStat.overall.winPercentage * 100) + "%"}</td>
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

export default PlayerStatsPage;