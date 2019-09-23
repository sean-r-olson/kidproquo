const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//gets groups that user belongs to upon login
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('DID I FIND THRIS ROUTE ?GROU?FAMILY');
    const values = req.user.id;
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

module.exports = router;