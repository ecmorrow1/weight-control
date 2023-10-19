-- DROP TABLES

DROP TABLE weight;
DROP TABLE spc;
DROP TABLE mr;

-- CREATE TABLES

CREATE TABLE weight (
	entry_date date,
	weight DEC(10,1),
	note varchar(255)
);

CREATE TABLE spc (
	ucl DEC(10,1),
	lcl DEC(10,1),
	center DEC(10,1),
	average_mr DEC(10,3)
);

CREATE TABLE mr (moving_range DEC(10,1));

