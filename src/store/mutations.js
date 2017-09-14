import * as types from './mutation-types';

const mutations = {
  [types.SET_SINGER] (state, { singer }) {
    state.singer = singer;
  },
  [types.SET_SONG_LIST] (state, { songList }) {
    state.songList = songList;
  },
  [types.SET_CURRENT_INDEX] (state, { currentIndex }) {
    state.currentIndex = currentIndex;
  },
  [types.SET_SHRINK_SONG_PLAY] (state, { shrinkSongPlay }) {
    console.info('shrinkSongPlay', shrinkSongPlay);
    state.shrinkSongPlay = shrinkSongPlay;
  }
};

export default mutations;
