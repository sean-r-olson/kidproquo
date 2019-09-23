const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



//gets all relevant info for feed group view
router.get('/:id', rejectUnauthenticated,  (req, res) => {
    console.log('in /group with this idBLAH:', req.params.id);
    const id = req.params.id;
    const sqlText = `select "family2"."phone_number" as "requester_number", "family"."phone_number" as "claimer_number", "event"."group_id", "event"."total_hours", "event"."offer_needed", "event"."claimer_id", 
                    "event"."requester_id", "family"."image" as "claimer_image", "family2"."image" as "requester_image", 
                    "family2"."last_name1" as "requester_name", "family"."last_name1" as "claimer_name", "event"."id", 
                    "event"."event_date", to_char("event"."event_time_start", 'HH:MI') as "event_time_start", 
                    to_char("event"."event_time_end", 'HH:MI') as "event_time_end", "event"."event_claimed", "event"."notes" from "event"
                    left join "family" on
                    "event"."claimer_id" = "family"."id"
                    left join "family" as "family2" on
                    "event"."requester_id" = "family2"."id"
                    where "event"."group_id"=$1 order by id desc;`;
    pool.query(sqlText, [id])
        .then((response) => {
            console.log('back from group db response.rows:', response.rows);
            res.send(response.rows)
        }).catch((error) => {
            console.log('error getting group data', error);
            res.sendStatus(500);
        })
})

//this will get info from group feed for user home page notifications
router.get('/notifications/:id', rejectUnauthenticated,  (req, res) => {
    console.log('in notiofication req.params.id', req.params.id,)
    const id = req.params.id;
    const sqlText =`select "family2"."id" as "requester_id", "family2"."phone_number" as "requester_number", "family"."phone_number" as "claimer_number", "event"."claimer_id", "family"."image" as "claimer_image", 
    "family2"."image" as "requester_image", "family2"."last_name1" as "requester_name", "family"."last_name1" as "claimer_name", 
    "event"."id", "event"."event_date", to_char("event"."event_time_start", 'HH:MI') as "event_time_start", "event"."offer_needed",
    to_char("event"."event_time_end", 'HH:MI') as "event_time_end" , "event"."event_claimed", "event"."event_confirmed", "event"."group_id", "event"."total_hours", "event"."notes" from "event"
    left join "family" on "event"."claimer_id" = "family"."id" 
    left join "family" as "family2" on "event"."requester_id" = "family2"."id" where "event"."group_id"=$1 order by id desc;`;

    pool.query(sqlText, [id])
        .then((response) => {
            console.log('back from group/ notiofications db response.rows:', response.rows);
            res.send(response.rows)
        }).catch((error) => {
            console.log('error getting group/notifications data', error);
            res.sendStatus(500);
        })
})

//gets all families in group to display in group view
router.get('/fam/:id', rejectUnauthenticated,  (req, res) => {
    console.log('in /fam/group with this id:', req.params.id);
    const values = req.params.id;
    const sqlText = `select last_name1, image, id, user_id from "family"
                    where family.group_id =$1 order by last_name1 asc;`;
    pool.query(sqlText, [values])
        .then((response) => {
            console.log('back from  fam group db response.rows:', response.rows);
            res.send(response.rows)
        }).catch((error) => {
            console.log('error getting fam group data', error);
            res.sendStatus(500);
        })
})

//gets groups that user belongs to upon login
router.get('/', rejectUnauthenticated,  (req, res) => {
    console.log('getting user groups by user id:',req.user.id)
    const sqlText = `select "groups"."id", "groups"."group_name" from groups
                    join family on
                    "family"."group_id" = "groups"."id"
                    Join "user" on
                    "family"."user_id"="user"."id"
                    where "user"."id"=$1;
                    `;
    pool.query(sqlText, [req.user.id])
        .then((response) => {
            console.log('back from  users group db response.rows:', response.rows);
            res.send(response.rows)
        }).catch((error) => {
            console.log('error getting users group data', error);
            res.sendStatus(500);
        })
})








module.exports = router;