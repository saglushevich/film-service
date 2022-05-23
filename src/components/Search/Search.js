import '../../styles/styles.sass';
import './Search.sass';
import search from '../../resources/icons/search.svg';
import {useState} from 'react';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import {getContentBySearch} from '../../services/FilmService'

function Search () {
    const [searchResult, setSearchResult] = useState([]);
    const [request, setRequest] = useState('');
    const [loading, setLoading] = useState(false);

    const getSearchResult = async (query) => {
        setLoading(true);
        await getContentBySearch(query).then(data => data.results).then(data => setSearchResult(data))
        setLoading(false)
    }

    const onSubmit = async (e) => {
        if(!request) {
            return;
        }
        e.preventDefault();
        setSearchResult([]);
        await getSearchResult(request);
    }

    const getContent = (data, type) => {
        return data.map(item => {
            return (
                <Link to={`/details/${type}/${item.id}`} key={item.id}>
                    <li key={item.id} className="search__item">
                        <div className="search__item-img"><img src={`https://image.tmdb.org/t/p/w500${item.profile_path || item.poster_path}`} alt={item.name || item.title} /></div>
                        <div className="search__item-title">{item.name || item.title}</div>    
                    </li>
                </Link>
            )
        })
    }

    const acting = getContent(searchResult.filter(item => item.media_type === 'person' && item.profile_path), 'person');
    const movie = getContent(searchResult.filter(item => item.media_type === 'movie' && item.poster_path), 'movie');
    const tv = getContent(searchResult.filter(item => item.media_type === 'tv' && item.poster_path), 'tv');

    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="search">
            <div className="container">
                <form onSubmit={onSubmit} className='search__form'>
                    <input value={request} onChange={(e) => setRequest(e.target.value)} name="film" placeholder="enter your request: " type="text" className="search__input" />
                    <button className="search__btn"><img style={{'width': '40px'}} src={search} alt="search" /></button>
                </form>
                <div className="search__block">
                    {spinner}
                    {searchResult.length === 0 ? <h2 className='search__title search__title-main'>Enter your request in the field above</h2> : null}
                    {acting.length === 0 ? null : <ViewContent content={acting} title="People: "/>}
                    {movie.length === 0 ? null : <ViewContent content={movie} title="Movie: "/>}
                    {tv.length === 0 ? null : <ViewContent content={tv} title="TV: "/>}
                </div>
            </div>
        </div>

    )
}

function ViewContent ({content, title}) {
    return (
        <>
            <div className="search__title">{title}</div>
            <ul className="search__grid">
                {content}
            </ul>
        </>
    )
}

export default Search
