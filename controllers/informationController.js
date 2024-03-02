const { Banner, Service } = require('../models')

class Controller {
  static async fetchBanner(req, res, next) {
    try {
      const data = await Banner.findAll();

      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }

  static async fetchService(req, res, next) {
    try {
      const data = await Service.findAll();

      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller