/**
 * The Album API controllers
 */

import DS from "../../lib/DataSource.js";

export const getAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const albumRepo = DS.getRepository("Album");
    const album = await albumRepo.findOneBy({
      id,
    });
    res.status(200).json(album);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get album.",
    });
  }
};

export const getAlbums = async (req, res, next) => {
  try {
    const albumRepo = DS.getRepository("Album");
    const albums = await albumRepo.find();
    res.status(200).json(albums);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get albums",
    });
  }
};

export const postAlbum = async (req, res, next) => {
  try {
    const albumRepo = DS.getRepository("Album");

    // look if album already exists in repo
    const album = await albumRepo.findOne({
      where: {
        name: req.body.name,
      },
    });

    // if albums exists stop and return existing album
    if (album) {
      res.status(400).json({
        status: "album already exists in database.",
        album: album,
      });

      // if album doesn't exist add it to database
    } else {
      await albumRepo.save(req.body);

      //return succes code with new album
      res.status(201).json({
        status: "New album successfully added.",
        album: req.body,
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to create new album.",
    });
  }
};

export const updateAlbum = async (req, res, next) => {
  try {
    const albumRepo = DS.getRepository("Album");

    const { id } = req.body;

    // look for album in repo
    const album = await albumRepo.findOneBy({
      id,
    });

    // if album exists update it
    if (album && id !== undefined) {
      await albumRepo.save(req.body);

      res.status(200).json({
        status: "album successfully updated.",
        album: req.body,
      });

      //if album doesn't exist stop
    } else {
      // return error code
      res.status(404).json({
        status: "album not found.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to update album.",
    });
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const albumRepo = DS.getRepository("Album");

    const { id } = req.body;

    const album = await albumRepo.findOneBy({ id });

    // if album exists
    if (album != null && id != undefined) {
      // remove album
      await albumRepo.delete(album);
      
      // return success code
      res.status(204).json({
        status: "album successfully deleted.",
      });
    } else {
      res.status(404).json({
        status: "album to delete not found.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to delete album.",
    });
  }
};