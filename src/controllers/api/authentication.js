/*
 * Authentication Controller
 */

// import datasource to extract data from
import DataSource from "../../lib/DataSource.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

// Authentication endpoints
export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorFields in the current request
      req.formErrorFields = errorFields;

      next();
    } else {
      // make user repository instance
      const userRepo = await DataSource.getRepository("User");

      const lwEmail = req.body.email.toLowerCase();

      const user = await userRepo.findOne({
        where: {
          email: lwEmail,
        },
      });

      if (!user) {
        req.formErrors = [{ message: "Gebruiker bestaat niet." }];
        return next();
      }

      // compare hashed password with saved hashed password
      const givenPassword = req.body.password;
      const dbPassword = user.password;
      const isAMatch = bcrypt.compareSync(givenPassword, dbPassword);

      //password check
      if (!isAMatch) {
        req.formErrors = [{ message: "Wachtwoord is niet correct." }];
        return next();
      }

      // create the JWT web token, aka our identity card
      const token = jwt.sign(
        { id: user.id, email: req.body.email },
        process.env.TOKEN_SALT,
        { expiresIn: "24h" }
      );

      // create a cookie and add this to the response
      res.cookie("token", token, { httpOnly: true });

      //redirect to our root
      res.redirect("/");
    }
  } catch (error) {
    next(error.message);
  }
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorFields in the current request
      req.formErrorFields = errorFields;

      return next();
    } else {
      // make user repository instance
      const userRepo = await DataSource.getRepository("User");

      const userExists = await userRepo.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (userExists) {
        req.formErrors = [{ message: "Gebruiker bestaat al." }];
        return next();
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      // create a new user
      const user = await userRepo.create({
        email: req.body.email,
        password: hashedPassword,
        role: {
          id: 3
        }
      });

      // save the user
      await userRepo.save(user);

      res.redirect("/login");
    }
  } catch (error) {
    next(error.message);
  }
};

export const register = async (req, res) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
  ];

  // render register page
  res.render("register", {
    layout: "authentication",
    formErrors,
    inputs,
  });
};

export const login = async (req, res) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
  ];

  // render login page
  res.render("login", {
    layout: "authentication",
    formErrors,
    inputs,
  });
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};