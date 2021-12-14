import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import FilmService from '../../services/FilmService';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import './SingleContentPage.sass'
import '../../styles/styles.sass'

function SinglePersonPage () {
    const {id} = useParams();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();

    const updateInfo = () => {
        filmService.getPerson(id).then(onInfoLoaded);
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
            {loading ? <Spinner/> : <ViewInfo person={info}/>}
            <Footer/>
        </>
    )
}

function ViewInfo ({person}) {
    return (
        <>
            <h2 className="single__title">Look at the info below: </h2>
            <div className="single__block">
                <div className="single__img"><img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} /></div>
                <div className="single__info">
                    <div className="single__info-text">Name: {person.name}</div>
                    <div className="single__info-details">
                        <div className="single__info-text">Department: {person.known_for_department}</div>
                        <div className="single__info-text">Date of birth: {person.birthday}</div>
                        <div className="single__info-text">{person.deathday ? `Date of death: ${person.deathday}` : null}</div>
                        <div className="single__info-text">Place of birth: {person.place_of_birth}</div>
                        <div className="single__info-text">Popularity: {person.popularity}</div>
                    </div>
                    <div className="single__info-overview">
                        {person.biography}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePersonPage