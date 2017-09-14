function Song ({songid, songmid, songname, albumname, albummid, albumid, singer}) {
  this.songid = songid;
  this.songmid = songmid;
  this.songname = songname;
  this.playurl = Song.getPlayUrl(songid);
  this.albumname = albumname;
  this.albumid = albumid;
  this.albummid = albummid;
  this.albumimgurl = Song.getAlbumImgUrl(albummid);
  this.singer = singer;
}

Song.getPlayUrl = (songid) => {
  return `http://ws.stream.qqmusic.qq.com/${songid}.m4a?fromtag=46`;
};

Song.getAlbumImgUrl = (albummid) => {
  return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg`;
};

export default function SongFactory (obj) {
  return new Song(obj);
}
