const express = require("express");
const userController = require("../controllers/userController");
const informationController = require("../controllers/informationController");
const transactionController = require("../controllers/transactionController");
const authentication = require("../middlewares/authentication");
// const UserController = require("../controllers");
const router = express.Router();

// MODULE PROFILE
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/profile', authentication, userController.fetchProfile)
router.put('/profile/update', authentication, userController.update)
router.put('/profile/image', authentication, userController.updateImage)

// MODULE INFORMATTION
router.get("/banner", informationController.fetchBanner);
router.get("/service", informationController.fetchService);

// MODULE TRANSACTION
router.get('/balance', authentication, transactionController.fetchBalance)
router.post('/topup', authentication, transactionController.topUp)
router.post('/transaction', authentication, transactionController.transaction)
router.get('/transaction/history', authentication, transactionController.transactionHistory)

module.exports = router;