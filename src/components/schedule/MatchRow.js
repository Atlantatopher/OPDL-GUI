import React, { useState, useEffect } from 'react';
import './MatchRow.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";

import { format, formatDistance, formatRelative, subDays } from 'date-fns'

function MatchRow (props) {
const [matches, setMatches] = useState([]);
const matchDate = new Date(props.schedule.matchDate);
const curDate = new Date();
let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);


useEffect(() => {
    //console.log(JSON.stringify(props.schedule))
      fetch('http://localhost:8080/api/v1/schedule/week', {
           method: 'POST',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({"scheduleId":props.schedule.id}),
         })
           .then((response) => {
              if(!response.ok) throw new Error(response.status);
               else return response.json()
           })
           .then((data) => {
               //console.log('matches: ' + JSON.stringify(data));
               setMatches(data);

           })
           .catch((error) => {
               console.log('error: ' + error);
             });
   }, []);

    return(

        <>
            {matches.map((match, index) =>{
                console.log(JSON.stringify(props.schedule.matchDate))
                var postponed = ((matchDate < yesterday) &&match.homeScore == 0 && match.awayScore == 0)?"table-warning":""
                return (
                    <tr class={postponed} onClick={() => {props.onClick(props.schedule, match)}}>

                        <td >{match.homeTeam == null? "Bye Week" : match.homeTeam.teamName}</td>
                        <td >{(matchDate < yesterday)?match.homeScore:""}</td>
                        <td >{match.awayTeam == null? "" : match.awayTeam.teamName}</td>
                        <td >{(matchDate < yesterday)?match.awayScore:""}</td>
                    </tr>

            )})}
        </>
    );

}

export default MatchRow;