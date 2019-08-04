DROP TABLE IF EXISTS "inscription";

CREATE TABLE "inscription" (
    id_internal SERIAL PRIMARY KEY,
    prenom VARCHAR(128),
    nom VARCHAR(128),
    email VARCHAR(128),
    entry_point VARCHAR(64) [],

    date_inscription TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_updated TIMESTAMP WITH TIME ZONE
);
