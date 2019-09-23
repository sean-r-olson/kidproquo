const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');




//Posts new family to the
router.post('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id)
    console.log('In family router, adding new family, req.body:', req.body)
    const sqlText = `INSERT INTO family ("first_name1", "last_name1", "first_name2", "last_name2", "email",
    "street_address", "city", "state", "zip_code", "phone_number", "user_id", "family_passcode") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`;
    pool.query(sqlText, [req.body.first_name1, req.body.last_name1, req.body.first_name2, req.body.last_name2,
    req.body.email, req.body.street_address, req.body.city, req.body.state, req.body.zip_code, req.body.phone_number,
    req.params.id, req.body.family_passcode])
        .then((response) => {
            console.log(`Added family to the DB response.rows[0]:`, response.rows[0])
            res.send(response);
        })
        .catch((error) => {
            console.log(`Error adding new family to DB`, error);
            res.sendStatus(500); // Good server always responds :)
        })
});

// get family based on family id using req.params.id
router.get('/user/:id', rejectUnauthenticated, (req, res) => {
    console.log('in /family with this id:', req.params.id);
    const values = req.params.id;
    const sqlText = `SELECT * FROM family where user_id=$1`;
    pool.query(sqlText, [values])
        .then((response) => {
            console.log(response.rows[0]);
            res.send(response.rows[0])
        }).catch((error) => {
            console.log('error getting family data', error);
            res.sendStatus(500);
        })
})

// update family information by identifying with family id and 
// inserting any other data into the family table
router.put('/update/:id', rejectUnauthenticated, (req, res) => {
    console.log('IN ROUTER.PUT', req.params.id)
    console.log('IN ROUTER.PUT', req.body)
    // const sqlText = `UPDATE "family" SET "image"=$1, "last_name1"=$2 WHERE "id"=$3;`;
    const sqlText = `UPDATE "family" SET "first_name1"=$1, last_name1=$2, "first_name2"=$3, "last_name2"=$4, "email"=$5, 
                    "street_address"=$6, "city"=$7, "state"=$8, "zip_code"=$9, "phone_number"=$10, "image"=$11 WHERE "id"=$12;`;

    values = [req.body.family_first_name1, req.body.family_last_name1, req.body.family_first_name2, req.body.family_last_name2, req.body.email,
                req.body.street_address, req.body.city, req.body.state, req.body.zip_code, req.body.phone_number, 
                req.body.family_image, req.params.id];

    // values=[req.body.family_image, req.body.family_last_name, req.params.id ]
    pool.query(sqlText, values)
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error with updating FAMILY in the DB', error)
            res.sendStatus(500);
        })
})

//getting family by using the user id in req.params.id
router.get('/userFamily/:id', rejectUnauthenticated, (req, res) => {
    console.log('in /family with this id:', req.params.id);
    const values = req.params.id;
    const sqlText = `SELECT * FROM family where user_id=$1`;
    pool.query(sqlText, [values])
        .then((response) => {
            console.log('IN USER FAMILY ROUTER WITH:', response.rows[0]);
            res.send(response.rows[0])
        }).catch((error) => {
            console.log('error getting family data', error);
            res.sendStatus(500);
        })
})

module.exports = router;