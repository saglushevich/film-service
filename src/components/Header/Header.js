import '../../styles/styles.sass';
import './Header.sass';
import search from '../../resources/icons/search.svg';
import profile from '../../resources/icons/profile.svg';
import logo from '../../resources/logo/logo.svg';

function Header () {
    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <a href='#' className="nav__logo"><img src={logo} alt="logotype" /></a>
                    <ul className="nav__menu">
                        <li><a href="#" className="nav__item">Home</a></li>
                        <li><a href="#" className="nav__item">TV Shows</a></li>
                        <li><a href="#" className="nav__item">Movies</a></li>
                        <li><a href="#" className="nav__item">People</a></li>
                    </ul>
                    <div className="nav__icons">
                        <div className="nav__icon"><a href="#"><img src={search} alt="search" /></a></div>
                        <div className="nav__icon"><a href="#"><img src={profile} alt="profile" /></a></div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header