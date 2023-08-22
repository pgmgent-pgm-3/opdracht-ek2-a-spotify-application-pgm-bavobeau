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

  // haal alle items op
  const user = await userRepo.findOne({
    relations: ["meta", "role"],
    where: {
      id: req.user.id
    }
  });
  const playlists = await playlistRepo.find();
  const songs = await songRepo.find();

  // render homepage
  res.render("home", {
    data,
    user,
    playlists,
    songs
  });
};