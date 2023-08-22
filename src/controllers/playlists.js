import DS from "../lib/DataSource.js";
import data from "../data.js";

export const playlists = async (req, res) => {
  const { id } = req.params;
  // repo is een object dat de CRUD operaties bevat
  const playlistRepo = DS.getRepository("Playlist");
  const songRepo = DS.getRepository("Song");
    
  // haal alle items op
  const playlists = await playlistRepo.find();
  const songs = await songRepo.find({
    relations: ["playlists"]
  });
  const playlist = await playlistRepo.findOne({
    relations: ["songs"],
    where: {
      id
    }
  });
  
  res.render("playlist", {
    user: req.user,
    data,
    playlists,
    songs,
    playlist 
  })
}