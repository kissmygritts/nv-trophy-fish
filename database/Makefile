DATA = /Users/mitchellgritts/Documents/projects/ndow/fish-nv/data
LOADOBJS = scripts/load-01-fishable-waters.sql \
					 scripts/load-02-tf-wrangle-species.sql \
					 scripts/load-03-tf-wrangle-entries.sql \
					 scripts/load-04-tf-entries.sql
# change URI for remote database
URI = fish-nv

utfify: $(DATA)/trophy-fish-data.csv
	-iconv -sc -t utf8 ../data/trophy-fish-data.csv > ../data/tf-utf8.csv

build: scripts/build.sql
	@psql $(URI) -a -f $<

extract: build $(DATA)/tf-utf8.csv
	psql $(URI) -c "\copy etl.species from '$(DATA)/species.csv' with csv"
	psql $(URI) -c "\copy etl.species_water_joiner from '$(DATA)/species-water-lkp.csv' with csv header"
	psql $(URI) -c "\copy etl.fish_entries from '$(DATA)/tf-utf8.csv' with csv header"
	# the following line must be changed when building the remote database
	ogr2ogr -f PostgreSQL "PG:dbname=$(URI)" -lco SCHEMA=etl $(DATA)/fishable-waters.gpkg

loadscript.sql: $(LOADOBJS)
	cat $(LOADOBJS) > $@

load: loadscript.sql extract
	@psql $(URI) --single-transaction -f $<


clean: 
	@psql $(URI) -c "drop schema if exists etl cascade"

drop:
	dropdb $(URI)
	createdb $(URI)