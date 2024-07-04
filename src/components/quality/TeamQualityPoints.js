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


function TeamQualityPoints(props) {
const location = useLocation();
const navigate = useNavigate();

const [teamQuality, setTeamQuality] = useState([]);

useEffect(() => {
      fetch('http://localhost:8080/api/v1/quality/team', {
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
             setTeamQuality(data);
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
                                <td colspan="2" scope="colgroup">Team All Star Points</td>
                            </tr>
                            <tr>
                                <td scope="col">Team</td>
                                <td scope="col">Total</td>
                            </tr>
                        </thead>
                        <tbody>
                            { teamQuality.map((team, index) =>{
                                return(
                                (team == null)
                                ? <></>
                                :   <tr>
                                      <td >{team.teamName}</td>
                                      <td >{team.teamTotal}</td>
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

export default TeamQualityPoints;