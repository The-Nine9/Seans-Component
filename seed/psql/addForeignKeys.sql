ALTER TABLE listings
ADD CONSTRAINT listings_neighborhood_fkey
FOREIGN KEY (neighborhood_id)
REFERENCES neighborhoods(id);

ALTER TABLE reviews
ADD CONSTRAINT reviews_neighborhood_fkey
FOREIGN KEY (neighborhood_id)
REFERENCES neighborhoods(id);

ALTER TABLE reviews
ADD CONSTRAINT reviews_users_fkey
FOREIGN KEY (userid)
REFERENCES users(id);