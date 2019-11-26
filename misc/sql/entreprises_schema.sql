--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Debian 11.5-1.pgdg90+1)
-- Dumped by pg_dump version 11.5 (Debian 11.5-1.pgdg90+1)
-- Name: entreprises; Type: TABLE; Schema: public; Owner: intendant
--
-- DROP STATEMENTS
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
DROP INDEX IF EXISTS entreprises_geoloc;
DROP INDEX IF EXISTS entreprises_naf;
DROP INDEX IF EXISTS entreprises_naf_macro;
DROP INDEX IF EXISTS entreprises_nom_nulls_last;
DROP INDEX IF EXISTS entreprises_siret;
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
    nom text NOT NULL,
    enseigne text,
    siret character varying(14) NOT NULL UNIQUE,
    naf character varying(5),
    addr TEXT [],
    taille public.company_size,
    pmsmp_interest boolean,
    pmsmp_count_recent integer,
    rating_us public.rating,
    comments text,
    source text,
    import_tag text,
    flags text[],
    date_created timestamp with time zone DEFAULT now(),
    date_updated timestamp with time zone,
    label text,
    numero character varying(10),
    rue character varying(128),
    quartier character varying(128),
    commune character varying(128),
    postal_code character varying(10),
    region character varying(128),
    departement character varying(128),
    lat numeric,
    lon numeric,
    phone_official_1 character varying(32),
    phone_official_2 character varying(32),
    email_official character varying(64),
    contact_1_name character varying(64),
    contact_1_role character varying(64),
    contact_1_mail character varying(64),
    contact_1_phone character varying(32),
    contact_2_name character varying(64),
    contact_2_role character varying(64),
    contact_2_mail character varying(64),
    contact_2_phone character varying(32)
);


CREATE INDEX entreprises_geoloc ON public.entreprises USING gist (public.ll_to_earth((lat)::double precision, (lon)::double precision));
CREATE INDEX entreprises_naf ON public.entreprises USING btree (naf);
CREATE INDEX entreprises_naf_macro ON public.entreprises USING btree ("substring"((naf)::text, 0, 3));
CREATE INDEX entreprises_nom_nulls_last ON public.entreprises USING btree (nom);
CREATE INDEX entreprises_siret ON public.entreprises USING btree (siret);
CREATE INDEX trgm_entreprises_enseigne ON public.entreprises USING gin (enseigne public.gin_trgm_ops);
CREATE INDEX trgm_entreprises_name ON public.entreprises USING gin (nom public.gin_trgm_ops);

