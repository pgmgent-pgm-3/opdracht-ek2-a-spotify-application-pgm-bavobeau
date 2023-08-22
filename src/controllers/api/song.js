/**
 * The Song API controllers
 */

import DS from "../../lib/DataSource.js";

export const getSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const songRepo = DS.getRepository("Song");
    const song = await songRepo.find({
      relations: ["artist"],
      where: {
        id,
      },
    });
    res.status(200).json(song);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get song.",
    });
  }
};

export const getSongs = async (req, res, next) => {
  try {
    const songRepo = DS.getRepository("Song");
    const songs = await songRepo.find({
      relations: ["artist"],
    });
    res.status(200).json(songs);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get songs.",
    });
  }
};

export const postSong = async (req, res, next) => {
  try {
    const songRepo = DS.getRepository("Song");

    //look if song already exists in repo
    const song = await songRepo.findOne({
      relations: ["artist"],
      where: {
        name: req.body.name,
        artist: {
          id: req.body.artist_id
        }
      }
    });
    // if song exists stop and return existing song
    if (song) {
      res.status(400).json({
        status: "Song already exists in database.",
        song: song,
      });
      // if song doesn't exist add it
    } else {
      await songRepo.save({
        name: req.body.name,
        artist: {
          id: req.body.artist_id
        }
      });

      return res.redirect(req.get('referer'));
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to create new song.",
    });
  }
};

export const updateSong = async (req, res, next) => {
  try {
    const songRepo = DS.getRepository("Song");

    const { id } = req.body;

    // look for song in repo
    const song = await songRepo.findOneBy({
      id,
    });

    // if song exists update it
    if (song && id !== undefined) {
      await songRepo.save(req.body);

      res.status(200).json({
        status: "Song successfully updated.",
        song: req.body,
      });

      //if song doesn't exist stop
    } else {
      // return error code
      res.status(404).json({
        status: "Song not found.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to update song.",
    });
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const songRepo = DS.getRepository("Song");

    const { id } = req.body;

    const song = await songRepo.findOneBy({ id });

    // if song exists
    if (song) {
      // remove song
      await songRepo.delete(song);
    }

    // return success code
    res.status(204).json({
      status: "Song successfully deleted.",
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed to delete song.",
    });
  }
};