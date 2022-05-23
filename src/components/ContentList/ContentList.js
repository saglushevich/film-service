import './ContentList.sass';
import '../../styles/styles.sass';
import {Link} from 'react-router-dom'
import Spinner from '../Spinner/Spinner';

function ContentList (props) {

    const {data, title, type, loading, getNewList} = props;

    const elements = data.filter(item => item.profile_path || item.poster_path).map(item => {
        return (
            <Link to={`/details/${type}/${item.id}`} key={item.id}>
                <li key={item.id} className="content__item">
                    <div className="search__item-img"><img src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`} alt={`${item.title || item.name}poster`} /></div>
                    <div className="search__item-title">{item.name || item.title}</div>  
                </li>
            </Link>
        )
    })

    return (
        <section className="content">
            <div className="container">
                <h2 className="content__title">{title}</h2>
                {loading ? <Spinner/> : null}
                <ul className="content__grid">
                    {!loading ? elements : null}
                </ul>
                <div onClick={getNewList} style={getNewList ? {'display': 'flex'} : {'display': 'none'}} className="content__btn">See more</div>
            </div>
        </section>
    )
}

export default ContentList