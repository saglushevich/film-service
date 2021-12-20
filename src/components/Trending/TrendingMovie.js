import './Trending.sass';
import '../../styles/styles.sass'
import FilmService from '../../services/FilmService';
import Spinner from '../Spinner/Spinner';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function TrendingMovie () {
    const [trendingMovieList, setTrendingMovieList] = useState([]);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();

    const onTrendingMovieListLoaded = (film) => {
        setTrendingMovieList(trendingMovieList => [...trendingMovieList, ...film]);
        setLoading(loading => false);
    }

    useEffect(() => {
        filmService.getPopularContent('movie').then(onTrendingMovieListLoaded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const movie = trendingMovieList.map((item, i) => {
        if (i < 6) {
            return (
                <Link to={`/details/movie/${item.id}`} key={item.id}>
                    <li key={item.id} className="trending__item"><img src={item.image} alt={item.title} /></li>
                </Link>
            )
        }
        return null
    })

    const content = loading ? <Spinner/> : movie

    return (
        <section className="trending">
            <div className="container">
                <h2 className="trending__subtitle">
                    <div className="trending__divider"></div>
                    Trending Movies
                </h2>
                <ul className="trending__block">
                    {content}
                </ul>
                <Link to="/movie"><div className="button">See more</div></Link>
            </div>
        </section>
    )
}

export default TrendingMovie