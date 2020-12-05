const faker = require('faker');
const fs = require('fs');

const num_users = 1000;
const num_neighborhoods = 100;

const reviewStats = () => {
  return({
    review_date: faker.date.past().toJSON().slice(0, 10),
    full_text: faker.lorem.paragraph(),
    likes: Math.floor(Math.random() * 150) + 1,
    community: Math.random() < 0.5,
    commute: Math.random() < 0.5,
    user_id: Math.floor(Math.random() * num_users) + 1,
    neighborhood_id: Math.floor(Math.random() * num_neighborhoods) + 1
  });
};

const writeLine = (stats) => `${stats.review_date},${stats.full_text},${stats.likes},${stats.community},${stats.commute},${stats.user_id},${stats.neighborhood_id}\n`;

function writeTenMillionTimes(writer, encoding, callback) {
  let i = 1000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      const data = writeLine(reviewStats());
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
};

const writeFile = fs.createWriteStream('../csv/listings.csv');
const line1 = 'review_date,full_text,likes,community,commute,user_id,neighborhood_id\n';
writeFile.write(line1);

writeTenMillionTimes(writeFile, 'utf-8', () => {
  writeFile.end();
});