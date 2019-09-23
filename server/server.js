
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const calendarRouter = require('./routes/calendar.router');
const familyRouter = require('./routes/family.router');
const feedRouter = require('./routes/feed.router');
const groupRouter = require('./routes/group.router');
const kidRouter = require('./routes/kid.router');
const profileRouter = require('./routes/profile.router');
const helpRouter = require('./routes/help.router')
//Twilio
const textRouter = require('./routes/text.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/calendar', calendarRouter);
app.use('/family', familyRouter);
app.use('/feed', feedRouter);
app.use('/group', groupRouter);
app.use('/kid', kidRouter);
app.use('/profile', profileRouter);
app.use('/help', helpRouter)
//Twilio
app.use('/api/text', textRouter);



// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
