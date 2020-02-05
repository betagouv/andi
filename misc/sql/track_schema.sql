DROP INDEX IF EXISTS idx_trackers_sid;
DROP INDEX IF EXISTS idx_trackers_created;
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
