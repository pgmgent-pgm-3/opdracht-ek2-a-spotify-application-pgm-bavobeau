/**
 * The User API controllers
 */

import DS from "../../lib/DataSource.js";

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRepository = DS.getRepository("User");
    const user = await userRepository.findOneBy({
      id,
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get user",
    });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const userRepository = DS.getRepository("User");
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get users",
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userRepository = DS.getRepository("User");
    const user = await userRepository.findOneBy({
      id,
    });

    if (user) {
      // remove the User
      await userRepository.delete(user);
    }

    res.status(204).json({
      status: "We deleted the user from the database!",
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed to delete the User",
    });
  }
};