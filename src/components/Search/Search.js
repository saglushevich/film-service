import '../../styles/styles.sass';
import './Search.sass';
import search from '../../resources/icons/search.svg';
import FilmService from '../../services/FilmService';
import {useState} from 'react';
import Spinner from '../Spinner/Spinner';

function Search () {
    const [searchResult, setSearchResult] = useState([]);
    const [term, setTerm] = useState(null);
    const [loading, setLoading] = useState(false);
    const filmService = new FilmService();

    const onSearchResultLoaded = (result) => {
        setSearchResult(searchResult => [...searchResult, ...result]);
        setLoading(loading => false);
    }

    const onValueChange = (e) => {
        setTerm(e.target.value);
    }

    const updateResultList = (query) => {
        filmService.getSearch(query).then(onSearchResultLoaded).catch(console.log('Something went wrong!'));
    }

    const onSubmit = (e) => {
        if(!term) {
            return;
        }
        e.preventDefault();
        setLoading(loading => true);
        setSearchResult([]);
        updateResultList(term);
    }

    const acting = searchResult.filter(item => item.media_type === 'person' && item.profile_path);
    const movie = searchResult.filter(item => item.media_type === 'movie' && item.poster_path);
    const tv = searchResult.filter(item => item.media_type === 'tv' & item.poster_path);

    const actingContent = acting.map(actor => {
        return (
            <li key={actor.id} className="search__item">
                <div className="search__item-img"><img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} /></div>
                <div className="search__item-title">{actor.name}</div>    
            </li>
        )
    })

    const movieContent = movie.map(item => {
        return (
            <li key={item.id} className="search__item">
                <div className="search__item-img"><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} /></div>
                <div className="search__item-title">{item.title}</div>    
            </li>
        )
    })

    const tvContent = tv.map(item => {
        return (
            <li key={item.id} className="search__item">
                <div className="search__item-img"><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.name} /></div>
                <div className="search__item-title">{item.name}</div>    
            </li>
        )
    })

    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="search">
            <div className="container">
                <form onSubmit={onSubmit} className='search__form'>
                    <input value={term} onChange={onValueChange} name="film" placeholder="enter your request: " type="text" className="search__input" />
                    <button className="search__btn"><img style={{'width': '40px'}} src={search} alt="search" /></button>
                </form>

                <div className="search__block">
                    {spinner}
                    {searchResult.length === 0 ? <h2 className='search__title search__title-main'>Enter your request in the field above</h2> : null}
                    {acting.length === 0 ? null : <ViewContent content={actingContent} title="People: "/>}
                    {movie.length === 0 ? null : <ViewContent content={movieContent} title="Movie: "/>}
                    {tv.length === 0 ? null : <ViewContent content={tvContent} title="TV: "/>}
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
