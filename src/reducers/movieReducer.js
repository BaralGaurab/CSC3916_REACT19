import constants from '../constants/actionTypes'

let initialState = {
      movies: [],
      selectedMovie: null
}

const movieReducer = (state = initialState, action) => {
      let updated = Object.assign({}, state);

      switch(action.type) {
            case constants.FETCH_MOVIES:
                  updated['movies'] = action.movies;
                  updated['selectedMovie'] = action.movies[0];
                  return updated;
            case constants.SET_MOVIE:
                  updated['selectedMovie'] = action.selectedMovie;
                  return updated;
            case constants.FETCH_MOVIE:
                  updated['selectedMovie'] = action.selectedMovie;
                  return updated;
            case constants.SEARCH_RESULTS:
                  return { ...state, movies: action.results, selectedMovie: null };
                      
            default:
                  return state;
      }
}

export default movieReducer;