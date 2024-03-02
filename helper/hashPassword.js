const bcrypt = require ('bcryptjs')

const hashPassword = (password) => bcrypt.hashSync(password, 8);
const comparePassword = (password, hashingPassword) => bcrypt.compareSync(password, hashingPassword);


module.exports = { hashPassword, comparePassword}