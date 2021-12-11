import '../../styles/styles.sass'
import './Search.sass'
import search from '../../resources/icons/search.svg'

function Search () {
    return (
        <div className="search">
            <div className="container">
                <form className='search__form'>
                    <input name="film" placeholder="enter your request: " type="text" className="search__input" />
                    <button className="search__btn"><img style={{'width': '40px'}} src={search} alt="search" /></button>
                </form>

                <div className="search__block">
                    <div className="search__title"></div>
                    <ul className="search__grid">
                        
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Search
