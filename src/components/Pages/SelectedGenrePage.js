import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FilmService from '../../services/FilmService';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import ContentList from "../ContentList/ContentList";

function SelectedGenrePage () {
    const {genre} = useParams();
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();

    const updateInfo = () => {
        filmService.getGenreContent(genre).then(onInfoLoaded);
    }

    const onInfoLoaded = (newInfo) => {
        setInfo(info => [...info, ...newInfo]);
        setLoading(loading => false)
    }

    useEffect(() => {
        updateInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genre]);

    return (
        <>
            <Header/>
            <ContentList type={'movie'} data = {info} loading={loading} title={`These are the most popular films in this genre:`}/>
            <Footer/>
        </>
    )
}

export default SelectedGenrePage