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
import { home } from "./controllers/home.js";
import { login, register, logout, postLogin, postRegister } from "./controllers/api/authentication.js";

// import api controllers


// import middleware
import registerAuthentication from "./middleware/validation/registerAuthentication.js";
import loginAuthentication from "./middleware/validation/loginAuthentication.js";
import { jwtAuth } from "./middleware/jwtAuth.js";

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

// add routes


// define port, use 3000 if no env variable is set
const port = process.env.PORT || 3000;

// start the app
DataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });