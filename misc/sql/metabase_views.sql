-- views for metabase dashboards

-- landing page view, for metabase stats
-- see latest meta: select data from trackers where data->>'page' = 'landing-page' order by date_created desc limit 100;
DROP VIEW IF EXISTS mb_landing_page_mvp;
CREATE VIEW mb_landing_page_mvp AS
SELECT
    version,
    date_created,
    data->'server_context'->>'client_ip' AS ip_address,
    data->'meta'->>'descriptor' AS descriptor,
    session_id,
    send_order,
    data->>'page' AS page,
    data->>'action' AS action,
    -- questions
    data->'meta'->>'visible' AS question_visible,
    data->'meta'->>'question' AS question_title,
    -- links
    data->'meta'->>'link' AS url,
    data->'meta'->>'type' AS link_type
FROM
    TRACKERS
WHERE
    data->>'page' = 'landing-page'
AND
    data->'meta'->>'dev' = 'false'
;

-- Service, for metabase stats
DROP VIEW IF EXISTS mb_service_mvp;
CREATE VIEW mb_service_mvp AS
SELECT
    version,
    date_created,
    data->'server_context'->>'client_ip' AS ip_address,
    data->'meta'->>'descriptor' AS descriptor,
    session_id,
    send_order,
    data->>'page' AS page,
    data->>'action' AS action,
    (data->>'page') || ':' || (data->>'action') AS pg_act,
    -- links
    data->'meta'->>'link' AS url,
    -- questions
    data->'meta'->>'id' AS id,
    data->'meta'->>'question' AS question,
    data->'meta'->>'question_id' AS q_id,
    data->'meta'->>'response_id' AS r_id,
    -- bilan
    data->'meta'->>'iae' AS bil_iae,
    data->'meta'->>'esat' AS bil_esat,
    data->'meta'->>'rqth' AS bil_rqth,
    data->'meta'->>'prive' AS bil_prive,
    data->'meta'->>'publique' AS bil_publique,
    data->'meta'->>'maladie' AS bil_maladie,
    data->'meta'->>'job_search' AS bil_jobsearch,
    -- matching
    data->'meta'->>'metier' AS mc_metier,
    data->'meta'->>'addresse' AS mc_addresse,
    data->'meta'->>'distance' AS mc_dist,
    -- matching results
    data->'meta'->>'results' AS mc_results,
    data->'meta'->>'order' AS url_order,
    data->'meta'->>'siret' AS url_siret
FROM
    TRACKERS
WHERE
    data->>'page' IN ('pasapas', 'questionnaire-matching','matching', 'footer', 'header')
AND
    data->'meta'->>'dev' = 'false'
;
