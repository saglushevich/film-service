/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import ContentList from "../ContentList/ContentList";
import {getContentGenres} from '../../services/FilmService'

function SelectedGenrePage () {
    const {genre} = useParams();
    const [loading, setLoading] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(2);

    const updateMovieList = async (page) => {
        setLoading(true)
        await getContentGenres(genre, page).then(data => data.results).then(data => setMovieList(movieList => [...movieList, ...data]));
        setLoading(false)
    }

    const getNewFilms = () => {
        setPage(page => page + 1);
        updateMovieList(page)
    }

    useEffect(() => {
        window.scrollTo(0,0);
        updateMovieList(1)
    }, [genre]);

    return (
        <>
            <Header/>
            <ContentList data={movieList} title={`These are the most popular films in this genre:`} type={'movie'} loading={loading} getNewList={getNewFilms}/>
            <Footer/>
        </>
    )
}

export default SelectedGenrePage