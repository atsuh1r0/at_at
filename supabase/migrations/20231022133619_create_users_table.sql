DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  auth_id UUID NOT NULL,
  posse_id INT,
  generation_id INT,
  name VARCHAR(255),
  icon_path TEXT DEFAULT 'default.png',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  FOREIGN KEY (auth_id) REFERENCES auth.users(id),
  FOREIGN KEY (posse_id) REFERENCES posses(id),
  FOREIGN KEY (generation_id) REFERENCES generations(id)
);
