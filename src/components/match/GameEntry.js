import React, { useState, useEffect } from 'react';
import PhoneNumber from '../../components/utility/PhoneNumber.js';
import EmailAddress from '../../components/utility/EmailAddress.js';
import TextInput from '../../components/utility/TextInput.js';
import NumberInput from '../../components/utility/NumberInput.js';
import SelectInput from '../../components/utility/SelectInput.js';

function GameEntry (props) {

const [game, setGame] = useState({"gameType":{"id":props.gameType}, "match":{"id": props.matchId} , "doubles": props.isDoubles});
const winOptions = [{"wins": 0}, {"wins": 1}, {"wins": 2}]
const gameIndex = props.gameIndex;

useEffect(() => {

    let updatedGame = props.games[props.gameIndex];


    if (updatedGame != null){

    }
    (props.games != null && props.games[props.gameIndex] != null)
    ?setGame(props.games[props.gameIndex])
    :setGame(game);
   }, [props.games]);

return(
    <div class={props.inputClass}>
        <div class="row">
            <div class="col-6 col-sm-2">
                <SelectInput
                    defaultOption="Select Number of Wins"
                    options={winOptions}
                    optionsKey="wins"
                    value={game.homeScore}
                    fieldName="homeScore"
                    valueKey="wins"
                    onChange={(event)=>props.onChange(event, game, gameIndex)}
                />
            </div>
            <div class="col-6 col-sm-3">
                <SelectInput
                    defaultOption="Select Player"
                    options={(props.homePlayers == null)?[]:props.homePlayers}
                    optionsKey="playerName"
                    value={(game.homePlayer == null)? null: game.homePlayer.id}
                    fieldName="homePlayer"
                    valueKey="id"
                    onChange={(event)=>props.onChange(event, game, gameIndex)}
                />
                {
                (props.isDoubles)?
                <SelectInput
                    defaultOption="Select Player"
                    options={(props.homePlayers == null)?[]:props.homePlayers}
                    optionsKey="playerName"
                    value={(game.homePlayerDBL == null)? null: game.homePlayerDBL.id}
                    fieldName="homePlayerDBL"
                    valueKey="id"
                    onChange={(event)=>props.onChange(event, game, gameIndex)}
                />
                :<></>
                }
            </div>
            <div class="col-sm-2">
                VS.
            </div>
            <div class="col-6 d-block d-sm-none">
                <SelectInput
                    defaultOption="Select Number of Wins"
                    options={winOptions}
                    optionsKey="wins"
                    value={game.awayScore}
                    fieldName="awayScore"
                    valueKey="wins"
                    onChange={(event)=>props.onChange(event, game, gameIndex)}
                />
            </div>
            <div class="col-6 col-sm-3">
                <SelectInput
                    defaultOption="Select Player"
                    options={(props.awayPlayers == null)?[]:props.awayPlayers}
                    optionsKey="playerName"
                    value={(game.awayPlayer == null)? null: game.awayPlayer.id}
                    fieldName="awayPlayer"
                    valueKey="id"
                    onChange={(event)=>props.onChange(event, game, gameIndex)}
                />
                {
                (props.isDoubles)?
                <SelectInput
                    defaultOption="Select Player"
                    options={(props.awayPlayers == null)?[]:props.awayPlayers}
                    optionsKey="playerName"
                    value={(game.awayPlayerDBL == null)? null: game.awayPlayerDBL.id}
                    fieldName="awayPlayerDBL"
                    valueKey="id"
                    onChange={(event)=>props.onChange(event, game, gameIndex)}
                />
                :<></>
                }
            </div>
            <div class="col-sm-2 d-none d-sm-block">
                <SelectInput
                    defaultOption="Select Number of Wins"
                    options={winOptions}
                    optionsKey="wins"
                    value={game.awayScore}
                    fieldName="awayScore"
                    valueKey="wins"
                    onChange={(event)=>props.onChange(event, game, gameIndex)}
                />
            </div>
        </div>
    </div>
);
}

export default GameEntry;