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

    useEffect(() => {
        filmService.getRequestToken().then(data => setToken(data.request_token));
    }, []);

    const getSessionId = async () => {
        await filmService.getSessionId(token).then(data => setSessionId(data.session_id));
    }

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
                        <Link to={`/profile/${sessionId}`}>
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
    const {sessionId} = useParams();
    const [createdList, setCreatedList] = useState([]);
    const [loading, setLoading] = useState(true)
    const filmService = new FilmService();

    const data = {
        "name": "This is my awesome test list.",
        "description": "Just an awesome list dawg.",
        "language": "en"
    }

    const items = createdList.map(item => {
        return (
            <Link to={`/list/${sessionId}/${item.id}`} key={item.id}>
                <div key={item.id} className="profile__item">
                    <div className="profile__item-name">{item.name}</div>
                </div>
            </Link>
        )
    });

    const createList = async () => {
        await filmService.createList(sessionId, data);
        updateCreatedList();
    }

    const onCreatedListLoaded = (item) => {
        setCreatedList(createdList => [...createdList, ...item]);
        setLoading(loading => false)
    }

    const updateCreatedList = () => {
        setCreatedList([]);
        filmService.getCreatedList(sessionId).then(onCreatedListLoaded);
    }

    useEffect(() => {
        updateCreatedList();
    }, [sessionId]);

    return (
        <>
            <Header/>
            <section className="profile">
                <div className="container">
                    <h2 className="profile__title">Here is a list of films that you found interesting:</h2>
                    <div onClick={createList} className="button-large profile__btn">Create list</div> 
                    <div className="profile__lists">
                        {loading ? <Spinner/> : items}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

function SingleListPage () {
    const {sessionId, id} = useParams();
    const [listContent, setListContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();

    const onListContentLoaded = (film) => {
        setListContent(listContent => [...listContent, ...film]);
        setLoading(loading => false);
    }

    const onUpdateList = () => {
        filmService.getDataFromList(id).then(data => data.items).then(onListContentLoaded)
    }

    useEffect(() => {
        onUpdateList();
    }, [id])

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
                    <h2 className="singleListPage__title">Contents of this list:</h2>
                    <Link to={`/profile/${sessionId}/${id}`}>
                        <div className="button-large singleListPage__btn">Add film to your list</div>
                    </Link>
                    <ul className="singleListPage__grid">
                        {loading ? <Spinner/> : elements}
                    </ul>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default AccountPage
export {ProfilePage}