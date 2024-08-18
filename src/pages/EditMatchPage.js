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
import GameType from '../components/match/GameType.js';
import QualityTable from "../components/match/QualityTable.js"
import HighInOutTable from "../components/match/HighInOutTable.js"

import {useLocation} from 'react-router-dom';


function EditMatchPage(props) {

const location = useLocation();
const [schedule, setSchedule] = useState((location.state == null)?{}:location.state.schedule);
const [match, setMatch] = useState((location.state == null )
    ?{"id": 0}
    :location.state.match
);
const [homePlayers, setHomePlayers] = useState([]);
const [awayPlayers, setAwayPlayers] = useState([]);
const [qualityPoints, setQualityPoints] = useState([]);
const [highInOuts, setHighInOuts] = useState([]);
const [games, setGames] = useState([]);
useEffect(() => {
      fetch('http://localhost:8080/api/v1/player', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "seasonId":match.seasonId,
            "team":{"id":match.homeTeam.id}
            }),
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             setHomePlayers(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });

      fetch('http://localhost:8080/api/v1/player', {
           method: 'POST',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
              "seasonId":match.seasonId,
              "team":{"id":match.awayTeam.id}
              }),
         })
           .then((response) => {
              if(!response.ok) throw new Error(response.status);
               else return response.json()
           })
           .then((data) => {
               setAwayPlayers(data);
           })
           .catch((error) => {
               console.log('error: ' + error);
             });
           fetch('http://localhost:8080/api/v1/qualities/get', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                      "match":{"id":match.id}
                      }),
              })
                .then((response) => {
                   if(!response.ok) throw new Error(response.status);
                    else return response.json()
                })
                .then((data) => {
                    setQualityPoints(data);
                })
                .catch((error) => {
                    console.log('error: ' + error);
                  });
           fetch('http://localhost:8080/api/v1/highInOuts/match/' + encodeURIComponent(match.id), {
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
                   setHighInOuts(data);
               })
               .catch((error) => {
                   console.log('error: ' + error);
                 });

      fetch('http://localhost:8080/api/v1/game', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "match":{"id":match.id}
            }),
       })
         .then((response) => {
            if(!response.ok) throw new Error(response.status);
             else return response.json()
         })
         .then((data) => {
             setGames(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });
   }, []);

const handleGameDataChange = (event, game, gameIndex) => {
    let parentGameIndex = 0;
    game[event.target.name] =  event.target.value;
    game["key"] = gameIndex;
    let arrayIndex = games.findIndex(parentGame => {
        if((parentGame.gameType.id == game.gameType.id) && (parentGame.key == gameIndex) ){
            return true;
        } else {return false;}
    });
    let gameFound = (arrayIndex == -1)?false:true;
    if(!gameFound){
        console.log("adding new Game to the games array");
        setGames(games => [...games, game]);
    } else {
        console.log("Updating Array at index: " + arrayIndex);
        games[arrayIndex] = game;
        setGames(games => [...games]);
    }
}

const handleQualityDataChange = (event, quality, player) => {
    if(quality == null){
        quality = {};
        quality["seasonId"] = match.seasonId;
        quality["player"] = player;
        quality["match"] = match;
        quality[event.target.name] =  event.target.value;

    } else {
        quality[event.target.name] =  event.target.value;
    }

    let arrayIndex = qualityPoints.findIndex(quality => {
        if(quality.player.id == player.id){
            return true;
        } else {return false;}
    });
    let qualityFound = (arrayIndex == -1)?false:true;
    if(!qualityFound){
        console.log("adding new Quality to the quality array");
        console.log("new Quality: " + JSON.stringify(quality));
        setQualityPoints(qualityPoints => [...qualityPoints, quality]);
    } else  {
        console.log("Updating Array at index: " + arrayIndex);
        qualityPoints[arrayIndex] = quality;
        setQualityPoints(qualityPoints => [...qualityPoints]);
    }

    //console.log("qualityPoints update: " + JSON.stringify(qualityPoints));
}

