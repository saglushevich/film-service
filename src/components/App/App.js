/* eslint-disable react-hooks/exhaustive-deps */
import MainPage from "../Pages/MainPage";
import SearchPage from '../Pages/SearchPage'
import ContentPage from "../Pages/ContentPage";
import SingleContentPage from "../Pages/SingleContentPage";
import SelectedGenrePage from "../Pages/SelectedGenrePage";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { setLoading, setMovies, setTV, setPeople } from "../../reduxActions/reduxActions";
import { getAllContent } from "../../services/FilmService";
import '../../styles/media.sass'
import Spinner from "../Spinner/Spinner";

function App () {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading)
    const movies = useSelector(state => state.movies);
    const tv = useSelector(state => state.tv);
    const people = useSelector(state => state.people)

    const getContent = async () => {
        dispatch(setLoading(true));
        await getAllContent('movie').then(data => data.results).then(data => dispatch(setMovies(data)));
        await getAllContent('tv').then(data => data.results).then(data => dispatch(setTV(data)));
        await getAllContent('person').then(data => data.results).then(data => dispatch(setPeople(data)));
        dispatch(setLoading(false))
    }

    useEffect(() => {
        getContent();
    }, [])

    return (
        <div className="app">
            <Router>
                <Switch>
                    {loading ? <Spinner/> :
                    <>
                        <Route path="/" exact>
                            <MainPage/>
                        </Route>
                        <Route path="/search">
                            <SearchPage/>
                        </Route>

                        <Route path="/movie">
                            <ContentPage content={movies} type={"movie"} reduxAction={setMovies} title={"Movies: "}/>
                        </Route>
                        <Route path="/tv">
                            <ContentPage content={tv} type={"tv"} reduxAction={setTV} title={"Our TV page: "}/>
                        </Route>
                        <Route path="/people">
                            <ContentPage content={people} type={"person"} reduxAction={setPeople} title={"Popular actors: "}/>
                        </Route>

                        <Route path="/genres/:genre">
                            <SelectedGenrePage/>
                        </Route>

                        <Route path="/details/movie/:id">
                            <SingleContentPage type="movie"/>
                        </Route>
                        <Route path="/details/tv/:id">
                            <SingleContentPage type="tv"/>
                        </Route>
                        <Route path="/details/person/:id">
                            <SingleContentPage type="person"/>
                        </Route>
                    </>}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
