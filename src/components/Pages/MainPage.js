import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import TrendingTV from "../Trending/TrendingTV";
import TrendingMovie from "../Trending/TrendingMovie";
import TrendingActors from "../Trending/TrendingActors";
import Genres from "../Genres/Genres";
import Footer from '../Footer/Footer'

function MainPage () {
    return (
        <>
            <Header/>
            <Promo/>
            <TrendingTV/>
            <TrendingMovie/>
            <Genres/>
            <TrendingActors/>
            <Footer/>
        </>
    )
}

export default MainPage