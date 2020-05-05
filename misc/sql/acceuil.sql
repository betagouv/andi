-- DROP STATEMENTS
DROP TYPE IF EXISTS andi_couverture
DROP TYPE IF EXISTS andi_acces
DROP TYPE IF EXISTS andi_pmr
DROP TYPE IF EXISTS andi_amenagements
DROP TYPE IF EXISTS andi_materiel
DROP TABLE IF EXISTS andi_acceuil
DROP TABLE IF EXISTS andi_contact

-- END OF DROP STATEMENTS

CREATE TYPE andi_couverture (
    'un',
    'tous',
    'tous_departement',
    'tous_region',
    'specifique_dep',
    'specifique_regions',
    'autre'
)

CREATE TYPE andi_acces (
    'train',
    'rer',
    'metro',
    'bus',
    'tram',
    'parking_pmr',
    'autre'
)

CREATE TYPE andi_pmr (
    'plain_pied',
    'portes_automatiques',
    'portes_larges',
    'ascenseurs',
    'sanitaires_pmr',
    'rampes_access',
    'restaurant_pmr',
    'elevateur',
    'autre'
)

CREATE TYPE andi_amenagements (
    'boucle_magneto',
    'bandes_pododactiles',
    'ascenseurs_vocalises',
    'autre'
)

CREATE TYPE andi_materiel (
    'bureaux_postes_pmr',
    'fauteuils_ergo',
    'aides_visuel',
    'aides_auditif',
    'aides_dyslexie',
    'autre'
)

CREATE TABLE andi_accueil (
    id_internal SERIAL PRIMARY KEY,
    siren TEXT,
    siret TEXT[],
    referent_id INT,
    contact_id INT,

    couverture PUBLIC.andi_couverture,
    couverture_meta JSONB,

    acces PUBLIC.andi_acces,
    acces_meta JSONB,

    accueil_pmr BOOLEAN DEFAULT NULL, -- true, false, none = unknown
    pmr PUBLIC.andi_pmr,
    pmr_meta JSONB,

    amenagement PUBLIC.andi_amenagements,
    amenagement_meta JSONB,

    materiel PUBLIC.andi_materiel,
    materiel_meta JSONB,

    plateforme BOOLEAN DEFAULT NULL, --true, false, none = unknown
    plateforme_meta JSONB
)

CREATE TABLE andi_contact (
    id_internal SERIAL PRIMARY KEY,
    name,
    function,
    telephone,
    mobile,
    email
)

