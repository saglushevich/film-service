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
    const [token, setToken] = useState('');

    const getToken = async () => {
        await filmService.getResource(`https://api.themoviedb.org/3/authentication/token/new?api_key=4aaf41b3f13597064b5ab63a054684c1`)
        .then(data => setToken(data.request_token));
    }

    useEffect(() => {
        getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                        <div className="nav__icon"><a href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/`}><img src={profile} alt="profile" /></a></div>
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Header