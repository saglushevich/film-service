import './Trending.sass'
import '../../styles/styles.sass'
import FilmService from '../../services/FilmService';
import Spinner from '../Spinner/Spinner';
import {useEffect, useState} from 'react'

function TrendingActors () {
    const [trendingActorsList, setTrendingActorsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();

    const onTrendingActorsListLoaded = (actor) => {
        setTrendingActorsList(trendingActorsList => [...trendingActorsList, ...actor]);
        setLoading(loading => false);
    }

    useEffect(() => {
        filmService.getPopularActors().then(onTrendingActorsListLoaded).catch('Something went wrong!');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const actors = trendingActorsList.map((item, i) => {
        if (i < 6) {
            return <li key={item.id} className="trending__item"><img src={item.image} alt={item.title} /></li>
        }
        return null
    })

    const content = loading ? <Spinner/> : actors

    return (
        <section className="trending">
            <div className="container">
                <h2 className="trending__subtitle">
                    <div className="trending__divider"></div>
                    Popular Actors & Directors
                </h2>
                <ul className="trending__block">
                    {content}
                </ul>
            </div>
        </section>
    )
}

export default TrendingActors