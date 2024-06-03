import React, { useState, useEffect } from 'react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

import BarsTable from '../components/bars/BarsTable.js';
import PhoneNumber from '../components/utility/PhoneNumber.js';
import EmailAddress from '../components/utility/EmailAddress.js';
import TextInput from '../components/utility/TextInput.js';
import NumberInput from '../components/utility/NumberInput.js';
import AddressFieldset from '../components/utility/AddressFieldset.js';
import CurrentSeason from '../components/season/CurrentSeason.js';
import EditWeek from '../components/schedule/EditWeek.js';


function AddSchedulePage(props) {
const [season, setSeason] = useState({"id":props.seasonId});
//todo move matches down to edit week so that I dont have to try to map it over multiple weeks.

const [schedule, setSchedule] = useState({"seasonId":props.seasonId, "matches":[]});
const [schedules, setSchedules] = useState([]);
const [teams, setTeams] = useState();

useEffect(() => {
fetch('http://localhost:8080/api/v1/team', {
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
       //console.log('teams: ' + JSON.stringify(data));
       setTeams(data);
   })
   .catch((error) => {
       console.log('error: ' + error);
     });

   fetch('http://localhost:8080/api/v1/schedule', {
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
          //console.log('teams: ' + JSON.stringify(data));
          setSchedules(data);
      })
      .catch((error) => {
          console.log('error: ' + error);
        });



}, []);

const handleSubmit = event => {
    event.preventDefault();
    //console.log('props: ' + JSON.stringify(props));
    console.log('form submitted ✅');
    console.log('schedules: ' + JSON.stringify(schedules));



    fetch('http://localhost:8080/api/v1/registerSchedule', {
             method: 'POST',
             headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(schedules),
           })
           .then((response) => {
              if(!response.ok) throw new Error(response.status);
               else return response.json()
           })
           .then((data) => {
                console.log("Schedule data: " + JSON.stringify(data));
                setSchedules(data);

            })
           .catch((error) => {
               console.log('error: ' + error);
           });

};

const handleAddWeek = (event) => {
    const weekIndex = schedules == null ? 1 :schedules.length + 1;
    schedule["weekId"] = weekIndex;
    //console.log("newSchedule: " + JSON.stringify(schedule));
    setSchedules([...schedules, schedule]);
}

const handleWeekChange = (event, week, weekIndex) => {
    setSchedule(schedules[weekIndex]);
    schedule[event.target.name] =  event.target.value;
    //console.log("schedule: "  + JSON.stringify(schedule));
    schedules[weekIndex] = schedule;
    //console.log("schedules: "  + JSON.stringify(schedules));
}

const handleMatchChange = (event, matches, match, weekIndex, matchIndex) => {
    setSchedule(schedules[weekIndex]);
    match[event.target.name] =  event.target.value;
    //console.log("match: "  + JSON.stringify(match));
    //console.log("matchIndex: "  + matchIndex);
    //setMatches(schedule["matches"]);
    matches[matchIndex] = match;
    //console.log("matches: "  + JSON.stringify(matches));
    schedule["matches"] = matches;
    schedules[weekIndex] = schedule;
    //console.log("schedules: "  + JSON.stringify(schedules));
}

    return (
        <>
            <h1>Register OPDL Schedule</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <form id="registerScheduleForm" onSubmit={handleSubmit}>
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="row">
                            {schedules == null ? <></> :
                            schedules.map((schedule, index) =>{
                            //console.log("schedules[scheduleIndex] " + format(schedules[scheduleIndex].matchDate, "yyyy-MM-dd"));
                                return(
                                    <div class="col-md-6">
                                        <EditWeek
                                            seasonId={props.seasonId}
                                            schedule={schedules[index]}
                                            teams={teams}
                                            weekId={index}
                                            handleWeekChange={handleWeekChange}
                                            handleMatchChange={handleMatchChange}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div class="row justify-content-end">
                            <button type="button" id="addWeek" class="col-md-3 btn btn-secondary" onClick={() => handleAddWeek()}>Add Week</button>
                            <input type="submit" id="submitPubRegistration" class="col-md-3 btn btn-primary"/>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddSchedulePage;