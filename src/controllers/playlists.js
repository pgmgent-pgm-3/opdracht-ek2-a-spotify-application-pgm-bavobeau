import DS from "../lib/DataSource.js";
import data from "../data.js";

export const playlists = async (req, res) => {
  // repo is een object dat de CRUD operaties bevat
  const playlistRepo = DS.getRepository("Playlist");
  const userRepo = DS.getRepository("User");

  // haal alle items op
  const playlists = await playlistRepo.find();
  const user = await userRepo.findOne({
    relations: ["meta", "role"],
    where: {
      id: req.user.id
    }
  });
  
  res.render("playlists", {
    user,
    data,
    playlists,
  })
}

export const playlist = async (req, res) => {
  const { id } = req.params;
  // repo is een object dat de CRUD operaties bevat
  const playlistRepo = DS.getRepository("Playlist");
  const songRepo = DS.getRepository("Song");
  const userRepo = DS.getRepository("User");

  // haal alle items op
  const playlists = await playlistRepo.find();
  const songs = await songRepo.find({
    relations: ["playlists", "artist"]
  });
  const playlist = await playlistRepo.findOne({
    relations: ["songs", "songs.artist"],
    where: {
      id
    }
  });
  const user = await userRepo.findOne({
    relations: ["meta", "role"],
    where: {
      id: req.user.id
    }
  });
  
  res.render("playlist", {
    user,
    data,
    playlists,
    songs,
    playlist 
  })
}