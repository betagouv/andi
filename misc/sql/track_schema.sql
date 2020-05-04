DROP INDEX IF EXISTS idx_trackers_sid;
DROP INDEX IF EXISTS idx_trackers_created;
DROP INDEX IF EXISTS idx_trackers_dev;
DROP INDEX IF EXISTS idx_trackers_page;
DROP INDEX IF EXISTS idx_trackers_action;
DROP INDEX IF EXISTS idx_trackers_question;
DROP INDEX IF EXISTS idx_trackers_visible;
DROP TABLE IF EXISTS "trackers";

CREATE TABLE trackers (
    id_internal SERIAL PRIMARY KEY,
    version INT NOT NULL,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT now(),
    session_id UUID NOT NULL,
    send_order INT,
    data JSONB
);
CREATE INDEX idx_trackers_sid ON trackers USING BTREE (session_id);
CREATE INDEX idx_trackers_created ON trackers USING BTREE (date_created);
-- Indices for generic metabase views
CREATE INDEX idx_trackers_dev ON trackers USING BTREE ((data->'meta'->>'dev')) WHERE data->'meta'->>'dev' = 'false';
CREATE INDEX idx_trackers_page ON trackers USING BTREE ((data->>'page')) WHERE (data->'page') IS NOT NULL;
CREATE INDEX idx_trackers_action ON trackers USING BTREE ((data->>'action')) WHERE (data->'action') IS NOT NULL;

-- Indices for specific metabase queries
CREATE INDEX idx_trackers_question ON trackers USING BTREE ((data->'meta'->>'question')) WHERE (data->'meta'->'question') IS NOT NULL;
CREATE INDEX idx_trackers_visible ON trackers USING BTREE ((data->'meta'->>'visible')) WHERE (data->'meta'->'visible') IS NOT NULL;

