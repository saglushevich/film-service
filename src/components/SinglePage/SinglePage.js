import './SinglePage.sass'
import '../../styles/styles.sass';
import FilmService from '../../services/FilmService';

function SinglePage (props) {
    return (
        <section className="single">
            <div className="container">
                <div className="single__block">
                    <div className="single__info">
                        <div className="single__info-text">Title</div>
                        <div className="single__info-details">
                            <div className="single__info-text">adult</div>
                            <div className="single__info-text">Popularity</div>
                            <div className="single__info-text">Status</div>
                            <div className="single__info-text">Language</div>
                            <div className="single__info-text">Vote</div>
                            <div className="single__info-text">Genres</div>
                            <div className="single__info-text">Release date</div>
                        </div>
                        <div className="single__info-overview"></div>
                    </div>
                    <div className="single__img"><img src="" alt="" /></div>
                </div>
            </div>
        </section>
    )
}

export default SinglePage;