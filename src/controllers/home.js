/**
 * Home Controller
 */

// import datasource to extract data from
import DS from "../lib/DataSource.js";

// import data with settings
import data from "../data.js"

export const home = async (req, res) => {
  // repo is een object dat de CRUD operaties bevat
  const userRepo = DS.getRepository("User");
  const playlistRepo = DS.getRepository("Playlist");
  const songRepo = DS.getRepository("Song");
  const artistRepo = DS.getRepository("Artist");
  const albumRepo = DS.getRepository("Album");

  // haal alle items op
  const user = await userRepo.findOne({
    relations: ["meta", "role"],
    where: {
      id: req.user.id
    }
  });
  const playlists = await playlistRepo.find();
  const songs = await songRepo.find({
    relations: ["artist"]
  });
  const artists = await artistRepo.find();
  const albums = await albumRepo.find({
    relations: ["artist"]
  });

  // render homepage
  res.render("home", {
    data,
    user,
    playlists,
    songs,
    artists,
    albums
  });
};