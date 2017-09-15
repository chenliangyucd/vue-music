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
    state.shrinkSongPlay = shrinkSongPlay;
  },
  [types.SET_SONG_PLAY] (state, { songPlay }) {
    state.songPlay = songPlay;
  },
  [types.SET_PLAY_SONG_LIST] (state, {playSongList}) {
    state.playSongList = playSongList;
  }
};

export default mutations;
