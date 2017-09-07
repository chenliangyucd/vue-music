function Song ({songid, songmid, songname, albumname, playurl, singer}) {
  this.songid = songid;
  this.songmid = songmid;
  this.songname = songname;
  this.playurl = playurl;
  this.albumname = albumname;
  this.singer = singer;
}

export default function SongFactory (obj) {
  return new Song(obj);
}
