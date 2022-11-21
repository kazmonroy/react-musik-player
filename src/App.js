import React, { useState, useRef } from 'react';
import './styles/styles.scss';
import Nav from './components/Nav';
import PlayerControls from './components/PlayerControls';
import Song from './components/CurrentSong';
import Library from './components/Library';
import data from './data';

const App = () => {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationTrackBarPercentage: 0,
  });

  const setSongTimingHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    const currentTimePercentage = Math.round(currentTime);
    const durationPercentage = Math.round(duration);
    const animationTrackBarPercentage = Math.floor(
      (currentTimePercentage / durationPercentage) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationTrackBarPercentage,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    await setCurrentSong(
      songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1]
    );
  };

  const hideLibrary = (e) => {
    const appElement = e.target.parentElement;

    if (appElement.classList.value === 'App') {
      setIsLibraryOpen(false);
    }
  };

  return (
    <div onClick={(e) => hideLibrary(e)} className='App'>
      <Nav isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      <Song currentSong={currentSong} />
      <PlayerControls
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />

      <Library
        isLibraryOpen={isLibraryOpen}
        setIsLibraryOpen={setIsLibraryOpen}
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      <audio
        onTimeUpdate={(e) => setSongTimingHandler(e)}
        onLoadedMetadata={(e) => setSongTimingHandler(e)}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default App;
