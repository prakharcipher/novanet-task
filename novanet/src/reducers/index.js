import { ADD_WATCHED, REMOVE_MOVIE, ADD_LIKED } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const movie = action => {
  let { poster, liked } = action;
  return {
    id: Math.random(),
    poster,
    liked
  };
};

const removeById = (state = [], id) => {
  const movies = state.filter(movie => movie.id !== id);
  return movies;
};

const likeById = (state = [], id, liked) => {
  const movies = state.map(movie => {
    return movie.id === id ? Object.assign({}, movie, { liked: liked }) : movie;
  });
  return movies;
};

const movies = (state = [], action) => {
  let movies = null;
  state = read_cookie('movies');
  switch (action.type) {
    case ADD_WATCHED:
      movies = [...state, movie(action)];
      bake_cookie('movies', movies);
      return movies;
    case REMOVE_MOVIE:
      movies = removeById(state, action.id);
      bake_cookie('movies', movies);
      return movies;
    case ADD_LIKED:
      movies = likeById(state, action.id, action.liked);
      bake_cookie('movies', movies);
      return movies;
    default:
      return state;
  }
};

export default movies;
