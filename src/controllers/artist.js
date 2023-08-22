import DS from "../lib/DataSource.js";
import data from "../data.js";

export const artists = async (req, res) => {
  // repo is een object dat de CRUD operaties bevat
  const artistRepo = DS.getRepository("Artist");
  const playlistRepo = DS.getRepository("Playlist");
  const songRepo = DS.getRepository("Song");
  const userRepo = DS.getRepository("User");
    
  // haal alle items op
  const artists = await artistRepo.find();
  const playlists = await playlistRepo.find();
  const user = await userRepo.findOne({
    relations: ["meta", "role"],
    where: {
      id: req.user.id    
    }
  });
  
  res.render("artists", {
    user,
    data,
    artists,
    playlists,
  })
}

export const artist = async (req, res) => {
  const { id } = req.params
  // repo is een object dat de CRUD operaties bevat
  const artistRepo = DS.getRepository("Artist");
  const userRepo = DS.getRepository("User");
  const playlistRepo = DS.getRepository("Playlist");
  const songRepo = DS.getRepository("Song");
  const albumRepo = DS.getRepository("Album");
    
  // haal alle items op
  const artist = await artistRepo.findOneBy({id});
  const user = await userRepo.findOne({
    relations: ["meta", "role"],
    where: {
      id: req.user.id   
    }
  });
  const playlists = await playlistRepo.find();
  const songs = await songRepo.find({
    relations: ["artist"],
    where: {
      artist: {
        id
      }
    }
  });
  const albums = await albumRepo.find({
    relations: ["artist"],
    where: {
      artist: {
        id
      }
    }
  })
  
  res.render("artist", {
    user,
    data,
    artist,
    playlists,
    songs,
    albums
  })
}