class FilmService {
    _apiKey = 'api_key=4aaf41b3f13597064b5ab63a054684c1';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getPopularContent = async (type) => {
        const res = await this.getResource(`https://api.themoviedb.org/3/${type}/popular?${this._apiKey}`);
        return res.results.map(this._transformPopularContent)
    }

    _transformPopularContent = (film) => {
        return {
            title: film.title ? film.title : null,
            name: film.name ? film.title : null,
            date: film.release_date ? film.release_date : null,
            first_air_date: film.first_air_date ? film.first_air_date : null,
            image: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
            id: film.id,
            vote: film.vote_average,
            language: film.original_language,
            overview: film.overview,
            popularity: film.popularity,
            adult: film.adult,
            genres: film.genre_ids
        }
    }
}

export default FilmService