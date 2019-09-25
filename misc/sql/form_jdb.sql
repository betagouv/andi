CREATE TABLE "form_jdb_psh" (
    id_internal SERIAL PRIMARY KEY,
    id_andi VARCHAR(16),
    date_day TIMESTAMP WITH TIME ZONE,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    activites_semaines TEXT,
    utilisation_outils_it BOOLEAN,
    evenements_plu TEXT,
    evenements_deplu TEXT
);
CREATE INDEX formJdbPsh_IdAndi ON "form_jdb_psh" (id_andi);

CREATE TABLE "form_jdb_entreprise" (
    id_internal SERIAL PRIMARY KEY,
    id_andi VARCHAR(16),
    date_day TIMESTAMP WITH TIME ZONE,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    utilisation_outils_it BOOLEAN,
    faits TEXT,
    difficultes TEXT
);
CREATE INDEX formJdbEntreprise_IdAndi ON "form_jdb_entreprise" (id_andi);
