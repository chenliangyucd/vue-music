export const getSinger = (state) => { return state.singer; };
export const getSongList = (state) => { return state.songList; };
export const getShrinkSongPlay = (state) => { return state.shrinkSongPlay; };
export const getCurrentIndex = (state) => { return state.currentIndex; };
export const getSongPlay = (state) => { return state.songPlay; };
export const getSong = (state) => {
  if (state.currentIndex == null) {
    return {};
  }
  return state.playSongList[state.currentIndex];
};
