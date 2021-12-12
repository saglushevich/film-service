import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FilmService from '../../services/FilmService';
import {useState, useEffect} from 'react';
import ContentList from '../ContentList/ContentList'

function MoviePage (props) {
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(2);
    const filmService = new FilmService();

    const onMovieListLoaded = (item) => {
        setMovieList(movieList => [...movieList, ...item]);
        setLoading(loading => false);
    }

    const updateMovieList = (type, page) => {
        filmService.getPopularContent(type, page).then(onMovieListLoaded);
    }

    const getNewMovieList = () => {
        setPage(page => page + 1);
        updateMovieList('movie', page);
    }

    useEffect(() => {
        updateMovieList('movie');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header/>
            <ContentList type={'movie'} onSelected={props.onSelected} getNewList={getNewMovieList} data={movieList} loading={loading} title={'Movies: '}/>
            <Footer/>
        </>
    )
}

export default MoviePage;