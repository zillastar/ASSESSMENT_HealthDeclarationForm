const bcrypt = require('bcrypt');
const connection = require("../db"); //Import from db.js
const jwtManager = require('../jwt'); //Import from jwt.js

const hashPassword = (password) => {
    return bcrypt.hash(password, +process.env.SALT_ROUNDS);
}
const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

async function Compare(password, hash, res) {

    return comparePassword(password, hash).
        then((isMatched) => {
            if (!isMatched) {
                res.status(401).send()
                return false;
            }
            return;
        })
};

module.exports.createUser = function (req, res, next) {
    let details = req.body;

    const sqlStatement = `SELECT email FROM users WHERE email = ?;`;
    const values = [
        details.email
    ];
    connection
        .query(sqlStatement, values)
        .then(([rows, fields]) => {
            // Checks if email that is to be registered already exists in the database. Email is unique so no duplicates allowed
            if (rows.length == 1) {
                res.status(409).send()
                return;
            } else {
                hashPassword(details.password).then((hash) => {
                    const sqlStatement = `INSERT INTO users(username, email, password) VALUES (?, ?, ?);`;
                    const values = [
                        details.username,
                        details.email,
                        hash
                    ];

                    connection
                        .query(sqlStatement, values)
                        .then(([rows, fields]) => {
                            console.log(rows);
                            res.json(rows);
                        })
                        .catch((error) => {
                            res.send(error);
                        });
                })
            }
        })
};

module.exports.userLogin = function (req, res, next) {
    let details = req.body;

    const sqlStatement = `SELECT password, userID FROM users WHERE email = ?;`;
    const values = [
        details.email
    ];
    let id;

    connection
        .query(sqlStatement, values)
        .then(([rows, fields]) => {
            console.log(rows.length)
            // Checks if user exists. if not it sends an 401 error code
            if (rows.length == 0) {
                res.status(401).send();
                return;
            } else {
                id = rows[0].userID;
                return rows[0].password;
            }
        })
        .then((response) => {
            if (response == undefined) return;
            console.log(response)
            Compare(details.password, response, res)
                .then((response) => {
                    if (response == false) return;
                    return jwtManager.create(details.username, details.email, id);
                }).then((token) => {
                    if (token == undefined) return;
                    return res.status(201).json({ token });
                })
        })
        .catch((error) => {
            res.send(error);
        });
};
