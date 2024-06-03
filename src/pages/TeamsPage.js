import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";

import TeamsTable from '../components/teams/TeamsTable.js';
import CurrentSeason from '../components/season/CurrentSeason.js';
import ButtonBar from '../components/utility/ButtonBar.js';

import {useLocation} from 'react-router-dom';


function TeamsPage(props) {
const location = useLocation();
const navigate = useNavigate();
const navigateToTeamRegistration = () => {
    console.log("navigating to the team registration with barID: " + location.state.id);
    navigate('/registerTeam',{state:{seasonId:props.seasonId, barId:location.state.id}});
}
    return (
        <>
            <h1>OPDL Teams</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <TeamsTable
                homeBarId={location.state.id}
                seasonId = {props.seasonId}
            />
            <ButtonBar id="registerTeamBtn" value="Register A Team" onClick={()=>{navigateToTeamRegistration()}}/>
        </>
    )
}

export default TeamsPage;