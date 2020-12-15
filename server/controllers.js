const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'sdc_reviews',
  max: 40
};

const db = pgp(cn);

const getQuery = async (id) => {
  return (await db.query(`
    SELECT n.*,
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'review_date', r.review_date,
        'full_text', r.full_text,
        'likes', r.likes,
        'community', r.community,
        'commute', r.commute,
        'name', u.name,
        'user_type', u.user_type,
        'dog_owner', u.dog_owner,
        'parent', u.parent
      )
    ) as reviews
    FROM listings l
    JOIN neighborhoods n ON l.neighborhood_id=n.id
    JOIN reviews r ON r.neighborhood_id=n.id
    JOIN users u ON u.id=r.user_id
    WHERE l.id=$1
    GROUP BY n.id;
  `, id))[0];
};

const postQuery = async (id) => {
  return (await db.query(`
    INSERT INTO reviews (review_date, full_text, likes, community, commute, user_id, neighborhood_id) VALUES (date, text, 0, true, true, $1, 1);
  `, id));
};

module.exports.getNeighborhoodData = async (req, res) => {
  const id = req.params.id;
  const data = await getQuery(id);
  // console.log(data);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(data);
};

module.exports.postReview = async (req, res) => {
  const id = req.params.id;
  const data = await postQuery;
};