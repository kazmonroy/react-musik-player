import React from 'react';
import Song from './Song';

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  isLibraryOpen,
}) => {
  const librarySongs = songs.map((song) => {
    return (
      <Song
        key={song.id}
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        song={song}
        currentSong={song}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    );
  });
  return (
    <section
      className={`library-songs ${isLibraryOpen ? 'toggle-library' : ''} `}
    >
      <h2>Library</h2>
      {librarySongs}
    </section>
  );
};

export default Library;
