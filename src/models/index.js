// import all entities
import Album from "../models/Album.js";
import Artist from "../models/Artist.js";
import Playlist from "../models/Playlist.js";
import Role from "../models/Role.js";
import Song from "../models/Song.js";
import User from "../models/User.js";
import UserMeta from "../models/UserMeta.js";

// steek die in een array
const entities = [Album, Artist, Playlist, Role, Song, User, UserMeta];

// export all entities
export default entities