DROP TABLE IF EXISTS generations;

CREATE TABLE generations (
  id SERIAL PRIMARY KEY,
  generation INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

INSERT INTO generations (generation) VALUES
  (1),
  (2),
  (3),
  (4);
