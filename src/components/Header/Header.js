import '../../styles/styles.sass';
import './Header.sass';
import search from '../../resources/icons/search.svg';
import logo from '../../resources/logo/logo.svg';
import {Link, NavLink} from 'react-router-dom';

function Header () {
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
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Header