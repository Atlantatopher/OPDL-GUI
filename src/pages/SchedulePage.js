import ScheduleTable from '../components/schedule/ScheduleTable.js';
import CurrentSeason from '../components/season/CurrentSeason.js';


function SchedulePage(props) {

    return (
        <>
            <h1>OPDL Current Schedule</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <ScheduleTable seasonId = {props.seasonId}/>
        </>
    )
}

export default SchedulePage;