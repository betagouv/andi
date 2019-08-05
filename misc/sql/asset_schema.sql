DROP TABLE IF EXISTS "asset";

CREATE TABLE "asset" (
    id_internal SERIAL PRIMARY KEY,
    key VARCHAR(128),
    description VARCHAR(256),
    value TEXT,

    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_updated TIMESTAMP WITH TIME ZONE
);
