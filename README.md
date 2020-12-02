# Project Name

> This projects features a mock version of Turila's neighborhood reviews. Users can see neighborhood stats and filter reviews based on a variety of categories.


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Set-up

1. `npm install`
2. `npm run webpack` to run webpack
3. `npm start` to run the express-server

## Requirements

- Node 14.15.0

## CRUD Operations

- app.post('*/:id/neighborhood_stats', controller.postStat);
- app.post('*/:id/neighborhood_reviews', controller.postReview);
- app.get('*/:id/neighborhood_stats', controller.getAllStats);
- app.get('*/:id/neighborhood_reviews', controller.getAllReviews);
- app.put('*/:id/neighborhood_stats', controller.putStat);
- app.put('*/:id/neighborhood_reviews', controller.putReview);
- app.delete('*/:id/neighborhood_stats', controller.deleteStat);
- app.delete('*/:id/neighborhood_reviews', controller.deleteReview);


