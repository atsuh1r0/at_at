DROP TABLE IF EXISTS working_statuses;

CREATE TABLE working_statuses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

INSERT INTO working_statuses (name) VALUES
  ('作業中'),
  ('外出中'),
  ('フリー');
