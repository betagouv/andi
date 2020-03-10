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
    data->'meta'->>'question' AS question_title
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

