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

  // haal alle items op
  const userItems = userRepo.find();

  // render homepage
  res.render("home", {
    user: req.user,
    data,
    userItems,
  });
};