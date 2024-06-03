import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";

function BarsTable (props) {
const [bars, setBars] = useState([]);
const [season, setSeason] = useState({"id": props.seasonId});

const navigate = useNavigate();
const navigateToTeams = (barId) => {
    navigate('/teams',{state:{id:barId}});
}

useEffect(() => {
      fetch('http://localhost:8080/api/v1/bar', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({"seasonId":props.seasonId}),
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             setBars(data);
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
                            <th class="col-6" scope="col">Pub Name</th>
                            <th class="col-3" scope="col">Number of Teams Hosted</th>
                            <th class="col-3" scope="col">Number of Available Boards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bars.map((bar, index) =>{
                            return(
                                <tr>
                                    <td onClick={()=>{navigateToTeams(bar.id)}}>{bar.barName}</td>
                                    <td >{bar.numTeams}</td>
                                    <td >{bar.numBoards}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default BarsTable;