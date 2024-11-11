import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";

import BarsTable from '../components/bars/BarsTable.js';
import PhoneNumber from '../components/utility/PhoneNumber.js';
import EmailAddress from '../components/utility/EmailAddress.js';
import TextInput from '../components/utility/TextInput.js';
import NumberInput from '../components/utility/NumberInput.js';
import AddressFieldset from '../components/utility/AddressFieldset.js';
import CurrentSeason from '../components/season/CurrentSeason.js';
import PlayerInfo from '../components/teams/PlayerInfo.js';


function AddPubPage(props) {

const location = useLocation();
const navigate = useNavigate();

const [pub, setPub] = useState({"id":location.state.barId});
const [team, setTeam] = useState({"seasonId":props.seasonId, "homeBar":{"id": location.state.barId}});
const [players, setPlayers] = useState([]);

const handleSubmit = event => {
    event.preventDefault();
    //console.log('props: ' + JSON.stringify(props));
    //console.log('form submitted ✅');
    //console.log('Bar Id: ' + location.state.barId);
    //console.log('pub: ' + JSON.stringify(pub));
    //console.log('team: ' + JSON.stringify(team));


    fetch('http://localhost:8080/api/v1/registerTeam', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(team),
       })
       .then((response) => {
          if(!response.ok) throw new Error(response.status);
           else return response.json()
       })
       .then((data) => {
            //console.log("Team data: " + JSON.stringify(data));
            setTeam(data);
            players.map(player => {player["team"] = data;});
            //console.log('players (after team update): ' + JSON.stringify(players));
            setPlayers(players)

            fetch('http://localhost:8080/api/v1/registerPlayers', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(players),
              })
              .then((response) => {
                 if(!response.ok) throw new Error(response.status);
                  else return response.json()
              })
              .then((data) => {
                   //console.log('players (after player update): ' + JSON.stringify(data));
                   setPlayers(data);
              })
              .catch((error) => {
                  console.log('error: ' + error);
              });
        })
       .catch((error) => {
           console.log('error: ' + error);
       });


};

const handlePlayerInputChange = (event, player, playerIndex) => {
    player[event.target.name] = event.target.value;
    //player["team"] = team;
    //console.log('playerIndex: ' + playerIndex);
    console.log('player: ' + JSON.stringify(player));
    players[playerIndex]=player;
    //console.log('players: ' + JSON.stringify(players));


}

const handleTeamInputChange = (event) => {
    team[event.target.name] = event.target.value;
    //console.log('team: ' + JSON.stringify(team));

}

const handleAddressChange = (event) => {
    //address[event.target.name] = event.target.value;
    //pub["address"] = address;
}

    return (
        <>
            <h1>Register OPDL Team</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <form id="registerPubForm" onSubmit={handleSubmit}>
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="row">
                            <TextInput
                                id="teamNameId"
                                label="Team Name"
                                name="teamName"
                                onChange={handleTeamInputChange}
                            />
                            <div class="col-md-6">
                                <fieldset>
                                    <legend>Captian</legend>
                                    <PlayerInfo
                                        nameId="captainNameId"
                                        nameLabel="Name"
                                        nameKey="playerName"
                                        emailId="captainEmailId"
                                        emailLabel="Email"
                                        emailKey="emailAddress"
                                        phoneId="captainPhoneId"
                                        phoneLabel="Phone #"
                                        phoneKey="phoneNumber"
                                        onChange={handlePlayerInputChange}
                                        playerType="Captain"
                                        playerIndex="0"
                                        seasonId={props.seasonId}
                                    />
                                </fieldset>
                            </div>
                            <div class="col-md-6">
                                <fieldset>
                                    <legend>Co-Captian</legend>
                                    <PlayerInfo
                                        nameId="cocaptainNameId"
                                        nameLabel="Name"
                                        nameKey="playerName"
                                        emailId="cocaptainEmailId"
                                        emailLabel="Email"
                                        emailKey="emailAddress"
                                        phoneId="cocaptainPhoneId"
                                        phoneLabel="Phone #"
                                        phoneKey="phoneNumber"
                                        onChange={handlePlayerInputChange}
                                        playerType="Co-Captain"
                                        playerIndex="1"
                                        seasonId={props.seasonId}
                                    />
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <fieldset>
                                <legend>Team Members</legend>
                                {Array.from({length: 14}).map((num, index) =>
                                    <>
                                    <PlayerInfo
                                        nameId={"NameId"+index+2}
                                        nameLabel="Name"
                                        nameKey="playerName"
                                        emailId={"EmailId"+index+2}
                                        emailLabel="Email"
                                        emailKey="emailAddress"
                                        phoneId={"PhoneId"+index+2}
                                        phoneLabel="Phone #"
                                        phoneKey="phoneNumber"
                                        onChange={handlePlayerInputChange}
                                        playerType="Member"
                                        playerIndex={index+2}
                                        seasonId={props.seasonId}
                                    />
                                    <br/>
                                    </>

                                )}
                            </fieldset>
                        </div>
                        <div class="row justify-content-end">
                            <input type="submit" id="submitPubRegistration" class="col-md-3 btn btn-primary"/>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddPubPage;