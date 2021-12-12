import './SinglePage.sass'
import '../../styles/styles.sass';
import Spinner from '../Spinner/Spinner';


function SinglePage (props) {

    const {info, loading} = props;

    const spinner = loading ? <Spinner/> : <ViewInfo info={info}/>;

    return (
        <section className="single">
            <div className="container">
                {spinner}
            </div>
        </section>
    )
}

function ViewInfo ({info}) {
    return (
        <>
            <h2 className="single__title">Look at the info below: </h2>
            <div className="single__block">
                <div className="single__img"><img src={info.image} alt={info.title || info.name} /></div>
                <div className="single__info">
                    <div className="single__info-text">Title: {info.title || info.name}</div>
                    <div className="single__info-details">
                        <div className="single__info-text">{info.adult ? '18+' : null}</div>
                        <div className="single__info-text">Popularity: {info.popularity}</div>
                        <div className="single__info-text">Status: {info.status}</div>
                        <div className="single__info-text">Language: {info.language}</div>
                        <div className="single__info-text">Vote: {info.vote}</div>
                        <div className="single__info-text">Release date: {info.date}</div>
                    </div>
                    <div className="single__info-overview">
                        {info.overview}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePage;