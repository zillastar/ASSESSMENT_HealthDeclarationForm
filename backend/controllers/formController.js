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

module.exports.getFormByUser = function (req, res) {
    let id = req.query.id

    const sqlStatement = `SELECT * from formUnique WHERE userID = ?;`;
    const values = [id]

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

module.exports.getFormByUQID = function (req, res) {
    let id = req.query.id

    const sqlStatement = `SELECT * from formUnique WHERE formUQID = ?;`;
    const values = [id]

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


module.exports.createNewForm = function (req, res) {
    let form = req.body

    const sqlStatement = `INSERT INTO formUnique(name, description, userID) VALUES (?, ?, ?);`;
    const values = [form.name, form.description, form.userID]

    connection
        .query(sqlStatement, values)
        .then(([rows, fields]) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
}

module.exports.getFormData = function (req, res) {
    let id = req.query.id

    const sqlStatement = `SELECT * FROM form WHERE formUQID = ?`
    const values = [id]

    connection
        .query(sqlStatement, values)
        .then(([rows, fields]) => {
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
}

module.exports.postForm = function (req, res) {
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
}

module.exports.updateForm = function (req, res) {
    let form = req.body;

    // checking userID also for better validation
    const sqlStatement = `UPDATE formUnique SET name = COALESCE(?, name), description = COALESCE(?, name) WHERE formUQID = ? AND userID = ?;`;
    const values = [
        form.name,
        form.description,
        form.formUQID,
        form.userID
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

module.exports.deleteForm = function (req, res) {
    let form = req.query;

    // checking userID also for better validation
    const sqlStatement = `DELETE FROM formUnique WHERE formUQID = ? AND userID = ?;`;
    const values = [
        form.formUQID,
        form.userID
    ];

    const sqlStatement2 = `DELETE FROM form WHERE formUQID = ?;`;
    const values2 = [
        form.formUQID
    ];

    connection
        .query(sqlStatement, values)
        .then(([rows, fields]) => {
            console.log(rows);
            connection
                .query(sqlStatement2, values2)
                .then(([rows, fields]) => {
                    console.log(rows);
                    res.json(rows);
                })
                .catch((error) => {
                    res.send(error);
                });
        })
        .catch((error) => {
            res.send(error);
        });
};