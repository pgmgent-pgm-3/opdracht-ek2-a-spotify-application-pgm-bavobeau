import DS from "../lib/DataSource.js";
import data from "../data.js";

export const artists = async (req, res) => {
  // repo is een object dat de CRUD operaties bevat
  const artistRepo = DS.getRepository("Artist");
  const playlistRepo = DS.getRepository("Playlist");
  const songRepo = DS.getRepository("Song");
    
  // haal alle items op
  const artists = await artistRepo.find();
  const playlists = await playlistRepo.find();
  const songs = await songRepo.find({
    relations: ["artist"],
    where: {

    }
  });
  
  res.render("artists", {
    user: req.user,
    data,
    artists,
    playlists,
    songs,
  })
}

export const artist = async (req, res) => {
  const { id } = req.params
  // repo is een object dat de CRUD operaties bevat
  const artistRepo = DS.getRepository("Artist");
  const playlistRepo = DS.getRepository("Playlist");
  const songRepo = DS.getRepository("Song");
    
  // haal alle items op
  const artist = await artistRepo.findOneBy({id});
  const playlists = await playlistRepo.find();
  const songs = await songRepo.find({
    relations: ["artist"],
    where: {
      artist: {
        id
      }
    }
  });
  
  res.render("artist", {
    user: req.user,
    data,
    artist,
    playlists,
    songs,
  })
}