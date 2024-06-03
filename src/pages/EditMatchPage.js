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
            //console.log("get Games: " + JSON.stringify(data))
             setGames(data);
         })
         .catch((error) => {
             console.log('error: ' + error);
           });
   }, []);

const handleGameDataChange = (event, game, gameIndex) => {
    let parentGameIndex = 0;
    //let didUpdateGame = false;
    //console.log("games (before): " + JSON.stringify(games));
    game[event.target.name] =  event.target.value;
    game["key"] = gameIndex;
    //console.log("game: " + JSON.stringify(game));
    let arrayIndex = games.findIndex(parentGame => {
        //console.log("parentGame.gameType.id: " + parentGame.gameType.id);
        //console.log("parentGame.key: " + parentGame.key);
        if((parentGame.gameType.id == game.gameType.id) && (parentGame.key == gameIndex) ){
            return true;
        } else {return false;}
    });
    //console.log("arrayIndex: " + arrayIndex);
    let gameFound = (arrayIndex == -1)?false:true;
    //const updatedGames = games.map((parentGame, index) => {
        //console.log("gameIndex: " + gameIndex);
        //console.log("game.isDoubles: " + game.isDoubles);
    //    if(parentGame != null){
            //console.log("parentGameIndex: " + parentGameIndex);
           // console.log("parentGame.isDoubles: " + parentGame.isDoubles);
            //console.log("game.isDoubles: " + (game.isDoubles));
            //console.log("parentGame.doubles: " + parentGame.doubles);
            //console.log("game.doubles: " + (game.doubles));
            //console.log("parentGame.doubles == game.isDoubles: " + (parentGame.doubles == game.isDoubles));
    //        }
    //    if((parentGame != null) && (parentGame.gameType.id == game.gameType.id) && (parentGame.isDoubles === game.isDoubles)){
    //        if(gameIndex == parentGameIndex){
    //            console.log("Found parent Game!");
    //            didUpdateGame = true;
    //            return game;
    //        } else {
    //            parentGameIndex = parentGameIndex++;
    //        }
    //    } else {
    //        return parentGame;
    //    }
    //});
    //setGames(updatedGames);
    if(!gameFound){
        console.log("adding new Game to the games array");
        setGames(games => [...games, game]);
    } else {
        console.log("Updating Array at index: " + arrayIndex);
        games[arrayIndex] = game;
    }
    //console.log("games (after): " + JSON.stringify(games));
    //console.log("gameIndex: " + gameIndex);
}
const saveMatchData = () => {
    let nullFreeGames = games.filter(game => game != null);
    //console.log("Saving the Match Data (games): " + JSON.stringify(nullFreeGames));
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
                    />
                </div>
                <div class="col-md-6">
                    <QualityTable
                        tableName="Away Team"
                        players={awayPlayers}
                    />
                </div>
            </div>
            <ButtonBar id="submitMatchBtn" value="Submit Match" onClick={()=> saveMatchData()} />
        </>
    )
}

export default EditMatchPage;