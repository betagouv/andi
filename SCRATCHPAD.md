## Notes and misc

Marly-la-ville GPS: 

https://dba.stackexchange.com/questions/158349/how-can-i-speed-up-my-query-on-geo-location-processes

WITH comp_pos AS (
    SELECT
        id_company,
        commune,
        earth_distance(ll_to_earth(49.0817, 2.5003), ll_to_earth(lat, lon)) AS dist
    FROM
        company_position
    WHERE
        earth_box(ll_to_earth(49.0817, 2.5003), 5000) @> ll_to_earth(lat, lon)
        -- earth_distance(ll_to_earth(49.0817, 2.5003), ll_to_earth(lat, lon)) < 5000
    ORDER BY earth_box(ll_to_earth(49.0817, 2.5003), 5000) @> ll_to_earth(lat, lon) ASC
    limit 5000
    ), crit_geo AS (
    SELECT
        id_company,
        dist,
        4 - NTILE(3) OVER(
            ORDER BY dist ASC
        ) as score
    FROM
        comp_pos
    ORDER BY dist ASC
    )
SELECT
    c.nom,
    c.enseigne,
    c.siren,
    c.naf,
    c.macro_sector,
    cp.commune,
    cp.id_company,
    cg.dist,
    cg.score
FROM
    crit_geo cg
INNER JOIN
    company c ON c.id_internal = cg.id_company
INNER JOIN
    company_position cp ON cp.id_internal = cg.id_company
WHERE
    substring(c.naf, 0, 3) IN ('02', '81')
ORDER BY cg.score DESC, cg.dist ASC;

--------

COPY (

WITH comp_pos AS (
    SELECT
        id_company,
        commune,
        earth_distance(ll_to_earth(49.0817, 2.5003), ll_to_earth(lat, lon)) AS dist
    FROM
        company_position
    WHERE
        earth_box(ll_to_earth(49.0817, 2.5003), 10000) @> ll_to_earth(lat, lon)
        -- slower, circle-shaped variant:
        -- earth_distance(ll_to_earth(49.0817, 2.5003), ll_to_earth(lat, lon)) < 5000
    ORDER BY earth_box(ll_to_earth(49.0817, 2.5003), 10000) @> ll_to_earth(lat, lon) ASC
    limit 10000
    ), crit_geo AS (
    SELECT
        id_company,
        dist,
        4 - NTILE(3) OVER(
            ORDER BY dist ASC
        ) AS score
    FROM comp_pos
    ORDER BY dist ASC
    ), crit_size AS (
    SELECT 
        comp_pos.id_company,
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
    FROM comp_pos
    INNER JOIN
        company ON company.id_internal = comp_pos.id_company
    ), crit_naf AS (
    SELECT
        comp_pos.id_company,
        CASE company.naf
            WHEN '8130Z' THEN 3
            WHEN '9104Z' THEN 3
            WHEN '5530Z' THEN 2
            WHEN '4312A' THEN 2
            WHEN '9321Z' THEN 2
            ELSE
                CASE substring(company.naf, 0, 3)
                    WHEN '02' THEN 3
                    -- WHEN '81' THEN 2
                    WHEN '01' THEN 2
                    WHEN '03' THEN 2
                    ELSE 1
                END 
        END AS score
    FROM comp_pos
    INNER JOIN
        company ON company.id_internal = comp_pos.id_company
    )
SELECT
    c.nom,
    c.macro_sector,
    c.naf,
    naf.intitule_de_la_naf_rev_2 as sector,
    c.taille,
    round(cg.dist/1000) || ' km' AS distance,
    cg.score AS score_geo,
    cs.score AS score_size,
    cn.score AS score_naf,
    cg.score * 1 + cs.score * 2 + cn.score * 3 AS score_total
FROM
    crit_geo cg
INNER JOIN
    crit_size cs ON cs.id_company = cg.id_company
INNER JOIN
    crit_naf cn ON cn.id_company = cg.id_company
INNER JOIN
    company c ON c.id_internal = cg.id_company
INNER JOIN
    company_position cp ON cp.id_internal = cg.id_company
LEFT JOIN
    naf ON c.naf = naf.sous_classe_a_732
ORDER BY score_total DESC
-- ORDER BY cg.score DESC, cn.score DESC, cs.score DESC;

) TO '/tmp/test_out.csv' With CSV DELIMITER ',';
