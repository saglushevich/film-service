import MainPage from "../Pages/MainPage";
import SearchPage from '../Pages/SearchPage'
import TVPage from "../Pages/TVPage";
import MoviePage from "../Pages/MoviePage";
import PeoplePage from "../Pages/PeoplePage";
import SingleContentPage from "../Pages/SingleContentPage";
import SinglePersonPage from "../Pages/SinglePersonPage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App () {

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
                    <Route path="/details/movie/:id">
                        <SingleContentPage type="movie"/>
                    </Route>
                    <Route path="/details/tv/:id">
                        <SingleContentPage type="tv"/>
                    </Route>
                    <Route path="/details/person/:id">
                        <SinglePersonPage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
