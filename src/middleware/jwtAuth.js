import jwt from "jsonwebtoken";
import DS from "../lib/DataSource.js";

export const jwtAuth = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SALT);

    const userRepo = DS.getRepository("User");
    const user = await userRepo.findOne({ where: { id } });

    user.password = "";
    req.user = user;

    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};