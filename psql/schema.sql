DROP DATABASE IF EXISTS neighborhoodReviews;
CREATE DATABASE neighborhoodReviews;

CREATE TABLE neighborhoods (
  id INTEGER SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dog_friendly DECIMAL(3, 2) NOT NULL,
  grocery_stores DECIMAL(3, 2) NOT NULL,
  neighbors_friendly DECIMAL(3, 2) NOT NULL,
  parking_easy DECIMAL(3, 2) NOT NULL,
  yard DECIMAL(3, 2) NOT NULL,
  community_events DECIMAL(3, 2) NOT NULL,
  sidewalks DECIMAL(3, 2) NOT NULL,
  walk_night DECIMAL(3, 2) NOT NULL,
  five_years DECIMAL(3, 2) NOT NULL,
  kids_outside DECIMAL(3, 2) NOT NULL,
  car DECIMAL(3, 2) NOT NULL,
  restaurants DECIMAL(3, 2) NOT NULL,
  streets DECIMAL(3, 2) NOT NULL,
  holiday DECIMAL(3, 2) NOT NULL,
  quiet DECIMAL(3, 2) NOT NULL,
  wildlife DECIMAL(3, 2) NOT NULL
);

CREATE TABLE listings (
  id INTEGER SERIAL PRIMARY KEY,
  neighborhood_id INTEGER NOT NULL,
  -- FOREIGN KEY (neighborhood_id)
  --   REFERENCES neighborhoods(id)
);


CREATE TABLE users (
  id INTEGER SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  user_type VARCHAR(30) NOT NULL,
  dog_owner BOOLEAN NOT NULL,
  parent BOOLEAN NOT NULL
);

CREATE TABLE reviews (
  id INTEGER SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL,
  neighborhood_id INTEGER NOT NULL,
  review_date VARCHAR(255) NOT NULL,
  full_text TEXT NOT NULL,
  likes INTEGER NOT NULL,
  community BOOLEAN NOT NULL,
  commute BOOLEAN NOT NULL,

  -- FOREIGN KEY (neighborhood_id)
  --   REFERENCES neighborhoods(id),

  -- FOREIGN KEY (userid)
  --   REFERENCES users(id)
);