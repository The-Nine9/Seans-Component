const fs = require('fs');
const path = require('path');

const writeLine = () => `${Math.floor(Math.random() * 1000000)}\n`;

function writeTenMillionTimes(writer, encoding, callback) {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      const data = writeLine();
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

const writeFile = fs.createWriteStream(path.join(__dirname, '../csv/listings.csv'));
const line1 = 'neighborhood_id\n';
writeFile.write(line1);

writeTenMillionTimes(writeFile, 'utf-8', () => {
  writeFile.end();
});