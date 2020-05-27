import * as axios from 'axios';
import { Toast } from 'native-base';
import { API_URL, defaultHeaders } from '../constants';

export const SEARCH_SERIES = 'series/SEARCH_SERIES';
export const SAVE_SHOW = 'series/SAVE_SHOW';
export const REMOVE_SHOW = 'series/REMOVE_SHOW';
export const TOGGLE_WATCH_STATE = 'series/TOGGLE_WATCH_STATE';

export const searchSeries = (key) => (dispatch) => {
  const request = axios.get(`${API_URL}search/show?query=${key}`, defaultHeaders)
    .then((res = {}) => res.data || {});

  return dispatch({
    type: SEARCH_SERIES,
    payload: request,
  });
};

export const saveShow = (showId, showName) => (dispatch) => {
  const request = axios.get(`${API_URL}shows/${showId}/seasons?extended=episodes`, defaultHeaders)
    .then((res = {}) => {
      Toast.show({
        text: 'The TV show was saved.',
        duration: 5000,
        type: 'success',
      });

      return { episodes: res.data || [], showName, showId };
    });

  return dispatch({
    type: SAVE_SHOW,
    payload: request,
    meta: { showId, showName },
  });
};

export const removeShow = (id) => (dispatch) => {
  Toast.show({
    text: 'The TV show was saved.',
    duration: 5000,
    type: 'success',
  });

  return dispatch({
    type: REMOVE_SHOW,
    payload: id,
  });
};

export const markAsWatched = (showId, episodeName) => ({
  type: TOGGLE_WATCH_STATE,
  payload: { showId, episodeName },
});
