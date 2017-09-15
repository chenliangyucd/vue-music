import * as types from './mutation-types';
/* actions 适用场景为异步提交，和一次需要改变多个mutations */
const actions = {
  // 播放歌曲
  playSong ({commit, state}, currentIndex) {
    commit(types.SET_PLAY_SONG_LIST, {playSongList: state.songList});
    commit(types.SET_CURRENT_INDEX, {currentIndex});
    commit(types.SET_SHRINK_SONG_PLAY, {shrinkSongPlay: true});
    commit(types.SET_SONG_PLAY, {songPlay: true});
  },
  // 更换歌曲
  changeSong ({commit, state}, num) {
    if (state.currentIndex != null) {
      let index = state.currentIndex + num;
      if (index >= state.playSongList.length) {
        index = 0;
      }

      if (index < 0) {
        index = state.playSongList.length - 1;
      }

      commit(types.SET_CURRENT_INDEX, {currentIndex: index});
    }
  }

};

export default actions;

