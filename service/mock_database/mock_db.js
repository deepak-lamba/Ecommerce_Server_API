const fs = require("fs");

const db_path = "service/mock_database/mock.db.json"

var dbLoad = exports.load = async function(tag=null) {
  let db = await fs.promises.readFile(db_path, "utf-8");
  db = JSON.parse(db);
  return tag === null ? db : tag in db ? db[tag]: null;
}

exports.save = function(tag, data, mode) {
  dbLoad()
  .then((db) => {
    if (mode === 'a') {
      if (!(tag in db)) {
        db[tag] = []   
      }
      if (Array.isArray(data)) {
        db[tag].concat(data)
      } else {
        db[tag].push(data)
      }
    } else {
      db[tag] = data;
    }
    return fs.promises.writeFile(db_path, JSON.stringify(db, null, "\t"));
  });
}

