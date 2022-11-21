import React from 'react';

const CurrentSong = ({ currentSong }) => {
  return (
    <section className='song-container' key={currentSong.id}>
      <img src={currentSong.cover} />
      <h2>{currentSong.name}</h2>
      <h4>{currentSong.artist}</h4>
    </section>
  );
};

export default CurrentSong;
