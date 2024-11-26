import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";

import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import MatchRow from './MatchRow.js';

function ScheduleTable (props) {
const [schedules, setSchedules] = useState([]);
const [season, setSeason] = useState({"id":props.seasonId});
const [matches, setMatches] = useState([]);

const navigate = useNavigate();
const navigateToMatch = (schedule, match) => {
    navigate('/editMatch',{state:{schedule:schedule, match: match}});
}


useEffect(() => {
      fetch('http://localhost:8080/api/v1/schedule', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({"seasonId":season.id}),
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             console.log("schedule data: " + JSON.stringify(data));
             setSchedules(data);

         })
         .catch((error) => {
             console.log('error: ' + error);
           });
   }, []);


    return(

        <div class="row">
            {schedules.map((schedule, index) =>{
            let dateFormatted = format(schedule.matchDate, 'MMMM do yyyy');
                return (
                    <div class="col-md-4 col-sm-6">
                        <div>Week {schedule.weekId} - {dateFormatted}</div>

                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th class="col-5" scope="col">Home Team</th>
                                    <th class="col-1" scope="col">GW</th>
                                    <th class="col-5" scope="col">Away Team</th>
                                    <th class="col-1" scope="col">GW</th>
                                </tr>
                            </thead>
                            <tbody>
                                <MatchRow
                                    seasonId = {props.seasonId}
                                    schedule = {schedule}
                                    onClick={navigateToMatch}
                                />
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );

}

export default ScheduleTable;