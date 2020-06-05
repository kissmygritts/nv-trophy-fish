DROP TABLE IF EXISTS fish_entries CASCADE;
DROP TABLE IF EXISTS species_water_joiner CASCADE;
DROP TABLE IF EXISTS fishable_waters CASCADE;
DROP TABLE IF EXISTS species CASCADE;

DROP SCHEMA IF EXISTS etl CASCADE;
DROP EXTENSION IF EXISTS postgis CASCADE;
DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;