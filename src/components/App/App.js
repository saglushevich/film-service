import MainPage from "../Pages/MainPage";
import SearchPage from '../Pages/SearchPage'
import TVPage from "../Pages/TVPage";
import MoviePage from "../Pages/MoviePage";
import PeoplePage from "../Pages/PeoplePage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <MainPage/>
                    </Route>
                    <Route path="/search">
                        <SearchPage/>
                    </Route>
                    <Route path="/movie">
                        <MoviePage/>
                    </Route>
                    <Route path="/tv">
                        <TVPage/>
                    </Route>
                    <Route path="/people">
                        <PeoplePage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
