function deleteSongFromPlaylist(songId, playlistId) {
  console.log("test")
  const data = {
    id: playlistId,
    songs: {
      id: songId
    }
  } 
  
  fetch("/api/playlist", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .catch((error) => console.log(error));
}