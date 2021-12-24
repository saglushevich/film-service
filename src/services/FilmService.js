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

    getGenreContent = async (genre, page = 1) => {
        const res = await this.getResource(`https://api.themoviedb.org/3/discover/movie?${this._apiKey}&page=${page}&with_genres=${genre}`);
        return res.results.map(this._transformGenreContent)
    }

    getRequestToken = async () => {
        return await this.getResource(`https://api.themoviedb.org/3/authentication/token/new?${this._apiKey}`)
    }

    getSessionId = async (token) => {
        return await this.getResource(`https://api.themoviedb.org/3/authentication/session/new?${this._apiKey}&request_token=${token}`);
    }

    postDataToList = async (listId, sessionId, data) => {
        let request = await fetch(`https://api.themoviedb.org/3/list/${listId}/add_item?${this._apiKey}&session_id=${sessionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        });

        let result = await request.json();
        return result;
    }

    createList = async (sessionId, data) => {
        let request = await fetch(`https://api.themoviedb.org/3/list?${this._apiKey}&session_id=${sessionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(data)
        });

        let result = await request.json();
        return result;
    }

    getCreatedList = async (id) => {
        let res = await this.getResource(`https://api.themoviedb.org/3/account/{account_id}/lists?${this._apiKey}&session_id=${id}`);
        return res.results.map(item => item);
    }

    getListDetails = async (id) => {
        return await this.getResource(`https://api.themoviedb.org/3/list/${id}?${this._apiKey}`);
    }

    _transformGenreContent = (content) => {
        return {
            id: content.id,
            title: content.title,
            genre_ids: content.genre_ids,
            image: `https://image.tmdb.org/t/p/w500${content.poster_path}`
        }
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