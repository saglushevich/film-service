/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Spinner from '../Spinner/Spinner';
import FilmService from '../../services/FilmService';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../styles/styles.sass'
import './SingleListPage.sass'

function SingleListPage () {
    const {id} = useParams();
    const [listContent, setListContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();

    const onListContentLoaded = (film) => {
        setListContent(listContent => [...listContent, ...film]);
        setLoading(loading => false);
    }

    const onUpdateList = () => {
        filmService.getDataFromList(id).then(data => data.items).then(onListContentLoaded)
    }

    useEffect(() => {
        onUpdateList();
    }, [id])

    const elements = listContent.map(item => {
        return (
            <Link to={`/details/${item.media_type}/${item.id}`} key={item.id}>
                <li key={item.id} className="singleListPage__item">
                    <div className="singleListPage__item-img"><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.name } /></div>
                    <div className="singleListPage__item-title">{item.name}</div>  
                </li>
            </Link>
        )
    })

    return (
        <>
            <Header/>
            <section className="singleListPage">
                <div className="container">
                    <h2 className="singleListPage__title">Contents of this list:</h2>
                    <ul className="singleListPage__grid">
                        {loading ? <Spinner/> : elements}
                    </ul>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default SingleListPage