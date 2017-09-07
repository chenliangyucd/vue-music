import * as types from './mutation-types';

const mutations = {
  [types.SET_SINGER] (state, { singer }) {
    state.singer = singer;
  },
  [types.SET_SONG_LIST] (state, { songList }) {
    state.songList = songList;
  }
};

export default mutations;
