/* eslint-disable react/jsx-no-target-blank */
import './EnterPageContent.sass'
import '../../styles/styles.sass'
import bg from '../../resources/img/bg/enter__bg.png'
import FilmService from '../../services/FilmService';
import {useEffect, useState} from 'react'


function EnterPageContent () {

    const filmService = new FilmService();
    const [token, setToken] = useState('');
    const [sessionId, setSessionId] = useState('');

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

    return (
        <section className="enter">
            <div className="container">
                <h2 className="enter__title">There are several steps to access your account:</h2>
                <div className="enter__info">
                    <div className="enter__text">
                        First you need to log into your account, or create a new account. This can be done by clicking the button below. There will also be instructions
                    </div>
                    <a href={`https://www.themoviedb.org/authenticate/${token}`} target="_blank" className="button-large enter__btn">Log in</a>
                    {/* <div className="button-large enter__btn"><a href="">Log in</a></div> */}
                    <div className="enter__text">If you have passed the previous stage - click on the button below:</div>
                    <div onClick={getId} className="button-large enter__btn">Get access</div>
                </div>
            </div>
            <div className="enter__bg"><img src={bg} alt="EnterBg" /></div>
        </section>
    )
}

export default EnterPageContent;