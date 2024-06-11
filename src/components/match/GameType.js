import React, { useState, useEffect } from 'react';
import GameEntry from './GameEntry.js';

function GameType (props) {

const [gamesByTypes, setGamesByTypes] = useState({});

useEffect(() => {

    let updatedGames = props.games.filter(game => {

    if((game != null) && (game.gameType.id === props.gameType) && (game.isDoubles === props.isDoubles || game.doubles === props.isDoubles)){

        return true;
    } else {return false;}
    });
    setGamesByTypes(updatedGames);

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