import '../../styles/styles.sass'
import './Promo.sass'
import rating from '../../resources/icons/rating.svg';
import FilmService from '../../services/FilmService';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';

function Promo () {
    const [banner, setBanner] = useState([]);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();

    const onBannerLoaded = (film) => {
        setBanner(banner => [...banner, ...film]);
        setLoading(loading => false);
    }

    useEffect(() => {
        if (!banner) {
            return;
        }
        filmService.getPopularContent('movie').then(onBannerLoaded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const spinner = loading ? <Spinner/> : null;
    const content = !loading ? <ViewPromo film={banner[0]}/> : null

    return (
        <section className="promo">
            <div className="container">
                {spinner}
                {content}
            </div>
        </section>
    )

}

function ViewPromo ({film}) {
    const {title, date, overview, adult, vote, image, id} = film;
    return (
        <>
            <h1 className="promo__title">{title}</h1>
                <div className="promo__info">
                    <div className="promo__info-text">{date}</div>
                    <div className="promo__info-age">{adult ? '18+' : '12+'}</div>
                    <div className="promo__info-text">{vote}<img src={rating} alt="rating"/></div>
                </div>
                <div className="promo__text">{overview.length > 200 ? `${overview.slice(0, 200)}...` : overview}</div>
                {/* <div className="promo__btns">
                    <div className="button">Watch</div>
                    
                </div> */}
                <Link to={`/details/movie/${id}`} key={id}>
                    <div className="button-large promo__btn">More information</div>
                </Link>
            <div className="promo__img"><img src={image} alt="main__bg" /></div>
        </>
    )
}

export default Promo;