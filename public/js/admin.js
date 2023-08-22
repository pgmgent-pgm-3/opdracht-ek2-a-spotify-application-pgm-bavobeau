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

function deleteArtist(id) {
  fetch("/api/artist", {
    method: "delete",
  })
  .then((res) => {
    if(res.ok) {
      window.location.href = "/artists";
    }
  })
  .catch((e) => console.log(e));
}