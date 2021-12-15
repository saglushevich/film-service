import '../../styles/styles.sass'
import './Genres.sass'
import { Link } from 'react-router-dom'
import action from '../../resources/img/genres/action.svg'
import comedy from '../../resources/img/genres/comedy.svg'
import documentary from '../../resources/img/genres/documentary.svg'
import drama from '../../resources/img/genres/drama.svg'
import historical from '../../resources/img/genres/historical.svg'
import horror from '../../resources/img/genres/horror.svg'
import romance from '../../resources/img/genres/romance.svg'
import sci from '../../resources/img/genres/sci-fi.svg'

function Genres () {

    const data = [
        {genre: 10749, style: 'linear-gradient(109.31deg, #FD093F 2.4%, #F383F1 100%)', name: 'romance', image: romance},
        {genre: 18, style: 'linear-gradient(114.5deg, #0FFFDA 2.22%, #3CDB77 68.84%)', name: 'drama', image: drama},
        {genre: 36, style: 'linear-gradient(109.31deg, #B936FF 2.4%, #57DEDA 100%)', name: 'historical', image: historical},
        {genre: 28, style: 'linear-gradient(109.31deg, #FD093F 2.4%, #FB1378 2.41%, #FCCB1A 100%)', name: 'action', image: action},
        {genre: 878, style: 'linear-gradient(109.31deg, #FF6472 2.4%, #FDA75D 100%)', name: 'sci-fi', image: sci},
        {genre: 27, style: 'linear-gradient(110.16deg, #13547A 2.37%, #80D0C7 96.77%)', name: 'horror', image: horror},
        {genre: 35, style: 'linear-gradient(109.93deg, #FFF77B 2.37%, #FFBF42 50%)', name: 'comedy', image: comedy},
        {genre: 99, style: 'linear-gradient(109.31deg, #1FA2FF 2.4%, #1FA2FF 2.41%, #1F535C 97.46%)', name: 'documentary', image: documentary},
    ];

    const elements = data.map(item => {
        return (
            <Link to={`/genres/${item.genre}`} key={item.genre}>
                <div style={{'background': `${item.style}`}} className="genres__item"><img src={item.image} alt={item.name} /></div>
            </Link>
        )
    })

    return (
        <section className="genres">
            <div className="container">
                <h2 className="genres__subtitle">
                    <div className="genres__divider"></div>
                    Popular genres
                </h2>
                <div className="genres__block">
                    {elements}
                </div>
            </div>
        </section>
    )
}

export default Genres