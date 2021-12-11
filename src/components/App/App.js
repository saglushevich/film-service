import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import TrendingTV from "../Trending/TrendingTV";
import TrendingMovie from "../Trending/TrendingMovie";

function App() {
    return (
        <div className="app">
            <Header/>
            <Promo/>
            <TrendingTV/>
            <TrendingMovie/>
        </div>
    );
}

export default App;
