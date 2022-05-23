import '../../styles/styles.sass'
import './Promo.sass'
import rating from '../../resources/icons/rating.svg';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

function Promo () {
    const movies = useSelector(state => state.movies)

    const {title, adult, vote_average, release_date, overview, id, poster_path} = movies[0];

    return (
        <section className="promo">
            <div className="container">
                <h1 className="promo__title">{title}</h1>
                <div className="promo__info">
                    <div className="promo__info-text">{release_date}</div>
                    <div className="promo__info-age">{adult ? '18+' : '12+'}</div>
                    <div className="promo__info-text">{vote_average}<img src={rating} alt="rating"/></div>
                </div>
                <div className="promo__text">{overview.length > 200 ? `${overview.slice(0, 200)}...` : overview}</div>
                <Link to={`/details/movie/${id}`} key={id}>
                    <div className="button-large promo__btn">More information</div>
                </Link>
                <div className="promo__img"><img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="main__bg" /></div>
            </div>
        </section>
    )
}

export default Promo;