const handleHighInOutDataChange = (event, highInOut, player) => {
    if(highInOut == null){
        highInOut = {};
        highInOut["seasonId"] = match.seasonId;
        highInOut["player"] = player;
        highInOut["match"] = match;
        highInOut[event.target.name] =  event.target.value;

    } else {
        highInOut[event.target.name] =  event.target.value;
    }

    let arrayIndex = highInOuts.findIndex(highInOut => {
        if(highInOut.player.id == player.id){
            return true;
        } else {return false;}
    });
    let highInOutFound = (arrayIndex == -1)?false:true;
    if(!highInOutFound){
        console.log("adding new highInOut to the highInOut array");
        console.log("new highInOut: " + JSON.stringify(highInOut));
        setHighInOuts(highInOuts => [...highInOuts, highInOut]);
    } else  {
        console.log("Updating Array at index: " + arrayIndex);
        highInOuts[arrayIndex] = highInOut;
        setHighInOuts(highInOuts => [...highInOuts]);
    }

    //console.log("highInOuts update: " + JSON.stringify(highInOuts));
}
const saveMatchData = () => {
    let nullFreeGames = games.filter(game => game != null);
    fetch('http://localhost:8080/api/v1/games', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(nullFreeGames),
     })
       .then((response) => {
          if(!response.ok) throw new Error(response.status);
           else return response.json()
       })
       .then((data) => {
           setGames(data);
       })
       .catch((error) => {
           console.log('error: ' + error);
         });

    fetch('http://localhost:8080/api/v1/qualities/update', {
           method: 'POST',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(qualityPoints),
         })
           .then((response) => {
              if(!response.ok) throw new Error(response.status);
               else return response.json()
           })
           .catch((error) => {
               console.log('error: ' + error);
             });

    fetch('http://localhost:8080/api/v1/highInOuts/update', {
           method: 'POST',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(highInOuts),
         })
           .then((response) => {
              if(!response.ok) throw new Error(response.status);
               else return response.json()
           })
           .catch((error) => {
               console.log('error: ' + error);
             });
};

    return (
        <>
            <h1>Edit Matchup</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <p>Date: {(schedule.matchDate == null)? "04/02/2024" : schedule.matchDate}</p>
            <div class="row">
                <div class="col-6">
                    <div class="row">
                        <div class="col-md-6">Home Team:</div>
                        <div class="col-md-6">{match.homeTeam.teamName}</div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="row">
                        <div class="col-md-6">Away Team:</div>
                        <div class="col-md-6">{match.awayTeam.teamName}</div>
                    </div>
                </div>
            </div>
                <GameType
                    gameTypeClass=""
                    gameTitle="Cricket Singles"
                    numGames={3}
                    inputClass=""
                    gameType={1}
                    matchId={match.id}
                    isDoubles={false}
                    homePlayers={homePlayers}
                    awayPlayers={awayPlayers}
                    onChange={handleGameDataChange}
                    games={games}
                />
                <GameType
                    gameTypeClass=""
                    gameTitle="301 Singles"
                    numGames={3}
                    inputClass=""
                    gameType={2}
                    matchId={match.id}
                    isDoubles={false}
                    homePlayers={homePlayers}
                    awayPlayers={awayPlayers}
                    onChange={handleGameDataChange}
                    games={games}
                />
                <GameType
                    gameTypeClass=""
                    gameTitle="Cricket Doubles"
                    numGames={2}
                    inputClass=""
                    gameType={1}
                    matchId={match.id}
                    isDoubles={true}
                    homePlayers={homePlayers}
                    awayPlayers={awayPlayers}
                    onChange={handleGameDataChange}
                    games={games}
                />
                <GameType
                    gameTypeClass=""
                    gameTitle="401 Doubles"
                    numGames={2}
                    inputClass=""
                    gameType={2}
                    matchId={match.id}
                    isDoubles={true}
                    homePlayers={homePlayers}
                    awayPlayers={awayPlayers}
                    onChange={handleGameDataChange}
                    games={games}
                />
            <div class="row">
                <div class="col-md-6">
                    <QualityTable
                        tableName="Home Team"
                        players={homePlayers}
                        qualities={qualityPoints}
                        onChange={handleQualityDataChange}
                    />
                </div>
                <div class="col-md-6">
                    <QualityTable
                        tableName="Away Team"
                        players={awayPlayers}
                        qualities={qualityPoints}
                        onChange={handleQualityDataChange}
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <HighInOutTable
                        tableName="Home Team"
                        highInOuts={highInOuts}
                        players={homePlayers}
                        onChange={handleHighInOutDataChange}

                    />
                </div>
                <div class="col-md-6">
                    <HighInOutTable
                        tableName="Away Team"
                        highInOuts={highInOuts}
                        players={awayPlayers}
                        onChange={handleHighInOutDataChange}
                    />
                </div>
            </div>
            <ButtonBar id="submitMatchBtn" value="Submit Match" onClick={()=> saveMatchData()} />
        </>
    )
}

export default EditMatchPage;