import './Trending.sass';
import '../../styles/styles.sass'
import FilmService from '../../services/FilmService';
import Spinner from '../Spinner/Spinner';
import {useEffect, useState} from 'react'

function TrendingTV () {
    const [trendingTVList, setTrendingTVList] = useState([]);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();

    const onTrendingTVListLoaded = (tv) => {
        setTrendingTVList(trendingTVList => [...trendingTVList, ...tv]);
        setLoading(loading => false);
    }

    useEffect(() => {
        filmService.getPopularContent('tv').then(onTrendingTVListLoaded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tv = trendingTVList.map((item, i) => {
        if (i < 6) {
            return <li key={item.id} className="trending__item"><img src={item.image} alt={item.title} /></li>
        }
        return null
    })

    const content = loading ? <Spinner/> : tv

    return (
        <section className="trending">
            <div className="container">
                <h2 className="trending__subtitle">
                    <div className="trending__divider"></div>
                    Trending TV Shows
                </h2>
                <ul className="trending__block">
                    {content}
                </ul>
            </div>
        </section>
    )
}

export default TrendingTV