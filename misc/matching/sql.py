"""
Naf rule example:
    CASE company.naf
        WHEN '3220Z' THEN 3
        WHEN '3240Z' THEN 3
        WHEN '3101Z' THEN 3
        WHEN '1629Z' THEN 3
    ELSE
        CASE substring(company.naf, 0, 3)
            WHEN '31' THEN 2
            WHEN '32' THEN 2
            WHEN '16' THEN 2
            ELSE 1
        END
    END AS score

Size rule example:
    CASE company.taille
        WHEN '3-5' THEN 2
        WHEN '6-9' THEN 3
        WHEN '10-19' THEN 3
        WHEN '20-49' THEN 3
        WHEN '50-99' THEN 3
        WHEN '100-199' THEN 3
        WHEN '200-249' THEN 2
        WHEN '250-499' THEN 2
        WHEN '500-999' THEN 2
        WHEN '1000-1999' THEN 2
        WHEN '2000-4999' THEN 2
        WHEN '5000-9999' THEN 2
        ELSE 1
    END AS score
"""

MATCH_QUERY = '''
WITH comp_pos AS (
    SELECT
        id_company,
        commune,
        earth_distance(ll_to_earth(%(lat)s, %(lon)s), ll_to_earth(lat, lon))
            AS dist
    FROM
        company_position
    WHERE
        earth_box(ll_to_earth(%(lat)s, %(lon)s), %(dist)s * 1000) @> ll_to_earth(lat, lon)
    ORDER BY earth_box(ll_to_earth(%(lat)s, %(lon)s), %(dist)s * 1000) @> ll_to_earth(lat, lon) ASC
    ), crit_geo AS (
    -- crit geo ----------------------------------------------
    SELECT
        id_company,
        dist,
        4 - NTILE(3) OVER(
            ORDER BY dist ASC
        ) AS score
    FROM comp_pos
    ORDER BY dist ASC
    ), crit_size AS (
    -- crit size ---------------------------------------------
    SELECT
        comp_pos.id_company,
        {size_rules}
    FROM comp_pos
    INNER JOIN
        company ON company.id_internal = comp_pos.id_company
    ), crit_naf AS (
    -- crit naf ----------------------------------------------
    SELECT
        comp_pos.id_company,
        {naf_rules}
    FROM comp_pos
    INNER JOIN
        company ON company.id_internal = comp_pos.id_company
    ), crit_welcome AS (
    -- crit welcome ------------------------------------------
    SELECT
        comp_pos.id_company,
        CASE
            WHEN company.pmsmp_interest THEN 2
            WHEN (company.pmsmp_interest) AND (company.pmsmp_count_recent > 0) THEN 3
            ELSE 1
        END AS score
    FROM comp_pos
    INNER JOIN
        company ON company.id_internal = comp_pos.id_company
    ), crit_contact AS (
    -- crit contact ------------------------------------------
    SELECT
        comp_pos.id_company,
        CASE
            WHEN (COALESCE(cc.email_official, '') <> '')
            OR (COALESCE(cc.phone_official_1, '') <> '')
            OR (COALESCE(cc.phone_official_2, '') <> '') THEN 2
            WHEN (COALESCE(cc.email_preferred, '') <> '')
            OR (COALESCE(cc.phone_preferred_1, '') <> '')
            OR (COALESCE(cc.phone_preferred_2, '') <> '') THEN 3
            ELSE 1
        END AS score
    FROM comp_pos
    INNER JOIN
        company_contact cc ON cc.id_company = comp_pos.id_company
    )
SELECT
    c.id_internal as id,
    c.nom AS nom,
    c.siret AS siret,
    c.naf AS naf,
    c.macro_sector AS macro_sector,
    cp.label as adresse,
    array_to_string(ARRAY[
        cn.phone_preferred_1,
        cn.phone_preferred_2,
        cn.phone_official_1,
        cn.phone_official_2], ', ') AS phone,
    array_to_string(ARRAY[
        cn.email_preferred,
        cn.email_official], ', ') as email,
    naf.intitule_de_la_naf_rev_2 AS sector,
    c.taille AS taille,
    round(cr_ge.dist/1000) || ' km' AS distance,
    cp.departement AS departement,
    cp.commune as commune,
    cr_nf.score AS score_naf,
    cr_wc.score AS score_welcome,
    cr_cn.score AS score_contact,
    cr_si.score AS score_size,
    cr_ge.score AS score_geo,
    cr_ge.score * 1 +
    cr_si.score * 3 +
    cr_cn.score * 3 +
    cr_wc.score * 3 +
    cr_nf.score * 5 AS score_total
FROM
    crit_geo cr_ge
INNER JOIN
    crit_size cr_si ON cr_si.id_company = cr_ge.id_company
INNER JOIN
    crit_naf cr_nf ON cr_nf.id_company = cr_ge.id_company
INNER JOIN
    crit_welcome cr_wc ON cr_wc.id_company = cr_ge.id_company
INNER JOIN
    crit_contact cr_cn ON cr_cn.id_company = cr_ge.id_company
INNER JOIN
    company c ON c.id_internal = cr_ge.id_company
INNER JOIN
    company_position cp ON cp.id_company = cr_ge.id_company
INNER JOIN
    company_contact cn ON cn.id_company = cr_ge.id_company
LEFT JOIN
    naf ON c.naf = naf.sous_classe_a_732
ORDER BY score_total DESC
LIMIT 100

'''
