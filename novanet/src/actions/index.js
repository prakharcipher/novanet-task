import { ADD_WATCHED, REMOVE_MOVIE, ADD_LIKED } from '../constants';

export const addWatched = (poster, liked) => {
  const action = {
    type: ADD_WATCHED,
    poster: poster,
    liked: liked
  };
  return action;
};

export const addLiked = (id, liked) => {
  const action = {
    type: ADD_LIKED,
    id,
    liked
  };
  return action;
};

export const removeMovie = id => {
  const action = {
    type: REMOVE_MOVIE,
    id
  };
  return action;
};
