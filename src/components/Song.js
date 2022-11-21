import React, { useEffect } from 'react';
import { setActiveSong } from '../util';

const Song = ({
  song,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  audioRef,
  setIsPlaying,
}) => {
  const selectSongHandler = async () => {
    setIsPlaying(true);
    const newActiveSong = setActiveSong(songs, currentSong);
    setSongs(newActiveSong);
    await setCurrentSong(song);
    audioRef.current.play();
  };

  const selected = {
    background: currentSong.active
      ? `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
      : '',
  };

  return (
    <div style={selected} className={`song`} onClick={selectSongHandler}>
      <img src={currentSong.cover} />
      <div className='song-info'>
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default Song;
