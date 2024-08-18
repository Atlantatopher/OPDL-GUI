import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

import CurrentSeason from '../components/season/CurrentSeason.js';
import TeamQualityPoints from '../components/quality/TeamQualityPoints.js';
import NineMarks from '../components/quality/NineMarks.js';
import TonEighty from '../components/quality/TonEighty.js';
import Corks from '../components/quality/Corks.js';
import PlayerQuality from '../components/quality/PlayerQuality.js';
import HighIns from '../components/quality/HighIns.js';
import HighOuts from '../components/quality/HighOuts.js';

import {useLocation} from 'react-router-dom';


function QualityHighlightPage(props) {
    return(
        <>
            <h1>OPDL Quality Report</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <p>As of Week {props.weekNum}</p>
            <div class="row justify-content-left">
                <div class="col-md-6">
                    <TeamQualityPoints/>
                    <PlayerQuality/>

                </div>
                <div class="col-md-6">
                    <NineMarks/>
                    <TonEighty/>
                    <Corks/>
                    <HighIns seasonId = {props.seasonId}/>
                    <HighOuts seasonId = {props.seasonId}/>
                </div>
            </div>
        </>
    )
}

export default QualityHighlightPage;