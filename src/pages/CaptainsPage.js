import React, { useState, useEffect } from 'react';

import PlayersTable from '../components/player/PlayersTable.js';
import CurrentSeason from '../components/season/CurrentSeason.js';

import {useLocation} from 'react-router-dom';

function CaptainsPage(props) {
const location = useLocation();
const [team, setTeam] = useState([]);


    return (
        <>
            <h1>OPDL Captains</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <PlayersTable
                seasonId={props.seasonId}
                isCaptains={true}
            />
        </>
    )
}

export default CaptainsPage;