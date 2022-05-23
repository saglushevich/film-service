const initialState = {
    loading: true,
    movies: [],
    tv: [],
    people: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_LOADING":
            return {...state, loading: action.payload}
        case "SET_MOVIES":
            return {...state, movies: [...state.movies, ...action.payload]};
        case "SET_TV":
            return {...state, tv: [...state.tv, ...action.payload]};
        case "SET_PEOPLE":
            return {...state, people: [...state.people, ...action.payload]};
        default: 
            return state;
    }
}

export default reducer;