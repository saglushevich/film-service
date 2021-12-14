import './Footer.sass'
import '../../styles/styles.sass'
import { NavLink } from 'react-router-dom'

function Footer () {
    return (
        <footer className="footer">
            <div className="container">
            <ul className="nav__menu">
                        <li><NavLink to="/" exact activeStyle={{'color': '#ffffff'}} className="nav__item">Home</NavLink></li>
                        <li><NavLink to="/tv" exact activeStyle={{'color': '#ffffff'}} className="nav__item">TV Shows</NavLink></li>
                        <li><NavLink to="/movie" exact activeStyle={{'color': '#ffffff'}} className="nav__item">Movies</NavLink></li>
                        <li><NavLink to="/people" exact activeStyle={{'color': '#ffffff'}} className="nav__item">People</NavLink></li>
                    </ul>
            </div>
        </footer>
    )
}

export default Footer