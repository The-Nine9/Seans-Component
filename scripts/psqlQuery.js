const pgp = require('pg-promise')();

const db = pgp('postgres://localhost:5432/sdc_reviews');

const query = async () => {
  const start = process.hrtime();
  // const [neighborhood] = await db.query('SELECT n.* FROM listings l JOIN neighborhoods n ON l.neighborhood_id=n.id WHERE l.id=$1;', 1);
  // neighborhood.reviews = await db.query('SELECT * FROM reviews r JOIN users u ON r.user_id=u.id WHERE r.neighborhood_id=$1;', neighborhood.id);
  const neighborhood = await db.query(`
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
    GROUP BY n.id
  `, 100000);
  const end = process.hrtime(start);
  console.log(JSON.stringify(neighborhood, null, 2));
  console.log(`Exectution took ${end[0]}s ${end[1] / 1000000}ms`);
};

query();