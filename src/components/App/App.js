import MainPage from "../Pages/MainPage";
import SearchPage from '../Pages/SearchPage'
import TVPage from "../Pages/TVPage";
import MoviePage from "../Pages/MoviePage";
import PeoplePage from "../Pages/PeoplePage";
import ContentPage from "../Pages/ContentPage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useState} from 'react'

function App () {
    const [selectedId, setSelectedId] = useState(null);
    const [selectedtype, setSelectedType] = useState(null);
    
    const onSelected = (id, type) => {
        setSelectedId(id);
        setSelectedType(type)
    } 

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
                        <MoviePage onSelected={onSelected}/>
                    </Route>
                    <Route path="/tv">
                        <TVPage onSelected={onSelected}/>
                    </Route>
                    <Route path="/people">
                        <PeoplePage/>
                    </Route>
                    <Route path="/details" exact>
                        <ContentPage id={selectedId} type={selectedtype}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
