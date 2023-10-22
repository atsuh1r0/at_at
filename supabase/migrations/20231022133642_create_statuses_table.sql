DROP TABLE IF EXISTS statuses;

CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    place_id INT NOT NULL,
    working_status_id INT NOT NULL,
    date DATE NOT NULL,
    is_entered BOOLEAN DEFAULT FALSE NOT NULL,
    scheduled_time_to_leave TIME NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (place_id) REFERENCES places(id),
    FOREIGN KEY (working_status_id) REFERENCES working_statuses(id)
);
