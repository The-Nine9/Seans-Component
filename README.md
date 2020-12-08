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

## Server API

### Get Neighborhood info
  * GET `/api/listing/:id/neighborhood/`
  * GET `/api/neighborhood/:id/`

**Path Parameters:**
  * `id` listing id
  * `id` neighborhood id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "name": "String",
      "dogFriendly": "Number",
      "groceryStores": "Number",
      "neighborsFriendly": "Number",
      "parkingEasy": "Number",
      "yard": "Number",
      "communityEvents": "Number",
      "sidewalks": "Number",
      "walkNight": "Number",
      "fiveYears": "Number",
      "kidsOutside": "Number",
      "car": "Number",
      "restaurants": "Number",
      "streets": "Number",
      "holiday": "Number",
      "quiet": "Number",
      "wildlife": "Number",
      "reviews": "Array"
    }
```

### Add Neighborhood
  * POST `/api/neighborhood/:id/`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "name": "String",
      "dogFriendly": "Number",
      "groceryStores": "Number",
      "neighborsFriendly": "Number",
      "parkingEasy": "Number",
      "yard": "Number",
      "communityEvents": "Number",
      "sidewalks": "Number",
      "walkNight": "Number",
      "fiveYears": "Number",
      "kidsOutside": "Number",
      "car": "Number",
      "restaurants": "Number",
      "streets": "Number",
      "holiday": "Number",
      "quiet": "Number",
      "wildlife": "Number",
      "reviews": "Array"
    }
```


### Update Neighborhood info
  * PATCH `/api/neighborhood/:id/`

**Path Parameters:**
  * `id` neighborhood id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "name": "String",
      "dogFriendly": "Number",
      "groceryStores": "Number",
      "neighborsFriendly": "Number",
      "parkingEasy": "Number",
      "yard": "Number",
      "communityEvents": "Number",
      "sidewalks": "Number",
      "walkNight": "Number",
      "fiveYears": "Number",
      "kidsOutside": "Number",
      "car": "Number",
      "restaurants": "Number",
      "streets": "Number",
      "holiday": "Number",
      "quiet": "Number",
      "wildlife": "Number",
      "reviews": "Array"
    }
```

### Delete Neighborhood
  * DELETE `/api/neighborhood/:id/`

**Path Parameters:**
  * `id` neighborhood id

**Success Status Code:** `204`