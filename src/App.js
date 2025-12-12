import logo from './logo.svg';
import './App.css';
import {
BrowserRouter as Router,
Routes,
Route,
Navigate,
useNavigate,
} from "react-router-dom";

import BarsPage from './pages/BarsPage.js';
import TeamsPage from './pages/TeamsPage.js';
import PlayersPage from './pages/PlayersPage.js';
import CaptainsPage from './pages/CaptainsPage.js';
import SchedulePage from './pages/SchedulePage.js';
import AddPubPage from './pages/AddPubPage.js';
import AddTeamPage from './pages/AddTeamPage.js';
import AddSchedulePage from './pages/AddSchedulePage.js';
import EditMatchPage from './pages/EditMatchPage.js';
import StandingsPage from './pages/StandingsPage.js';
import PlayerStatsPage from './pages/PlayerStatsPage.js';
import PlayerEligibilityPage from './pages/PlayerEligibilityPage.js';
import QualityHighlightPage from './pages/QualityHighlightPage.js';
import OPDNavbar from './components/utility/Navbar.js';


function App() {

    const seasonId = "5";
    const weekNum = "2"
        return (

        <div className="App">
            <header>
                <OPDNavbar/>
            </header>
            <body>
                <Router>
                    <Routes>


                        {/* This route is for home component
                        with exact path "/", in component props
                        we passes the imported component*/}
                        <Route
                            exact
                            path="/"
                            element={<StandingsPage seasonId={seasonId} weekNum={weekNum} />}
                        />

                        <Route
                            exact
                            path="/bars"
                            element={<BarsPage seasonId={seasonId} />}
                        />

                        {/* This route is for about component
                        with exact path "/about", in component
                        props we passes the imported component*/}
                        <Route
                            exact
                            path="/teams"
                            element={<TeamsPage seasonId={seasonId} />}
                        />

                        {/* This route is for contactus component
                        with exact path "/contactus", in
                        component props we passes the imported component*/}
                        <Route
                            exact
                            path="/players"
                            element={<PlayersPage seasonId={seasonId} />}
                        />

                        <Route
                            exact
                            path="/schedule"
                            element={<SchedulePage seasonId={seasonId} />}
                        />

                        <Route
                            exact
                            path="/registerPub"
                            element={<AddPubPage seasonId={seasonId} />}
                        />

                        <Route
                            exact
                            path="/registerTeam"
                            element={<AddTeamPage seasonId={seasonId} />}
                        />

                        <Route
                            exact
                            path="/registerSchedule"
                            element={<AddSchedulePage seasonId={seasonId} />}
                        />

                        <Route
                            exact
                            path="/editMatch"
                            element={<EditMatchPage seasonId={seasonId} />}
                        />

                        <Route
                            exact
                            path="/standings"
                            element={<StandingsPage seasonId={seasonId} weekNum={weekNum} />}
                        />

                        <Route
                            exact
                            path="/playerStats"
                            element={<PlayerStatsPage seasonId={seasonId} weekNum={weekNum} />}
                        />
                        <Route
                            exact
                            path="/playerEligibility"
                            element={<PlayerEligibilityPage seasonId={seasonId} weekNum={weekNum} />}
                        />
                        <Route
                            exact
                            path="/qualityReport"
                            element={<QualityHighlightPage seasonId={seasonId} weekNum={weekNum} />}
                        />

                        <Route
                            exact
                            path="/captains"
                            element={<CaptainsPage seasonId={seasonId} />}
                        />



                    {/* If any route mismatches the upper
                    route endpoints then, redirect triggers
                    and redirects app to home component with to="/" */}
                    {/* <Redirect to="/" /> */}
                    <Route
                    path="*"
                    element={<Navigate to="/" />}
                    />
                    </Routes>
                </Router>
            </body>
        </div>
    );
}

export default App;
