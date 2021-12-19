/* eslint-disable react/jsx-no-target-blank */
import Header from "../Header/Header";
import Footer from '../Footer/Footer';

import '../../styles/styles.sass'
import './EnterPage.sass'
import bg from '../../resources/img/bg/enter__bg.png'
import FilmService from '../../services/FilmService';
import {useEffect, useState} from 'react'

function EnterPage () {
    const filmService = new FilmService();
    const [token, setToken] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [listId, setListId] = useState('');

    useEffect(() => {
        filmService.getRequestToken().then(data => setToken(data.request_token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getId = async () => {
        let result = await filmService.getSessionId(token)
        .then(data => {
            setSessionId(data.session_id);
            return data.session_id;
        });
        console.log(result)
        return result;
    }

    const data = {
        "name": "This is my awesome test list.",
        "description": "Just an awesome list dawg.",
        "language": "en"
    }

    const createList = async () => {
        let request = await fetch(`https://api.themoviedb.org/3/list?api_key=4aaf41b3f13597064b5ab63a054684c1&session_id=${sessionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        });

        let result = await request.json();
        setListId(result.list_id);
        console.log(result.list_id);
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
                    <div className="enter__text">If you have passed the previous stage - click on the button below:</div>
                    <div onClick={getId} className="button-large enter__btn">Get access</div>
                    <div onClick={createList} className="button">Make list</div>
                    <div className="button">Add something</div>
                    <div className="button">Get data from list</div>
                </div>
            </div>
            <div className="enter__bg"><img src={bg} alt="EnterBg" /></div>
            </section>
            <Footer/>
        </>
    )
}

export default EnterPage