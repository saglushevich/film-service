class FilmService {
    _apiKey = 'api_key=4aaf41b3f13597064b5ab63a054684c1';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getPopularContent = async (type, page = 1) => {
        const res = await this.getResource(`https://api.themoviedb.org/3/${type}/popular?${this._apiKey}&page=${page}`);
        return res.results.map(this._transformPopularContent);
    }

    getPopularActors = async (page = 1) => {
        const res = await this.getResource(`https://api.themoviedb.org/3/person/popular?${this._apiKey}&page=${page}`);
        return res.results.map(this._transformPopularActors);
    }

    getContent = async (id, type) => {
        const res = await this.getResource(`https://api.themoviedb.org/3/${type}/${id}?${this._apiKey}`);
        return this._transformPopularContent(res);
    }

    getPerson = async (id) => {
        return await this.getResource(`https://api.themoviedb.org/3/person/${id}?${this._apiKey}`);
    }

    getSearch = async (query) => {
        const res = await this.getResource(`https://api.themoviedb.org/3/search/multi?${this._apiKey}&query=${query}`)
        return res.results.map(item => item);
    }

    _transformPopularContent = (film) => {
        return {
            title: film.title ? film.title : null,
            name: film.name,
            date: film.release_date ? film.release_date : film.first_air_date,
            image: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
            id: film.id,
            vote: film.vote_average,
            language: film.original_language,
            overview: film.overview,
            popularity: film.popularity,
            adult: film.adult,
            country: film.production_countries ? film.production_countries[0].name : film.origin_country,
            genre: film.genres ? film.genres[0].name : null,
            status: film.status
        }
    }

    _transformPopularActors = (actor) => {
        return {
            id: actor.id,
            image: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
            name: actor.name,
            popularity: actor.popularity,
        }
    }
}

export default FilmService