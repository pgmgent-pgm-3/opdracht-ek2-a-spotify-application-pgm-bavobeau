import DS from "../lib/DataSource.js";
import data from "../data.js";

export const user = async (req, res) => {
  const { id } = req.params;
  // repo is een object dat de CRUD operaties bevat
  const metaRepo = DS.getRepository("UserMeta");
  const userRepo = DS.getRepository("User");

  // haal alle items op
  const meta = await metaRepo.findOne({
    relations: ["user"],
    where: {
      user: {
        id
      }
    }
  });
  const user = await userRepo.findOne({
    relations: ["meta", "role"],
    where: {
      id: req.user.id
    }
  });
  
  res.render("user", {
    user,
    data,
    meta
  })
}