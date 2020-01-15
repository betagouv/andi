-- DROP STATEMENTS
-- 
-- Extensions for v1 matching geo searching /!\ DEPRECATED /!\
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;
-- Extensions for v2 matching geo searching
CREATE EXTENSION IF NOT EXISTS postgis;
-- Extension for accelerated text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

DROP INDEX IF EXISTS entreprises_geoloc;
DROP INDEX IF EXISTS entreprises_naf;
DROP INDEX IF EXISTS entreprises_naf_macro;
DROP INDEX IF EXISTS entreprises_nom_nulls_last;
DROP INDEX IF EXISTS entreprises_siret;
DROP INDEX IF EXISTS entreprises_siren;
DROP INDEX IF EXISTS entreprises_nic;
DROP INDEX IF EXISTS entreprises_flags_gin;
DROP INDEX IF EXISTS entreprises_postgis_geom;
DROP INDEX IF EXISTS trgm_entreprises_enseigne;
DROP INDEX IF EXISTS trgm_entreprises_name;
DROP TABLE IF EXISTS "entreprises";
DROP TYPE IF EXISTS COMPANY_SIZE;
DROP TYPE IF EXISTS RATING;
-- END OF DROP STATEMENTS

CREATE TYPE COMPANY_SIZE AS ENUM (
    '0', -- Unknown or No other employees
    '1-2',
    '3-5',
    '6-9',
    '10-19',
    '20-49',
    '50-99',
    '100-199',
    '200-249',
    '250-499',
    '500-999',
    '1000-1999',
    '2000-4999',
    '5000-9999',
    '+10000'
);

CREATE TYPE RATING AS ENUM (
    'mediocre',
    'satisfaisant',
    'bon',
    'excellent'
);

CREATE TABLE entreprises (
    id_internal SERIAL PRIMARY KEY,
    nom TEXT,
    enseigne TEXT,
    enseignes TEXT [],
    siret CHARACTER VARYING(14) NOT NULL UNIQUE,
    siren CHARACTER VARYING(9),
    nic CHARACTER VARYING(5),
    nic_siege CHARACTER VARYING(5),
    naf CHARACTER VARYING(5),
    addr TEXT [],
    taille public.company_size,
    pmsmp_interest boolean,
    pmsmp_count_recent integer,
    caractere_employeur BOOLEAN,
    etat_actif BOOLEAN,
    rating_us public.rating,
    comments TEXT,
    source TEXT,
    import_tag TEXT,
    flags TEXT[],
    date_created TIMESTAMP WITH TIME ZONE DEFAULT now(),
    date_updated TIMESTAMP WITH TIME ZONE,
    data_majdate TIMESTAMP WITH TIME ZONE,
    label TEXT,
    numero CHARACTER VARYING(10),
    rue CHARACTER VARYING(128),
    quartier CHARACTER VARYING(128),
    commune CHARACTER VARYING(128),
    postal_code CHARACTER VARYING(10),
    commune_code CHARACTER VARYING(10),
    region CHARACTER VARYING(128),
    departement CHARACTER VARYING(128),
    siege BOOLEAN,
    -- geo
    lat NUMERIC,
    lon NUMERIC,
    geo_type CHARACTER VARYING(128),
    geo_score NUMERIC,
    geo_addr CHARACTER VARYING(256),
    geo_id CHARACTER VARYING(32),
    geom geometry(Point, 4326),

    -- contact
    phone_official_1 CHARACTER VARYING(32),
    phone_official_2 CHARACTER VARYING(32),
    email_official CHARACTER VARYING(64),
    contact_1_name CHARACTER VARYING(64),
    contact_1_role CHARACTER VARYING(64),
    contact_1_mail CHARACTER VARYING(64),
    contact_1_phone CHARACTER VARYING(32),
    contact_2_name CHARACTER VARYING(64),
    contact_2_role CHARACTER VARYING(64),
    contact_2_mail CHARACTER VARYING(64),
    contact_2_phone CHARACTER VARYING(32)
);


-- Deprecated: using postgis method now
-- CREATE INDEX entreprises_geoloc ON public.entreprises USING GIST (public.ll_to_earth((lat)::double precision, (lon)::double precision));
CREATE INDEX entreprises_naf ON public.entreprises USING BTREE (naf);
CREATE INDEX entreprises_naf_macro ON public.entreprises USING BTREE ("substring"((naf)::TEXT, 0, 3));
CREATE INDEX entreprises_nom_nulls_last ON public.entreprises USING BTREE (nom);
CREATE INDEX entreprises_siret ON public.entreprises USING BTREE (siret);
CREATE INDEX entreprises_siren ON public.entreprises USING BTREE (siren);
CREATE INDEX entreprises_nic ON public.entreprises USING BTREE (nic);
CREATE INDEX trgm_entreprises_enseigne ON public.entreprises USING GIN (enseigne public.gin_trgm_ops);
CREATE INDEX trgm_entreprises_name ON public.entreprises USING GIN (nom public.gin_trgm_ops);
CREATE INDEX entreprises_flags_gin ON PUBLIC.entreprises USING GIN (flags);
CREATE INDEX entreprises_postgis_geom ON PUBLIC.entreprises USING GIST ((geom:geography))
