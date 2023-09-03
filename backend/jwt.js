const jwt = require('jsonwebtoken');
const util = require('util');
const signAsync = util.promisify(jwt.sign);
// because i am using promises instead of callback so i try use promisify

const privateKey = process.env.JWT_PRIVATE_KEY

module.exports.create = (username, email, id) => {
    return signAsync({username, email, id}, privateKey);
}

