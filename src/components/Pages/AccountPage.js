/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import '../../styles/styles.sass'
import './AccountPage.sass'
import bg from '../../resources/img/bg/enter__bg.png'
import FilmService from '../../services/FilmService';
import { Link } from "react-router-dom";
import {useEffect, useState} from 'react'
import Spinner from "../Spinner/Spinner";

function AccountPage () {
    const filmService = new FilmService();
    const [token, setToken] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [createdList, setCreatedList] = useState([]);
    const [listId, setListId] = useState('');

    useEffect(() => {
        filmService.getRequestToken().then(data => setToken(data.request_token));
    }, []);

    const getSessionId = async () => {
        await filmService.getSessionId(token).then(data => setSessionId(data.session_id)); 
    }

    const onCreatedListLoaded = (item) => {
        setCreatedList(createdList => [...createdList, ...item]);
    }

    useEffect(() => {
        if(!sessionId) {
            return;
        }
        setCreatedList([]);
        filmService.getCreatedList(sessionId).then(onCreatedListLoaded);
    }, [sessionId])

    useEffect(() => {
        if(!createdList) {
            return;
        }
        createdList.map(item => {
            setListId(item.id)
        })
        
    }, [createdList])


    return (
        <>
            <Header/>
            <section className="enter">
                <div className="container">
                    <h2 className="enter__title">There are several steps to access your account:</h2>
                    <div className="enter__info">   
                        <div className="enter__text">
                            First you need to log into your account, or create a new account. This can be done by clicking the button below. There will also be instructions
                        </div>
                        <a href={`https://www.themoviedb.org/authenticate/${token}`} target="_blank" className="button-large enter__btn">Log in</a>
                        <div className="enter__text">If you have passed the previous stage - click on the button below: you need to get the session key</div>
                        <div onClick={getSessionId} className="button-large enter__btn">Get access</div>
                        <Link to={`/profile/${sessionId}/${listId}`}>
                            <div className="button-large enter__btn">Ok. Click</div>
                        </Link>
                    </div>
                </div>
                <div className="enter__bg"><img src={bg} alt="EnterBg" /></div>
            </section>
            <Footer/>
        </>
    )
}

function ProfilePage () {
    const {sessionId, listId} = useParams();
    const [listContent, setListContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();

    const onListContentLoaded = (item) => {
        setListContent(listContent => [...listContent, ...item]);
        setLoading(loading => false);
    }
    
    useEffect(() => {
        filmService.getListDetails(listId).then(data => data.items).then(onListContentLoaded);
    }, [])

    const elements = listContent.map(item => {
        return (
            <Link to={`/details/${item.media_type}/${item.id}`} key={item.id}>
                <li key={item.id} className="singleListPage__item">
                    <div className="singleListPage__item-img"><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.name } /></div>
                    <div className="singleListPage__item-title">{item.name}</div>  
                </li>
            </Link>
        )
    })

    return (
        <>
            <Header/>
            <section className="singleListPage">
                <div className="container">
                    <h2 className="singleListPage__title">The contents of your list:</h2>
                    <Link to={`/profile/${sessionId}/${listId}`}>
                        <div className="button-large singleListPage__btn">Add film to your list</div>
                    </Link>
                    {loading ? <Spinner/> : null}
                    <ul className="singleListPage__grid">
                        {!loading ? elements : null}
                    </ul>
                </div>
            </section>
            <Footer/>
        </>
    )
}
export {ProfilePage, AccountPage}