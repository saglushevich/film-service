/* eslint-disable react/jsx-no-target-blank */
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import ContentList from "../ContentList/ContentList";
import Spinner from "../Spinner/Spinner";

import '../../styles/styles.sass'
import './AccountPage.sass'
import bg from '../../resources/img/bg/enter__bg.png'
import FilmService from '../../services/FilmService';
import {useEffect, useState} from 'react'

function AccountPage () {
    const filmService = new FilmService();
    const [token, setToken] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [listId, setListId] = useState(8169411);
    const [loading, setLoading] = useState(true);
    const [favoriteList, setFavoriteList] = useState([]);
    const [buttonState, setButtonState] = useState(true)

    useEffect(() => {
        filmService.getRequestToken().then(data => setToken(data.request_token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFavoriteListLoaded = (film) => {
        setFavoriteList(favoriteList => [...favoriteList, ...film]);
        setLoading(loading => false);
    }

    const updateList = () => {
        filmService.getData(listId).then(onFavoriteListLoaded)
    }

    const getId = async () => {
        let result = await filmService.getSessionId(token)
        .then(data => {
            setSessionId(data.session_id);
            return data.session_id;
        });
        console.log(result)
        return result;
    }

    const toggleButton = () => {
        setButtonState(buttonState => !buttonState)
    }

    return (
        <>
            <Header/>
            {buttonState ? <EnterPage token={token} getId={getId} toggleButton={toggleButton}/> : <Profile loading={loading} data={favoriteList} updateList={updateList}/>}
            <Footer/>
        </>
    )
}

function EnterPage ({token, getId, toggleButton}) {
    return (
        <section className="enter">
            <div className="container">
                <h2 className="enter__title">There are several steps to access your account:</h2>
                <div className="enter__info">
                    <div className="enter__step-first">
                        <div className="enter__text">
                            First you need to log into your account, or create a new account. This can be done by clicking the button below. There will also be instructions
                        </div>
                        <a href={`https://www.themoviedb.org/authenticate/${token}`} target="_blank" className="button-large enter__btn">Log in</a>
                    </div>
                    <div className="enter__step-second">
                        <div className="enter__text">If you have passed the previous stage - click on the button below:</div>
                        <div onClick={() => {getId(); toggleButton()}} className="button-large enter__btn">Get access</div>
                    </div>
                    
                </div>
            </div>
            <div className="enter__bg"><img src={bg} alt="EnterBg" /></div>
        </section>
    )
}

function Profile ({loading, data, updateList}) {
    useEffect(() => {
        updateList();
    }, [])
    return (
        <ContentList title='This is a list of films that you found interesting:' loading={loading} type="movie" data={data}/>
    )
}
export default AccountPage