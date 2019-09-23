const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get all kids based on family id
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in /kid with this id:', req.params.id);
    const values = req.params.id;
    const sqlText = `SELECT kid.first_name, kid.last_name, kid.id, kid.allergies, to_char(kid.birthdate, 'MM-DD-YYYY') as birthdate, kid.image, kid.medication, kid.notes from "kid"  join
                    "family" on kid.family_id = family.id
                    join "user" on family.user_id = "user".id
                    where "user".id =$1
                    ORDER BY "kid"."id";`;
    pool.query(sqlText, [values])
        .then((response) => {
            console.log(response.rows);
            res.send(response.rows)
        }).catch((error) => {
            console.log('error getting kid data', error);
            res.sendStatus(500);
        })
})

// add kid with all data and family id
router.post('/addKid', rejectUnauthenticated, (req, res) => {
    console.log('THIS IS RED.BODY', req.body)

    const sqlText = `INSERT INTO "kid" ("first_name","last_name", "birthdate", "allergies", "medication", "image", "family_id", "notes")
                        Values($1, $2, $3, $4, $5, $6, $7, $8);`;
    values =
        [req.body.first_name, req.body.last_name, req.body.birthdate, req.body.allergies,
        req.body.medication, req.body.image, req.body.family_id, req.body.notes];
    pool.query(sqlText, values)
        .then((response) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('ERROR with POSTING kid to DB', error)
        })
})

// update kid based on family id and and any data that needs to be modified
router.put('/update/:id', rejectUnauthenticated, (req,res)=> {
    console.log('THIS IS REQ.PARAMS', req.params);
    console.log('THIS IS REQ.BODY', req.body);

    const sqlText = `UPDATE "kid" SET "first_name"=$1, "last_name"=$2, "birthdate"=$3, "allergies"=$4, "medication"=$5,
                        "image"=$6, "notes"=$7 WHERE "id"=$8;`;
    values=[req.body.first_name, req.body.last_name, req.body.birthdate,req.body.allergies, req.body.medication, 
            req.body.image, req.body.notes, req.params.id];

    pool.query(sqlText, values)
    .then((response)=> {
        res.sendStatus(200);
    })
    .catch((error)=> {
        console.log('Error with UPDATING the DB', error)
        res.sendStatus(500);
    })
})
module.exports = router;