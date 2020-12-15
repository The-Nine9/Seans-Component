const faker = require('faker');
const fs = require('fs');
const path = require('path');

const neighborhoodStatsGenerator = function() {
  return {
    name: faker.lorem.word(),
    dog_friendly: Math.random().toFixed(2),
    grocery_stores: Math.random().toFixed(2),
    neighbors_friendly: Math.random().toFixed(2),
    parking_easy: Math.random().toFixed(2),
    yard: Math.random().toFixed(2),
    community_events: Math.random().toFixed(2),
    sidewalks: Math.random().toFixed(2),
    walk_night: Math.random().toFixed(2),
    five_years: Math.random().toFixed(2),
    kids_outside: Math.random().toFixed(2),
    car: Math.random().toFixed(2),
    restaurants: Math.random().toFixed(2),
    streets: Math.random().toFixed(2),
    holiday: Math.random().toFixed(2),
    quiet: Math.random().toFixed(2),
    wildlife: Math.random().toFixed(2),
  };
};

const writeLine = (stats) => `${stats.name},${stats.dog_friendly},${stats.grocery_stores},${stats.neighbors_friendly},${stats.parking_easy},${stats.yard},${stats.community_events},${stats.sidewalks},${stats.walk_night},${stats.five_years},${stats.kids_outside},${stats.car},${stats.restaurants},${stats.streets},${stats.holiday},${stats.quiet},${stats.wildlife}\n`;

function writeTenMillionTimes(writer, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      const data = writeLine(neighborhoodStatsGenerator());
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

const writeFile = fs.createWriteStream(path.join(__dirname, '../csv/neighborhoods.csv'));
const line1 = 'name,dog_friendly,grocery_stores,neighbors_friendly,parking_easy,yard,community_events,sidewalks,walk_night,five_years,kids_outside,car,restaurants,streets,holiday,quiet,wildlife\n';
writeFile.write(line1);

writeTenMillionTimes(writeFile, 'utf-8', () => {
  writeFile.end();
});