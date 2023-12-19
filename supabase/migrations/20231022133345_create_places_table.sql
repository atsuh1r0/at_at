  DROP TABLE IF EXISTS places;

CREATE TABLE places (
  id SERIAL PRIMARY KEY,
  place VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

INSERT INTO places (place) VALUES
  ('ルーム'),
  ('カフェ'),
  ('屋上'),
  ('会議室');
