import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import FilmService from '../../services/FilmService';
import { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import './SingleContentPage.sass'
import '../../styles/styles.sass'

function SingleContentPage (props) {
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
            {loading ? <Spinner/> : <ViewInfo info={info} type={type}/>}
            <Footer/>
        </>
    )
}

function ViewInfo ({info, type}) {

    const toggleBtn = () => {
        if(type === 'movie') {
            return (
                sessionStorage.getItem('sessionId') ? <Link to={`/profile/${sessionStorage.getItem('sessionId')}/${sessionStorage.getItem('listId')}/${info.id}`}><div className="button-large single__btn">Add this film to your list</div></Link> :
                <Link to={`/account/${info.id}`}>
                    <div className="button-large single__btn">Add this film to your list</div>
                </Link>
            )
        } else {
            return null
        }
    }
    return (
        <>
            <div className="single__block">
                <div className="single__img"><img src={info.image} alt={info.title || info.name} /></div>
                <div className="single__info">
                    <div className="single__info-details">
                        <div className="single__info-text"><span>Title:</span> {info.title || info.name}</div>
                        <div className="single__info-text">{info.adult ? '18+' : null}</div>
                        <div className="single__info-text"><span>Genres:</span> {info.genre}</div>
                        <div className="single__info-text"><span>Country:</span> {info.country}</div>
                        <div className="single__info-text"><span>Status:</span> {info.status}</div>
                        <div className="single__info-text"><span>Release date:</span> {info.date}</div>
                        <div className="single__info-text"><span>Popularity:</span> {info.popularity}</div>
                        <div className="single__info-text"><span>Language:</span> {info.language}</div>
                        <div className="single__info-text"><span>Vote:</span> {info.vote}</div>
                    </div>
                    <div className="single__info-overview">
                        {info.overview}
                    </div>
                    {toggleBtn()}
                    
                </div>
            </div>
        </>
    )
}

export default SingleContentPage