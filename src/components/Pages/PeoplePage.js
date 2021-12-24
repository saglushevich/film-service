import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FilmService from '../../services/FilmService';
import {useState, useEffect} from 'react';
import ContentList from '../ContentList/ContentList';

function PeoplePage () {
    const [peopleList, setPeopleList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(2);
    const filmService = new FilmService();

    const onPeopleListLoaded = (item) => {
        setPeopleList(peopleList => [...peopleList, ...item]);
        setLoading(loading => false);
    }

    const updatePeopleList = (page) => {
        filmService.getPopularActors(page).then(onPeopleListLoaded);
    }

    const getNewPeopleList = () => {
        setPage(page => page + 1);
        updatePeopleList(page);
    }

    useEffect(() => {
        updatePeopleList();
        window.scrollTo(0,0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header/>
            <ContentList type='person' getNewList={getNewPeopleList} data={peopleList} loading={loading} title={'Popular actors: '}/>
            <Footer/>
        </>
    )
}

export default PeoplePage;