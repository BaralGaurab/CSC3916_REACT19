import types from '../constants/actionTypes';
const API = process.env.REACT_APP_API_URL;

export const searchMovies = (query) => dispatch => {
  const raw  = localStorage.getItem('token') || '';
  const auth = raw.startsWith('jwt ') ? raw : `jwt ${raw}`;

  return fetch(`${API}/movies/search`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', Authorization: auth },
    body: JSON.stringify({ query })
  })
    .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
    .then(results => dispatch({ type: types.SEARCH_RESULTS, results }))
    .catch(e => console.error(e));
};