import '../../styles/styles.sass'
import './Genres.sass'
import action from '../../resources/img/genres/action.svg'
import comedy from '../../resources/img/genres/comedy.svg'
import documentary from '../../resources/img/genres/documentary.svg'
import drama from '../../resources/img/genres/drama.svg'
import historical from '../../resources/img/genres/historical.svg'
import horror from '../../resources/img/genres/horror.svg'
import romance from '../../resources/img/genres/romance.svg'
import sci from '../../resources/img/genres/sci-fi.svg'

function Genres () {
    return (
        <section className="genres">
            <div className="container">
                <h2 className="genres__subtitle">
                    <div className="genres__divider"></div>
                    Popular genres
                </h2>
                <div className="genres__block">
                    <div style={{'background': 'linear-gradient(109.31deg, #FD093F 2.4%, #F383F1 100%)'}} className="genres__item"><img src={romance} alt="romance" /></div>
                    <div style={{'background': 'linear-gradient(114.5deg, #0FFFDA 2.22%, #3CDB77 68.84%)'}} className="genres__item"><img src={drama} alt="drama" /></div>
                    <div style={{'background': 'linear-gradient(109.31deg, #B936FF 2.4%, #57DEDA 100%)'}} className="genres__item"><img src={historical} alt="historical" /></div>
                    <div style={{'background': 'linear-gradient(109.31deg, #FD093F 2.4%, #FB1378 2.41%, #FCCB1A 100%)'}} className="genres__item"><img src={action} alt="action" /></div>
                    <div style={{'background': 'linear-gradient(109.31deg, #FF6472 2.4%, #FDA75D 100%)'}} className="genres__item"><img src={sci} alt="sci-fi" /></div>
                    <div style={{'background': 'linear-gradient(110.16deg, #13547A 2.37%, #80D0C7 96.77%)'}} className="genres__item"><img src={horror} alt="horror" /></div>
                    <div style={{'background': 'linear-gradient(109.93deg, #FFF77B 2.37%, #FFBF42 50%)'}} className="genres__item"><img src={comedy} alt="comedy" /></div>
                    <div style={{'background': 'linear-gradient(109.31deg, #1FA2FF 2.4%, #1FA2FF 2.41%, #1F535C 97.46%)'}} className="genres__item"><img src={documentary} alt="documentary" /></div>
                </div>
            </div>
        </section>
    )
}

export default Genres