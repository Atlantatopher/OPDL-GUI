import React, { useState, useEffect } from 'react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import SelectTeam from './SelectTeam.js';

function EditWeek (props) {
const [week, setWeek] = useState({"weekId":props.weekId});
const [matches, setMatches] = useState([]);
//todo move down to Select Team and move matches here
const [match, setMatch] = useState({});
const [season, setSeason] = useState({"id":props.seasonId});
const teams = props.teams == null ? {} : props.teams;
const numTeams = teams.length;
const numMatches = Math.ceil(numTeams/2);
const weekIDLabel = props.weekId+1;
//console.log("props.schedule: "+ JSON.stringify(props.schedule));

useEffect(() => {
    if(props.schedule != null && props.schedule.id != null){
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
              console.log('matches: ' + JSON.stringify(data));
              setMatches(data);

          })
          .catch((error) => {
              console.log('error: ' + error);
            });

        }

}, []);

useEffect(() => {
    if(props.schedule != null && props.schedule.id != null){
        let newMatches  = matches.map((match, index) => {match["scheduleId"] = props.schedule.id; console.log("loop Match: " + JSON.stringify(match));matches[index] = match; return(match);});
          console.log("newMatches: " + JSON.stringify(newMatches));
           fetch('http://localhost:8080/api/v1/registerMatch', {
           method: 'POST',
               headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify(newMatches),
             })
             .then((response) => {
                if(!response.ok) throw new Error(response.status);
                 else return response.json()
             })
             .then((data) => {
                  console.log("Match data: " + JSON.stringify(data));
                  setMatches(data);
              })
             .catch((error) => {
                 console.log('error: ' + error);
             });

        }

}, [props.schedule]);

    return(
<>
                <label for="matchDate">{"Date of Week "+ weekIDLabel + " Match  "}</label>
                <input type="date" id="matchDate" name="matchDate" value={props.schedule.matchDate} onChange={(event) => props.handleWeekChange(event, week, props.weekId)}></input>
                <table class="table">
                    <thead>
                        <tr>
                            <td>Home Team</td>
                            <td>Away Team</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({length: numMatches}).map((num, index) => {
                        //console.log("oldMatches[0]: " + JSON.stringify(oldMatches[0]));
                        //console.log("oldMatches.length: " + oldMatches.length);
                        //console.log("index: " + index);
                        //console.log("oldMatches[index]: " + JSON.stringify(oldMatches[index]));
                        //let match = (matches.length == 0 || matches[index] == null)
                        //    ?{"seasonId":props.seasonId}
                        //    :matches[index];

                        const match = (matches[index] == null) ? {"seasonId":props.seasonId} : matches[index];
                        //console.log("match: " + JSON.stringify(match));

                            return(
                                <tr key={num}>
                                    <td>
                                        <SelectTeam
                                            seasonId={props.seasonId}
                                            teams={teams}
                                            weekId={props.weekId}
                                            match={match}
                                            matches={matches}
                                            matchIndex={index}
                                            selectName="homeTeam"
                                            handleMatchChange={props.handleMatchChange}
                                        />
                                    </td>
                                    <td>
                                        <SelectTeam
                                            seasonId={props.seasonId}
                                            teams={teams}
                                            weekId={props.weekId}
                                            match={match}
                                            matches={matches}
                                            matchIndex={index}
                                            selectName="awayTeam"
                                            handleMatchChange={props.handleMatchChange}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
</>
    );

}

export default EditWeek;