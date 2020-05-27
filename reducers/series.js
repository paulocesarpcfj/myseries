import { SAVE_SHOW, REMOVE_SHOW, TOGGLE_WATCH_STATE } from '../actions/series';

const initialState = {
  counter: 0,
  list: {},
};

const series = (state = initialState, action) => {
  switch (action.type) {
    case `${SAVE_SHOW}_FULFILLED`: {
      if (Object.keys(state.list).some((item) => item.id === action.meta.showId)) {
        return state;
      }

      return {
        ...state,
        list: {
          ...state.list,
          [action.meta.showId]: {
            id: action.meta.showId,
            name: action.meta.showName,
            episodes: action.payload.episodes,
          },
        },
      };
    }

    case REMOVE_SHOW: {
      const newObjShows = {};
      const filteredShows = Object.values(state.list).filter((item) => (
        item.id !== action.payload
      ));

      filteredShows.map((show) => newObjShows[show.id] = show);

      return { ...state, list: newObjShows };
    }

    case TOGGLE_WATCH_STATE: {
      const treatedArray = state.list[action.payload.showId].episodes.map((season) => (
        (season.episodes || season).map((episode) => {
          if (episode.title === action.payload.episodeName) {
            if (episode.watch) {
              return { ...episode, watch: false };
            }

            return { ...episode, watch: true };
          }

          return episode;
        })
      ));

      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.showId]: {
            ...state.list[action.payload.showId],
            episodes: treatedArray,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default series;
