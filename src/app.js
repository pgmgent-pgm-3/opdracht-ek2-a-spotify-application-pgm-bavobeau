/*
 *  import statements
 */
import "dotenv/config";
import express from "express";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from './docs/swagger.js';

import { VIEWS_PATH } from "./constants.js";

import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import DataSource from "./lib/DataSource.js";

// import controllers
import { home, playlists, playlist, artists, artist, user } from "./controllers/index.js";

// import api endpoints
import { login, register, logout, postLogin, postRegister } from "./controllers/api/authentication.js";
import { getUser, getUsers, deleteUser } from "./controllers/api/user.js";
import { getArtist, getArtists, postArtist, updateArtist, deleteArtist } from "./controllers/api/artist.js";
import { getSong, getSongs, postSong, updateSong, deleteSong } from "./controllers/api/song.js";
import { getAlbum, getAlbums, postAlbum, updateAlbum, deleteAlbum } from "./controllers/api/album.js";
import { getPlaylist, getPlaylists, getPlaylistsByUserId, postPlaylist, postSongToPlaylist, updatePlaylist, deletePlaylist } from "./controllers/api/playlist.js";

// import middleware
import registerAuthentication from "./middleware/validation/registerAuthentication.js";
import loginAuthentication from "./middleware/validation/loginAuthentication.js";
import { jwtAuth } from "./middleware/jwtAuth.js";
import { authorizeAdmin, authorizeEditor } from "./middleware/authorize.js"

// initialize express
const app = express();
app.use(express.static("public"));

// init cookieParser
app.use(cookieParser());

// init bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// init handlebars
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs",
});

// set view engine to hbs
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

/*
 *  API routes 
 */
// Authentication
app.get("/", jwtAuth, home);
app.get("/login", login);
app.get("/register", register);
app.post("/api/register", registerAuthentication, postRegister, register);
app.post("/api/login", loginAuthentication, postLogin, login);
app.get("/logout", logout);

// app routes
app.get("/playlists", jwtAuth, playlists)
app.get("/playlists/:id", jwtAuth, playlist)
app.get("/artists", jwtAuth, artists)
app.get("/artists/:id", jwtAuth, artist)
app.get("/user/:id", jwtAuth, user)

// user routes
app.get("/api/users", jwtAuth, authorizeAdmin, getUsers);
app.get("/api/user/:id", jwtAuth, authorizeAdmin, getUser);
app.delete("/api/user/:id", jwtAuth, authorizeAdmin, deleteUser);

// artist routes
app.get("/api/artists", getArtists);
app.get("/api/artist/:id", getArtist);
app.post("/api/artist", jwtAuth, authorizeAdmin, postArtist);
app.put("/api/artist", jwtAuth, authorizeEditor, updateArtist);
app.delete("/api/artist", jwtAuth, authorizeAdmin, deleteArtist);

// song routes
app.get("/api/songs", getSongs);
app.get("/api/song/:id", getSong);
app.post("/api/song", jwtAuth, authorizeAdmin, postSong);
app.put("/api/song", jwtAuth, authorizeEditor, updateSong); 
app.delete("/api/song", jwtAuth, authorizeAdmin, deleteSong); 

// album routes
app.get("/api/albums", getAlbums);
app.get("/api/album/:id", getAlbum);
app.post("/api/album", jwtAuth, authorizeAdmin, postAlbum);
app.put("/api/album", jwtAuth, authorizeEditor, updateAlbum);
app.delete("/api/album", jwtAuth, authorizeAdmin, deleteAlbum);

// playlist routes
app.get("/api/playlists", getPlaylists);
app.get("/api/playlist/:id", getPlaylist);
app.get("/api/playlists/:userId", getPlaylistsByUserId);
app.post("/api/playlist", jwtAuth, authorizeAdmin, postPlaylist);
app.post("/api/playlist/addSong", jwtAuth, authorizeAdmin, postSongToPlaylist);
app.put("/api/playlist", jwtAuth, authorizeEditor, updatePlaylist);
app.delete("/api/playlist", jwtAuth, authorizeAdmin, deletePlaylist);

// define port, use 3000 if no env variable is set
const port = process.env.PORT || 3000;

// start the app
DataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}.`);
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });