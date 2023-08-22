/**
 * The playlist API controllers
 */

import DS from "../../lib/DataSource.js";

export const getPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const playlistRepo = DS.getRepository("Playlist");
    const playlist = await playlistRepo.findOneBy({
      id,
    });
    res.status(200).json(playlist);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get playlist.",
    });
  }
};

export const getPlaylists = async (req, res, next) => {
  try {
    const playlistRepo = DS.getRepository("Playlist");
    const playlists = await playlistRepo.find({
      relations: ["songs"]
    });
    res.status(200).json(playlists);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get playlists",
    });
  }
};

export const getPlaylistsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const playlistRepo = DS.getRepository("Playlist");
    const playlists = await playlistRepo.find({
      relations: ["user"],
      where: {
        user: {
          id: userId
        }
      }
    });
    if (playlists && userId != null) {
      res.status(200).json(playlists);
    } else {
      res.status(404).json({
        status: "playlists not found.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to get playlists.",
    });
  }
};

export const postPlaylist = async (req, res, next) => {
  try {
    const playlistRepo = DS.getRepository("Playlist");

    // look if playlist already exists in repo
    const playlist = await playlistRepo.findOne({
      where: {
        name: req.body.name,
        user: {id: req.user.id}
      },
    });
    console.log(playlist)
    // if playlists exists stop and return existing playlist
    if (playlist) {
      res.status(200).json({
        status: "playlist already exists in database.",
        playlist: playlist,
      });

      // if playlist doesn't exist add it to database
    } else {

      await playlistRepo.save({
        ...req.body,
        user: {id: req.user.id}
      });

      // Redirect back to the same page if success
      return res.redirect(req.get('referer'));
    }
  } catch (e) {
    console.error("Error creating playlist:", e);
    res.status(500).json({
      status: "Failed to create new playlist.",
    });
  }
};

export const postSongToPlaylist = async (req, res, next) => {
  try {
    const playlistRepo = DS.getRepository("Playlist");
    const songRepo = DS.getRepository("Song");

    const { id } = req.body;
    const { songId } = req.body;
    // look if playlist already exists in repo
    const playlist = await playlistRepo.findOne({
      relations: ["songs"],
      where: {
        id
      },
    });
    
    const song = await songRepo.findOneBy({
      id: songId
    })

    const updatedSongs = [].concat(playlist.songs, song);
    playlist.songs = updatedSongs;
    if (playlist && song) {
      
      await playlistRepo.save(playlist);
      res.status(200).json({
        status: "saved song to playlist."
      });
    } else {
      res.status(400).json({
        status: "song or playlist not found."
      });
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      status: "Failed to add song to playlist.",
    });
  }
};

export const updatePlaylist = async (req, res, next) => {
  try {
    const playlistRepo = DS.getRepository("Playlist");

    const { id } = req.body;

    // look for playlist in repo
    const playlist = await playlistRepo.findOne({
      relations: ["songs"],
      where: {
        id,
      }
    });

    console.log(req.body)
    // if playlist exists update it
    if (playlist && id !== undefined) {
      await playlistRepo.save(req.body);

      res.status(200).json({
        status: "playlist successfully updated.",
        playlist: req.body,
      });

      //if playlist doesn't exist stop
    } else {
      // return error code
      res.status(404).json({
        status: "playlist not found.",
      });
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      status: "Failed to update playlist.",
    });
  }
};

export const deletePlaylist = async (req, res, next) => {
  try {
    const playlistRepo = DS.getRepository("Playlist");

    const { id } = req.body;

    const playlist = await playlistRepo.findOneBy({ id });

    // if playlist exists
    if (playlist != null && id != undefined) {
      // remove playlist
      await playlistRepo.delete(playlist);
      
      // return success code
      res.status(204).json({
        status: "playlist successfully deleted.",
      });
    } else {
      res.status(404).json({
        status: "playlist to delete not found.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to delete playlist.",
    });
  }
};