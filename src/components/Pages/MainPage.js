import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import Genres from "../Genres/Genres";
import Footer from '../Footer/Footer';
import TrendingContent from '../TrendingContent/TrendingContent'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

function MainPage () {
    const movies = useSelector(state => state.movies);
    const tv = useSelector(state => state.tv);
    const people = useSelector(state => state.people);

    const getTrending = (data, contentType) => {
        return data.filter(item => item.poster_path || item.profile_path).map((item, i) => {
            if(i < 6) {
                return (
                    <Link to={`/details/${contentType}/${item.id}`} key={item.id}>
                        <li key={item.id} className="trending__item"><img src={`https://image.tmdb.org/t/p/w500${contentType === 'person' ? item.profile_path : item.poster_path}`} alt="contentImage" /></li>
                    </Link>
                )
            }
            return null
        })
    }

    return (
        <>
            <Header/>
            <Promo/>
            <TrendingContent title={"Trending TV Shows"} content={getTrending(tv, 'tv')}/>
            <TrendingContent title={"Trending Movies"} content={getTrending(movies, 'movie')}/>
            <Genres/>
            <TrendingContent title={"Popular Actors & Directors"} content={getTrending(people, 'person')}/>
            <Footer/>
        </>
    )
}

export default MainPage