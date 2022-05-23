/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import {getContentById} from '../../services/FilmService'
import './SingleContentPage.sass'
import '../../styles/styles.sass'

function SingleContentPage (props) {
    const {type} = props;
    const {id} = useParams();
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState({})

    const getContentInfo = async () => {
        setLoading(true);
        await getContentById(type, id).then(data => setContent(content => data))
        setLoading(false)
    }
    useEffect(() => {
        getContentInfo()
    }, [])

    console.log(content)
    return (
        <>
            <Header/>
                {loading ? <Spinner/> :
                <div className="single__block">
                    <ViewContent type={type} content={content}/>
                </div>
                }
            <Footer/>
        </>
    )
}

function ViewContent ({type, content}) {

    if (type === 'person') {
        return (
            <>
                <div className="single__img"><img src={`https://image.tmdb.org/t/p/w500${content.profile_path}`} alt={content.name} /></div>
                <div className="single__info">
                    <div className="single__info-text">Name: {content.name}</div>
                    <div className="single__info-details">
                        <div className="single__info-text">Department: {content.known_for_department}</div>
                        <div className="single__info-text">Date of birth: {content.birthday}</div>
                        <div className="single__info-text">{content.deathday ? `Date of death: ${content.deathday}` : null}</div>
                        <div className="single__info-text">Place of birth: {content.place_of_birth}</div>
                        <div className="single__info-text">Popularity: {content.popularity}</div>
                    </div>
                    <div className="single__info-overview">
                        {content.biography}
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="single__img"><img src={`https://image.tmdb.org/t/p/w500${content.poster_path}`} alt={content.title || content.name} /></div>
                <div className="single__info">
                    <div className="single__info-details">
                        <div className="single__info-text"><span>Title:</span> {content.title || content.name}</div>
                        <div className="single__info-text"><span>Tagline:</span> {content.tagline || content.name || content.title}</div>
                        <div className="single__info-text">{content.adult ? '18+' : null}</div>
                        <div className="single__info-text"><span>Status:</span> {content.status}</div>
                        <div className="single__info-text"><span>Release date:</span> {content.release_date || content.first_air_date}</div>
                        <div className="single__info-text"><span>Popularity:</span> {content.popularity}</div>
                        <div className="single__info-text"><span>Language:</span> {content.original_language}</div>
                        <div className="single__info-text"><span>Vote:</span> {content.vote_average}</div>
                    </div>
                    <div className="single__info-overview">
                        {content.overview}
                    </div>
                </div>
            </>
        )
    }
}

export default SingleContentPage