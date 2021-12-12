import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FilmService from '../../services/FilmService';
import ContentList from "../ContentList/ContentList";
import {useState, useEffect} from 'react';

function TVPage () {
    const [TVList, setTVList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(2);
    const filmService = new FilmService();

    const onTVListLoaded = (item) => {
        setTVList(TVList => [...TVList, ...item]);
        setLoading(loading => false);
    }

    const updateTVList = (type, page) => {
        filmService.getPopularContent(type, page).then(onTVListLoaded);
    }

    const getNewTVList = () => {
        setPage(page => page + 1);
        updateTVList('tv', page);
    }

    useEffect(() => {
        updateTVList('tv');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <Header/>
            <ContentList getNewList={getNewTVList} data={TVList} loading={loading} title={'Our TV page: '}/>
            <Footer/>
        </>
    )
}

export default TVPage;