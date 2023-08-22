/**
 * The Artist API controllers
 */

import DS from "../../lib/DataSource.js";

export const getArtist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artistRepo = DS.getRepository("Artist");
    const artist = await artistRepo.findOneBy({
      id,
    });
    res.status(200).json(artist);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get artist.",
    });
  }
};

export const getArtists = async (req, res, next) => {
  try {
    const artistRepo = DS.getRepository("Artist");
    const artists = await artistRepo.find();
    res.status(200).json(artists);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get artists",
    });
  }
};

export const postArtist = async (req, res, next) => {
  try {
    const artistRepo = DS.getRepository("Artist");

    // look if artist already exists in repo
    const artist = await artistRepo.findOne({
      where: {
        name: req.body.name,
      },
    });

    // if artists exists stop and return existing artist
    if (artist) {
      res.status(400).json({
        status: "Artist already exists in database.",
        artist: artist,
      });

      // if artist doesn't exist add it to database
    } else {
      await artistRepo.save(req.body);

      return res.redirect(req.get('referer'));
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to create new artist.",
    });
  }
};

export const updateArtist = async (req, res, next) => {
  try {
    const artistRepo = DS.getRepository("Artist");

    const { id } = req.body;

    // look for artist in repo
    const artist = await artistRepo.findOneBy({
      id,
    });

    // make new object with only what needed for artist
    const newArtist = {
      id,
      name: req.body.name,
    };

    // if artists exists update it
    if (artist && id !== undefined) {
      await artistRepo.save(newArtist);

      res.status(200).json({
        status: "Artist successfully updated.",
        artist: newArtist,
      });

      // if artist doesn't exist stop
    } else {
      //return error code
      res.status(404).json({
        status: "Artist not found.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed to update artist.",
    });
  }
};

export const deleteArtist = async (req, res, next) => {
  try {
    const artistRepo = DS.getRepository("Artist");

    const { id } = req.body;

    const artist = await artistRepo.findOneBy({ id });

    // if artist exists
    if (artist) {
      // remove artist
      await artistRepo.delete(artist);
    }

    // return success code
    res.status(204).json({
      status: "Artist successfully deleted.",
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed to delete artist.",
    });
  }
};
