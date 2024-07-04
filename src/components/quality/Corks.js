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


function Corks(props) {
const location = useLocation();
const navigate = useNavigate();

const [quality, setQuality] = useState([]);

useEffect(() => {
      fetch('http://localhost:8080/api/v1/quality/player/corks', {
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
             setQuality(data);
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
                                <td colspan="3" scope="colgroup">3 or more Corks</td>
                            </tr>
                            <tr>
                                <td scope="col">Name</td>
                                <td scope="col">Team</td>
                                <td scope="col">Total</td>
                            </tr>
                        </thead>
                        <tbody>
                            { quality.map((player, index) =>{
                                return(
                                (player == null)
                                ? <></>
                                :   <tr>
                                      <td >{player.playerName}</td>
                                      <td >{player.teamName}</td>
                                      <td >{player.total}</td>
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

export default Corks;