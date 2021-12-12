import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import SinglePage from "../SinglePage/SinglePage"
import FilmService from '../../services/FilmService';
import { useEffect, useState } from 'react';

function ContentPage (props) {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const filmService = new FilmService();
    const {type} = props

    const updateInfo = () => {
        const {id} = props;
        if (!id) {
            return;
        }

        type === 'movie' ? filmService.getFilm(id).then(onInfoLoaded) : filmService.getTV(id).then(onInfoLoaded);
    }

    const onInfoLoaded = (info) => {
        setInfo(info);
        setLoading(loading => false)
    }

    useEffect(() => {
        updateInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);

    return (
        <>
            <Header/>
            <SinglePage info = {info} loading = {loading}/>
            <Footer/>
        </>
    )
}

export default ContentPage