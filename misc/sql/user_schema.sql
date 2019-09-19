DROP TABLE IF EXISTS "inscription";

CREATE TABLE "inscription" (
    id_internal SERIAL PRIMARY KEY,
    prenom VARCHAR(128),
    nom VARCHAR(128),
    email VARCHAR(128),
    entry_point VARCHAR(64) [],

    questionnaire_sent BOOLEAN DEFAULT FALSE,
    questionaire_replied BOOLEAN DEFAULT FALSE,
    comments TEXT,

    date_inscription TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_updated TIMESTAMP WITH TIME ZONE
);
CREATE INDEX trgm_user_name ON "inscription" USING gin(prenom gin_trgm_ops);
CREATE INDEX trgm_user_famname ON "inscription" USING gin(nom gin_trgm_ops);
CREATE INDEX user_name ON "inscription" (prenom);
