var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./src/database/database.db', function (err) {
  if (err) throw err;
});

module.exports = {
  db,
};
