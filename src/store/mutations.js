import * as types from './mutation-types';

const mutations = {
  [types.SET_SINGER] (state, { song }) {
    state.song = song;
  }
};

export default mutations;
