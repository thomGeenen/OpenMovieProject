'use strict';

const initialState = { favoritesMovies: []}

function toggleFavorites(state = initialState, action) {
    let next;

    switch (action.type) {
        case "TOGGLE_FAVORITE":
            const favoritesMoviesIndex = state.favoritesMovies.findIndex((movie) => movie.id === action.value.id);

            if(favoritesMoviesIndex !== -1){
                next = {
                    ...state,
                    favoritesMovies: state.favoritesMovies.filter((movie, index) => index !== favoritesMoviesIndex)
                }
            } else {
                next = {
                    ...state,
                    favoritesMovies: [...state.favoritesMovies, action.value]
                }
            }

            return next || state;
        default:
            return state;
            break;
    }
}

export default toggleFavorites;