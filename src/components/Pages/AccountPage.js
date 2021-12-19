/* eslint-disable react/jsx-no-target-blank */
import Header from "../Header/Header";
import Footer from '../Footer/Footer';

import '../../styles/styles.sass'
import './AccountPage.sass'
import bg from '../../resources/img/bg/enter__bg.png'
import FilmService from '../../services/FilmService';
import {useEffect, useState} from 'react'

function AccountPage () {
    const filmService = new FilmService();
    const [token, setToken] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [pageType, setPageType] = useState(true);
    const [accountId, setAccountId] = useState('');
    const [createdList, setCreatedList] = useState({})

    useEffect(() => {
        filmService.getRequestToken().then(data => setToken(data.request_token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getId = async () => {
        await filmService.getSessionId(token).then(data => setSessionId(data.session_id));
    }

    const data = {
        "name": "This is my awesome test list.",
        "description": "Just an awesome list dawg.",
        "language": "en"
    }

    const createList = async (id, data) => {
        await filmService.createList(id, data);
    }

    const getCreatedLists = async (id) => {
        await filmService.getCreatedList(id).then(data => data.results[0]).then(data => setCreatedList(data));
    }

    const getAccountId = async (id) => {
        await filmService.getAccountId(id).then(data => setAccountId(data.id));
    }

    const togglePage = () => {
        setPageType(pageType => !pageType)
    }

    return (
        <>
            <Header/>
            {pageType ? <EnterPage token={token} getId={getId} togglePage={togglePage}/> : <ProfilePage createList={() => createList(sessionId, data)} getCreatedLists={() => getCreatedLists(sessionId)} list={createdList}/>}
            <Footer/>
        </>
    )
}

function EnterPage ({token, getId, togglePage}) {
    return (
        <section className="enter">
            <div className="container">
                <h2 className="enter__title">There are several steps to access your account:</h2>
                <div className="enter__info">   
                    <div className="enter__text">
                        First you need to log into your account, or create a new account. This can be done by clicking the button below. There will also be instructions
                    </div>
                    <a href={`https://www.themoviedb.org/authenticate/${token}`} target="_blank" className="button-large enter__btn">Log in</a>
                    <div className="enter__text">If you have passed the previous stage - click on the button below:</div>
                    <div onClick={() => {getId(); togglePage()}} className="button-large enter__btn">Get access</div>
                </div>
            </div>
            <div className="enter__bg"><img src={bg} alt="EnterBg" /></div>
        </section>
    )
}

function ProfilePage ({createList, getCreatedLists, list}) {
    const [listState, setListState] = useState(true);

    const toggleListState = () => {
        setListState(listState => !listState);
    }

    return (
        <section className="profile">
            <div className="container">
                <h2 className="profile__title">What would you like to do:</h2>
                <div onClick={createList} className="button-large profile__btn">Create list</div>
                <div onClick={() => {getCreatedLists(); toggleListState()}} className="button-large profile__btn">Get created Lists</div>
                <div style={listState ? {'display': 'none'} : {'display': 'block'}} className="profile__lists">
                    <div className="profile__item">
                        <div className="profile__item-name">{list.name}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccountPage