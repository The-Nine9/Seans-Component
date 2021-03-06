const faker = require('faker');
const fs = require('fs');
const path = require('path');

const writeLine = () => `${faker.lorem.word() + ' ' + faker.lorem.word()},Resident,${Math.random() < 0.5},${Math.random() < 0.5}\n`;

function writeTenMillionTimes(writer, encoding, callback) {
  let i = 10000;
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

const writeFile = fs.createWriteStream(path.join(__dirname, '../csv/users.csv'));
const line1 = 'name,user_type,dog_owner,parent\n';
writeFile.write(line1);

writeTenMillionTimes(writeFile, 'utf-8', () => {
  writeFile.end();
});