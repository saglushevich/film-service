import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ContentList from "../ContentList/ContentList";
import {useDispatch} from 'react-redux'
import {useState, useEffect} from 'react';
import {getAllContent} from '../../services/FilmService'

function ContentPage ({content, type, reduxAction, title}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(2);

    const updateList = async () => {
        setLoading(true);
        setPage(page => page + 1);
        await getAllContent(type, page).then(data => data.results).then(data => dispatch(reduxAction(data)))
        setLoading(false);
    }

    useEffect(() => {
        window.scrollTo(0,0);
    }, [type])

    return (
        <>
            <Header/>
            <ContentList type={type} getNewList={updateList} data={content} loading={loading} title={title}/>
            <Footer/>
        </>
    )
}

export default ContentPage