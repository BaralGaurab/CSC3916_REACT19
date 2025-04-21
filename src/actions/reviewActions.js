import { fetchMovie } from './movieActions';
const API = process.env.REACT_APP_API_URL;

export const addReview = (movieId, data) => dispatch => {
  const raw = localStorage.getItem('token') || '';
  const auth = raw.startsWith('jwt ') ? raw : `jwt ${raw}`;
  return fetch(`${API}/reviews`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json', Authorization:auth },
    body: JSON.stringify({ movieId, ...data })
  }).then(r=>{
    if(!r.ok) throw new Error(r.statusText);
    return r.json();
  }).then(() => {
    dispatch(fetchMovie(movieId));   
  });
};
