import '../../styles/styles.sass';
import './Header.sass';
import search from '../../resources/icons/search.svg';
import profile from '../../resources/icons/profile.svg';
import logo from '../../resources/logo/logo.svg';
import {Link, NavLink} from 'react-router-dom';
import FilmService from '../../services/FilmService';
import {useEffect, useState} from 'react'

function Header () {
    const filmService = new FilmService();
    const [state, setState] = useState('');
    // const [link, setLink] = useState('');

    const getToken =  () => {
        let res = filmService.getResource(`https://api.themoviedb.org/3/authentication/token/new?api_key=4aaf41b3f13597064b5ab63a054684c1`)
        .then(data => data.request_token)
        .then(data => setState(data));

        // return res
    }
    
    // let fuck = ''
    getToken()
    // console.log(state);
    useEffect(() => {
        
        if(state !== '') {
            
            let link = `https://www.themoviedb.org/authenticate/${state}?redirect_to=http://localhost:3000/`;
            console.log(link);
        }
    }, [state])

    
    

    // const result = link.then(data => console.log(data))
    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <Link to='/' className="nav__logo"><img src={logo} alt="logotype" /></Link>
                    <ul className="nav__menu">
                        <li><NavLink to="/" exact activeStyle={{'color': '#ffffff'}} className="nav__item">Home</NavLink></li>
                        <li><NavLink to="/tv" exact activeStyle={{'color': '#ffffff'}} className="nav__item">TV Shows</NavLink></li>
                        <li><NavLink to="/movie" exact activeStyle={{'color': '#ffffff'}} className="nav__item">Movies</NavLink></li>
                        <li><NavLink to="/people" exact activeStyle={{'color': '#ffffff'}} className="nav__item">People</NavLink></li>
                    </ul>
                    <div className="nav__icons">
                        <div className="nav__icon"><Link to="/search"><img src={search} alt="search" /></Link></div>

                        <div className="nav__icon"><a href=''><img src={profile} alt="profile" /></a></div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

// const GenerateLink = async () => {
//     const filmService = new FilmService();

//     let res = await filmService.getResource(`https://api.themoviedb.org/3/authentication/token/new?api_key=4aaf41b3f13597064b5ab63a054684c1`)
//         .then(data => data.request_token);

//     let link = `https://www.themoviedb.org/authenticate/${res}?redirect_to=http://localhost:3000/`;

//    return link;
// }

export default Header