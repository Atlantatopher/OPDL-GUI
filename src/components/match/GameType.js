import React, { useState, useEffect } from 'react';
import GameEntry from './GameEntry.js';

function GameType (props) {

//console.log("props.isDoubles: " + props.isDoubles);
//console.log("props.gameType: " + props.gameType);
//let gamesByTypes = props.games.filter(game => (game.gameType.id === props.gameType) && (game.isDoubles === props.isDoubles));
const [gamesByTypes, setGamesByTypes] = useState({});
//let updatedGames =[];
//console.log("games: " + JSON.stringify(props.games));
useEffect(() => {
    //console.log("props.games changed! in child")
    //console.log("props.games.length: " + props.games.length);
    //console.log("game[0].isDoubles: " + ((props.games[0] != null)?((props.games[0].isDoubles == null)?false:props.games[0].isDoubles == props.isDoubles):""));
    //console.log("props.gameType: " + props.gameType);
    //let isGamesDoubles = (props.games == null || props.games[0] == null || props.games[0].isDoubles == null)?false:props.games[0].isDoubles;
    //let gameType = (props.games == null || props.games[0] == null || props.games[0].gameType == null)?null:props.games[0].gameType.id;
    //console.log("games[0].gameType.id: " + gameType);
    //console.log("is props doubles: " + props.isDoubles);
    //console.log("is games[0] doubles: " + isGamesDoubles);
    //console.log("are they both doubles: " + (isGamesDoubles == props.isDoubles));
    //console.log("are they both the same game type: " + (gameType == props.gameType));
    //console.log("is false == false: " + (false === false));
    //console.log("props.games: " + props.games.length);
    let updatedGames = props.games.filter(game => {
    //let isGamesDoubles = (game == null || game.doubles === null)?false:game.doubles;
    //console.log("gane: " + JSON.stringify(game));
    //console.log("game.doubles: " + (game.doubles));
    //console.log("isGamesDoubles: " + (isGamesDoubles));
    //console.log("game.isDoubles: " + (game.doubles));
    //console.log("isGamesDoubles: " + (isGamesDoubles));
    if((game != null) && (game.gameType.id === props.gameType) && (game.isDoubles === props.isDoubles || game.doubles === props.isDoubles)){
        //console.log("Both conditions Met!");
        return true;
    } else {return false;}
    });
    setGamesByTypes(updatedGames);
    //console.log("gamesByTypes: " + updatedGames.length);
}, [props.games]);


return(
    <div class={props.gameTypeClass}>
        <div class="row">
            <fieldset>
                <legend>{props.gameTitle}</legend>
                {Array.from({length: props.numGames}).map((num, index) => {
                    return(
                        <GameEntry
                            inputClass={props.inputClass}
                            gameType={props.gameType}
                            matchId={props.matchId}
                            isDoubles={props.isDoubles}
                            homePlayers={props.homePlayers}
                            awayPlayers={props.awayPlayers}
                            onChange={props.onChange}
                            gameIndex={index}
                            games={gamesByTypes}
                        />
                    );
                })}
            </fieldset>
        </div>
    </div>
);
}

export default GameType;