
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "groups"
(
    "id" SERIAL PRIMARY KEY,
    "group_name" VARCHAR NOT NULL,
    "passcode" VARCHAR NOT NULL,
    "family_passcode" VARCHAR
);

CREATE TABLE "family"
(
    "id" SERIAL PRIMARY KEY,
    "first_name1" VARCHAR (50) NOT NULL,
    "last_name1" VARCHAR (50) NOT NULL,
    "first_name2" VARCHAR,
    "last_name2" VARCHAR,
    "email" VARCHAR (100) NOT NULL,
    "street_address" VARCHAR,
    "city" VARCHAR,
    "state" VARCHAR,
    "zip_code" VARCHAR,
    "phone_number" VARCHAR NOT NULL,
    "image" VARCHAR,
    "user_id" INT REFERENCES "user",
    "family_passcode" VARCHAR,
    "group_id" INT REFERENCES "groups"
);

CREATE TABLE "kid"
(
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (50) NOT NULL,
    "last_name" VARCHAR (50) NOT NULL,
    "birthdate" DATE NOT NULL,
    "allergies" VARCHAR,
    "medication" VARCHAR,
    "image" VARCHAR,
    "family_id" INT REFERENCES "family",
    "notes" VARCHAR (500)
);

CREATE TABLE "event"
(
    "id" SERIAL PRIMARY KEY,
    "event_date" varchar(200),
    "event_time_start" TIME NOT NULL,
    "event_time_end" TIME NOT NULL,
    "total_hours" INTEGER,
    "event_confirmed" BOOLEAN DEFAULT False,
    "requester_id" INT REFERENCES "family",
    "claimer_id" INT REFERENCES "family",
    "group_id" INT REFERENCES "groups",
    "notes" varchar(300),
    "offer_needed" Boolean,
    "event_claimed" Boolean DEFAULT FALSE,
    "claimer_notes" varchar(300)
    
);

CREATE TABLE "feed"
(
    "id" SERIAL PRIMARY KEY,
    "event_id" INT REFERENCES "event"
);






