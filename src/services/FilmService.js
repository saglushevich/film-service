import {apiKey} from './settings'

export const getResource = async (url) => {
    let res = await fetch(url);
    
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

export const getAllContent = async (type, page = 1) => {
    return await getResource(`https://api.themoviedb.org/3/${type}/popular?${apiKey}&page=${page}`)
}

export const getContentById = async (type, id) => {
    return await getResource(`https://api.themoviedb.org/3/${type}/${id}?${apiKey}`)
} 

export const getContentBySearch = async (query) => {
    return await getResource(`https://api.themoviedb.org/3/search/multi?${apiKey}&query=${query}`)
}

export const getContentGenres = async (genre, page = 1) => {
    return await getResource(`https://api.themoviedb.org/3/discover/movie?${apiKey}&page=${page}&with_genres=${genre}`)
}