import { DataSource } from "typeorm";

// import van de navigation item entity
import Album from "../models/Album.js";
import Artist from "../models/Artist.js";
import Playlist from "../models/Playlist.js";
import Role from "../models/Role.js";
import Song from "../models/Song.js";
import User from "../models/User.js";
import UserMeta from "../models/UserMeta.js";

// steek die in een array
const entities = [Album, Artist, Playlist, Role, Song, User, UserMeta];

const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: entities, // vertel aan de datasource welke entities die moet gebruiken
});

export default DS;