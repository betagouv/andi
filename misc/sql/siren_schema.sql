DROP INDEX IF EXISTS siren_siren;
DROP TABLE IF EXISTS "siren_names";
CREATE TABLE siren_names (
    siren CHARACTER VARYING(9) PRIMARY KEY,
    naf CHARACTER VARYING(5),
    cat_juridique CHARACTER VARYING(4),
    categorie CHARACTER VARYING(6),
    caractere_employeur BOOLEAN,
    personne_physique BOOLEAN,
    sociale_solidaire BOOLEAN,
    nom TEXT,
    nom_moral TEXT,
    nom_physique TEXT,
    denominations TEXT[]
);
CREATE INDEX siren_siren ON public.siren_names USING HASH (siren);
