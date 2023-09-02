const connection = require("../db"); //Import from db.js

module.exports.getForm = function (req, res) {
    console.log(req.query);

    const sqlStatement = `SELECT * from form;`;

    connection
        .query(sqlStatement)
        .then(([rows, fields]) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
};

module.exports.postForm = function (req, res, next) {
    let form = req.body;

    const sqlStatement = `INSERT INTO form(name, temperature, symptoms, contactWithCOVID, formUQID, dateAdded, timeAdded)
        VALUES (?, ?, ?, ?, ?, CONVERT_TZ(NOW(), '+00:00', '+08:00'), CONVERT_TZ(NOW(), '+00:00', '+08:00') );`;
    const values = [
        form.name,
        form.temperature,
        form.symptoms,
        form.contactWithCOVID,
        form.formUQID
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
};