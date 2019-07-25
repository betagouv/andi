CREATE COMPANY_SIZE AS ENUM (
    "1-2",
    "3-5",
    "6-9",
    "10-19",
    "20-49",
    "50-99",
    "100-199",
    "200-249",
    "250-499",
    "500-999"
    "1000-1999",
    "2000-4999",
    "5000-9999",
    "+10000"
)

CREATE RATING AS ENUM (
    "mediocre",
    "satisfaisant",
    "bon",
    "excellent"
)

-- Quality of data entry, level of trustworthness
CREATE QOD AS ENUM (
    "mediocre",
    "satisfaisan",
    "excellent"
)

DROP TABLE IF EXISTS "company";
CREATE TABLE "company" (
    id_internal SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    enseigne TEXT,
    
    siren VARCHAR(9),
    nic VARCHAR(5),
    naf VARCHAR(5),
    naf_label TEXT,
    macro_sector TEXT,
    taille COMPANY_SIZE,

    pmsmp_interest BOOLEAN,
    pmsmp_count_recent INTEGER,
    alternance_interest BOOLEAN,
    rome_offers TEXT,

    rating_us RATING,
    rating_other RATING,
    rating_social RATING,
    
    source TEXT,
    import_tag TEXT,
    flags TEXT [],
    qoc QOD,

    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_updated TIMESTAMP WITH TIME ZONE
)

DROP TABLE IF EXISTS "company_position";
CREATE TABLE "company_position" (
    id_internal SERIAL PRIMARY KEY,
    id_company INT,
    commune VARCHAR(128),
    departement VARCHAR(128),
    lat NUMERIC,
    lon NUMERIC,
    error_margin_km SMALLINT DEFAULT 0,
    data_quality QOD,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_updated TIMESTAMP WITH TIME ZONE
)

DROP TABLE IF EXISTS "company_rome";
CREATE TABLE "company_rome" (
    id_internal SERIAL PRIMARY KEY,
    id_company INT,
    rome VARCHAR(5),
    rome_label_a TEXT,
    rome_label_b TEXT, 
    rome_label_c TEXT, 
    rome_label_d TEXT, 
    ogr_code VARCHAR(6),

    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_updated TIMESTAMP WITH TIME ZONE
)


DROP TABLE IF EXISTS "company_contact";
CREATE TABLE "company_contact" (
    id_internal SERIAL PRIMARY KEY,
    id_company INT,
    website TEXT,
    social_twitter TEXT,
    social_linkedin TEXT,
    social_facebook TEXT,
    addr TEXT [],
    postal_code VARCHAR(10),
    postal_commune VARCHAR(64),
    postal_person VARCHAR(64),
    phone_preferred_1 VARCHAR(32),
    phone_preferred_2 VARCHAR(32),
    phone_official_1 VARCHAR(32),
    phone_official_2 VARCHAR(32),
    email_preferred VARCHAR(64),
    email_preferred_modified_date TIMESTAMP WITH TIME ZONE,
    email_preferred_confirmed BOOLEAN,
    email_official VARCHAR(64),
    email_official_modified_date TIMESTAMP WITH TIME ZONE,
    email_official_confirmed BOOLEAN,
    data_quality QOD,

    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_updated TIMESTAMP WITH TIME ZONE
)






