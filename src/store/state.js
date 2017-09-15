const state = {
  singer: null,
  songPlay: false, // 播放页面是否显示
  shrinkSongPlay: false, // 默认是大的播放器, true为缩小的播放页面, false为放大的播放页面
  currentIndex: null, // 当前播放歌曲的下标
  songList: [], // 当前歌曲列表
  playSongList: [] // 当前播放歌曲的列表
};

export default state;
