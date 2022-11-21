import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faStop,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { setActiveSong } from '../util';

const PlayerControls = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
}) => {
  const playSongHandler = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const dragSongTrackingBar = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === 'skip-forward') {
      const nextSongIndex =
        currentIndex + 1 === songs.length ? 0 : currentIndex + 1;
      await setCurrentSong(songs[nextSongIndex]);
      setAndPlayActiveSongHandler(nextSongIndex);
    } else if (direction === 'skip-back') {
      const previousSongIndex =
        currentIndex - 1 <= 0 ? songs.length - 1 : currentIndex - 1;
      await setCurrentSong(songs[previousSongIndex]);
      setAndPlayActiveSongHandler(previousSongIndex);
    }
  };

  const convertSongTiming = (time) => {
    return `${Math.floor(time / 60)}:${('0' + Math.floor(time % 60)).slice(
      -2
    )}`;
  };

  const setAndPlayActiveSongHandler = (nextPrev) => {
    console.log('helloo');
    const newActiveSong = setActiveSong(songs, currentSong);
    isPlaying ? audioRef.current.play() : '';

    setSongs(newActiveSong);
  };

  const trackBarAnimation = {
    transform: `translateX(${songInfo.animationTrackBarPercentage}%)`,
  };

  const colorTrackBar = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  return (
    <section className='player-controls'>
      <div className='track-timing-control'>
        <p>{convertSongTiming(songInfo.currentTime)}</p>
        <div style={colorTrackBar} className='song-track-bar'>
          <input
            type='range'
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={(e) => dragSongTrackingBar(e)}
          />
          <div style={trackBarAnimation} className='track-bar'></div>
        </div>

        <p>
          {songInfo.duration
            ? convertSongTiming(songInfo.duration - songInfo.currentTime)
            : '0:00'}
        </p>
      </div>
      <div className='player-control-btns'>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-back')}
          size='2x'
          className='skip-back'
          icon={faAngleLeft}
        />

        <FontAwesomeIcon
          size='2x'
          className='play'
          icon={isPlaying ? faStop : faPlay}
          onClick={() => playSongHandler()}
        />

        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-forward')}
          size='2x'
          className='skip-forward'
          icon={faAngleRight}
        />
      </div>
    </section>
  );
};

export default PlayerControls;
