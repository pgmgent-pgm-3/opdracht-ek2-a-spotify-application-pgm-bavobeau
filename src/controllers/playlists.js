import DS from "../lib/DataSource.js";
import data from "../data.js";

export const playlists = async (req, res) => {
  const { id } = req.params;

  res.render("playlist", {
    user: req.user,
    data,
    id
  })
}