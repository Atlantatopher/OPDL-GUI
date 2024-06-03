import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";

import BarsTable from '../components/bars/BarsTable.js';
import CurrentSeason from '../components/season/CurrentSeason.js';
import ButtonBar from '../components/utility/ButtonBar.js';


function BarsPage(props) {

const navigate = useNavigate();
const navigateToPubRegistration = () => {
    navigate('/registerPub',{state:{seasonId:props.seasonId}});
}

    return (
        <>
            <h1>OPDL Participating Pubs</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <BarsTable seasonId = {props.seasonId}/>
            <ButtonBar id="registerPubBtn" value="Register A Pub" onClick={()=>{navigateToPubRegistration()}}/>
        </>
    )
}

export default BarsPage;