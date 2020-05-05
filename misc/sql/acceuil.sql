-- DROP STATEMENTS
DROP TYPE IF EXISTS andi_couverture;
DROP TYPE IF EXISTS andi_acces;
DROP TYPE IF EXISTS andi_pmr;
DROP TYPE IF EXISTS andi_amenagements;
DROP TYPE IF EXISTS andi_materiel;
DROP TABLE IF EXISTS andi_acceuil;

-- END OF DROP STATEMENTS

CREATE TYPE andi_couverture AS ENUM(
    'un',
    'tous',
    'tous_departement',
    'tous_region',
    'specifique_dep',
    'specifique_regions',
    'autre'
);

CREATE TYPE andi_acces AS ENUM(
    'train',
    'rer',
    'metro',
    'bus',
    'tram',
    'parking_pmr',
    'autre'
);

CREATE TYPE andi_pmr AS ENUM(
    'plain_pied',
    'portes_automatiques',
    'portes_larges',
    'ascenseurs',
    'sanitaires_pmr',
    'rampes_access',
    'restaurant_pmr',
    'elevateur',
    'autre'
);

CREATE TYPE andi_amenagements AS ENUM(
    'boucle_magneto',
    'bandes_pododactiles',
    'ascenseurs_vocalises',
    'autre'
);

CREATE TYPE andi_materiel AS ENUM(
    'bureaux_postes_pmr',
    'fauteuils_ergo',
    'aides_visuel',
    'aides_auditif',
    'aides_dyslexie',
    'autre'
);

CREATE TABLE andi_accueil (
    id_internal SERIAL PRIMARY KEY,
    siren TEXT,
    siret TEXT[],

    ref_nom TEXT,
    ref_phone TEXT,
    ref_mail TEXT,

    contact_nom TEXT,
    contact_fonction TEXT,
    contact_phone TEXT,
    contact_mail TEXT,

    couverture PUBLIC.andi_couverture,
    couverture_meta TEXT,

    acces PUBLIC.andi_acces,
    acces_meta TEXT,

    accueil_pmr BOOLEAN DEFAULT NULL, -- true, false, none = unknown
    pmr PUBLIC.andi_pmr,
    pmr_meta TEXT,

    amenagement PUBLIC.andi_amenagements,
    amenagement_meta TEXT,

    materiel PUBLIC.andi_materiel,
    materiel_meta TEXT,

    plateforme BOOLEAN DEFAULT NULL, --true, false, none = unknown
    plateforme_nom TEXT,

    date_created TIMESTAMP WITH TIME ZONE DEFAULT now(),
    date_updated TIMESTAMP WITH TIME ZONE
);
