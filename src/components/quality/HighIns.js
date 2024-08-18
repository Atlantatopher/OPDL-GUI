import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';


import CurrentSeason from '../season/CurrentSeason.js';
import ButtonBar from '../utility/ButtonBar.js';

import {useLocation} from 'react-router-dom';


function HighIns(props) {
const location = useLocation();
const navigate = useNavigate();

const [highIn, setHighIn] = useState([]);

useEffect(() => {
      fetch('http://localhost:8080/api/v1/highInOuts/player/report/in/' + props.seasonId, {
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
             setHighIn(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });
   }, []);

    return (
        <>
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <td colspan="4" scope="colgroup">High Ins (95+)</td>
                            </tr>
                            <tr>
                                <td scope="col">Name</td>
                                <td scope="col">Team</td>
                                <td scope="col">Total</td>
                                <td scope="col">Highest Score</td>
                            </tr>
                        </thead>
                        <tbody>
                            { highIn.map((record, index) =>{
                                return(
                                (record == null)
                                ? <></>
                                :   <tr>
                                      <td >{record.player.playerName}</td>
                                      <td >{record.player.team.teamName}</td>
                                      <td >{record.numHighIns}</td>
                                      <td >{record.highestIn}</td>
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

export default HighIns;