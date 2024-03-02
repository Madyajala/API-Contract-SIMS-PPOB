const { comparePassword } = require("../helper/hashPassword");
const { createdToken } = require("../helper/jwt");
const { User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, first_name, last_name, picture_image } =
        req.body;

      const newUser = await User.create({
        email,
        password,
        first_name,
        last_name,
        picture_image,
      });

      res
        .status(201)
        .json({
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          password: newUser.password,
        });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!findUser) {
        throw { name: "Email/Password is wrong" };
      }

      if (email === "UniqueConstraintError") {
        throw { name: "Email Has Been SignUp" };
      }

      const checkPassword = comparePassword(password, findUser.password);
      if (!checkPassword) {
        throw { name: "Email/Password is wrong" };
      }

      const access_token = createdToken({
        id: findUser.id,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error, "<---");
      next(error);
    }
  }

  static async fetchProfile(req, res, next) {
    try {
      const data = await User.findAll();

      res.status(200).json(data);
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const { first_name, last_name } = req.body;

      const data = await User.update(
        { first_name, last_name },
        {
          where: { email: req.user.email },
          returning: true,
        }
      );

      if (data === 0) {
        throw { name: "Not Found" };
      }

      res.status(201).json({
        status: "success",
        message: "Profile updated berhasil",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateImage(req, res, next) {
    try {
      const { profile_image } = req.body;

      const data = await User.update(
        { profile_image },
        {
          where: { email: req.user.email },
          returning: true,
        }
      );

      if (data === 0) {
        throw { name: "Not Found" };
      }

      res.status(201).json({
        status: "success",
        message: "Update Profile Image berhasil",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
