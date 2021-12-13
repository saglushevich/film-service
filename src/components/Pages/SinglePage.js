import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import FilmService from '../../services/FilmService';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import './SinglePage.sass'
import '../../styles/styles.sass'

function SinglePage (props) {
    const {type} = props;
    const {id} = useParams();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();

    const updateInfo = () => {
        type === 'movie' ? filmService.getContent(id, 'movie').then(onInfoLoaded) : filmService.getContent(id, 'tv').then(onInfoLoaded);
    }

    const onInfoLoaded = (info) => {
        setInfo(info);
        setLoading(loading => false)
    }

    useEffect(() => {
        updateInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>
            <Header/>
            {loading ? <Spinner/> : <ViewInfo info={info}/>}
            <Footer/>
        </>
    )
}

function ViewInfo ({info}) {
    return (
        <>
            <h2 className="single__title">Look at the info below: </h2>
            <div className="single__block">
                <div className="single__img"><img src={info.image} alt={info.title || info.name} /></div>
                <div className="single__info">
                    <div className="single__info-text">Title: {info.title || info.name}</div>
                    <div className="single__info-details">
                        <div className="single__info-text">{info.adult ? '18+' : null}</div>
                        <div className="single__info-text">Popularity: {info.popularity}</div>
                        <div className="single__info-text">Status: {info.status}</div>
                        <div className="single__info-text">Language: {info.language}</div>
                        <div className="single__info-text">Vote: {info.vote}</div>
                        <div className="single__info-text">Release date: {info.date}</div>
                    </div>
                    <div className="single__info-overview">
                        {info.overview}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePage