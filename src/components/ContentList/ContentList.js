import Spinner from "../Spinner/Spinner";
import './ContentList.sass';
import '../../styles/styles.sass';
import {Link} from 'react-router-dom'

function ContentList (props) {

    const {data, loading, title, getNewList, type} = props;

    const elements = data.map(item => {
        if(type === 'movie') {
            return (
                <Link to={`/details/${item.id}`} key={item.id}>
                    <li key={item.id} className="content__item">
                        <div className="search__item-img"><img src={item.image} alt={item.title || item.name} /></div>
                        <div className="search__item-title">{item.name || item.title}</div>  
                    </li>
                </Link>
            )
        } else {
            return (
                <Link to={`/detailsTV/${item.id}`} key={item.id}>
                    <li key={item.id} className="content__item">
                        <div className="search__item-img"><img src={item.image} alt={item.title || item.name} /></div>
                        <div className="search__item-title">{item.name || item.title}</div>  
                    </li>
                </Link>
            )
        }
    });

    return (
        <section className="content">
            <div className="container">
                <h2 className="content__title">{title}</h2>
                {loading ? <Spinner/> : null}
                <ul className="content__grid">
                    {elements}
                </ul>
                <div onClick={getNewList} className="content__btn">See more</div>
            </div>
        </section>
    )
}

export default ContentList