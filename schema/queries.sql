-- Create Indices

CREATE UNIQUE INDEX index_id ON weight (entry_date);
SELECT*FROM weight;

-- Insert initial values

INSERT INTO weight (entry_date,weight) VALUES ('2023-1-3',249);
INSERT INTO weight (entry_date,weight) VALUES ('2023-1-9',242.8);
INSERT INTO weight (entry_date,weight) VALUES ('2023-1-16',243.8);
INSERT INTO weight (entry_date,weight) VALUES ('2023-1-23',245.6);
INSERT INTO weight (entry_date,weight,note) VALUES ('2023-1-28',243.0,'blah');

-- Run calculations for spc

-- INSERT INTO mr (moving_range) VALUES SELECT(1) FROM weight;

SELECT * FROM spc;
SELECT * FROM weight;

