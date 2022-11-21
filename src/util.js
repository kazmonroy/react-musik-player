export const setActiveSong = (songs, currentSong) => {
  return songs.map((item) =>
    item.id === currentSong.id
      ? { ...item, active: true }
      : { ...item, active: false }
  );
};
