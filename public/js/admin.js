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
  const data = {
    id: id
  }
  fetch("/api/artist", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if(res.ok) {
      window.location.href = "/artists";
    }
  })
  .catch((e) => console.log(e));
}

function deleteSong(id) {
  const data = {
    id: id
  }
  fetch("/api/song", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if(res.ok) {
      window.location.reload();
    }
  })
  .catch((e) => console.log(e));
}

function deleteAlbum(id) {
  const data = {
    id: id
  }
  fetch("/api/album", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if(res.ok) {
      window.location.reload();
    }
  })
  .catch((e) => console.log(e));
}

function deletePlaylist(id) {
  const data = {
    id: id
  }
  fetch("/api/playlist", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if(res.ok) {
      window.location.href = "/playlists";
    }
  })
  .catch((e) => console.log(e));
}

function updatePlaylist(id) {
  const newName = document.getElementById("PlaylistNameInput").value;
  const data = {
    id: id,
    name: newName
  };
  console.log(newName)
  fetch("/api/playlist", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (res.ok) {
      window.location.reload(); // Reload the page after successful update
    } else {
      // Handle error cases here
    }
  })
  .catch((e) => {
    console.log(e);
  });
}

function updateArtist(id) {
  const newName = document.getElementById("ArtistNameInput").value;
  const data = {
    id: id,
    name: newName
  };
  console.log(newName)
  fetch("/api/artist", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (res.ok) {
      window.location.reload(); // Reload the page after successful update
    } else {
      // Handle error cases here
    }
  })
  .catch((e) => {
    console.log(e);
  });
}