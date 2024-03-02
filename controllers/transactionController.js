const { Transaction, User } = require("../models");
const { Sequelize} = require('sequelize');

class Controller {
  static async fetchBalance(req, res, next) {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      // let data = await Balance.findAll();
      console.log(user, "<<<>>>")
      const balance = user.balance;

      res.status(200).json({ balance: balance });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async topUp(req, res, next) {
    try {
      const amount = parseFloat(req.body.amount)

      const user = await User.findOne({ where: { email: req.user.email } });

      const updatedBalance = user.balance + amount;

      await User.update({ balance: updatedBalance }, { where: { email: req.user.email } });
      

      function generateInvoiceNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const randomNumber = Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0");
        return `INV${year}${month}${day}-${randomNumber}`;
      }

        // Menambahkan transaksi ke database
        await Transaction.create({
          invoice_number: generateInvoiceNumber(),
          service_code: "TopUp",
          service_name: "Top Up balance",
          total_amount: amount,
          transaction_type: "TOPUP",
          create_on: new Date(),
        });

        res.json({
          status: 'success',
          message: 'Top up successful',
          data: {
            amount: amount,
          }
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async transaction(req, res, next) {
    try {
      const {
        service_code,
        service_name,
        total_amount,
        transaction_type,
      } = req.body;

      const user = await User.findOne({ where: { email: req.user.email } });


      await User.update({ balance: user.balance - total_amount }, { where: { email: req.user.email } });

      const data = await Transaction.create({
        invoice_number: generateInvoiceNumber(),
        service_code,
        service_name,
        total_amount,
        transaction_type,
        create_on: new Date(),
      });

      function generateInvoiceNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const randomNumber = Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0");
        return `INV${year}${month}${day}-${randomNumber}`;
      }

      res.json({
        status: 'success',
        message: 'Transaction successful',
        data: data
      });

    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async transactionHistory(req, res, next) {
    try {
      const data = await Transaction.findAll({
        where: { email: userEmail },
        order: [['created_on', 'DESC']],
        limit: limit
      })

      res.json({
        status: 'success',
        message: 'History retrieved successfully',
        data: data
      });

    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = Controller