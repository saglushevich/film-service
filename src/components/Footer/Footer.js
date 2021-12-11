import './Footer.sass'
import '../../styles/styles.sass'

function Footer () {
    return (
        <footer className="footer">
            <div className="container">
                <ul className="nav__menu">
                    <li><a href="#" className="nav__item">Home</a></li>
                    <li><a href="#" className="nav__item">TV Shows</a></li>
                    <li><a href="#" className="nav__item">Movies</a></li>
                    <li><a href="#" className="nav__item">People</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer