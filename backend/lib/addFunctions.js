const arePhotosInDb = (db, photos) => {
  return new Promise((resolve, reject) => {
    const photoFileNames = photos.map((photo) => photo.filename);

    const placeholders = photoFileNames.map(() => "?").join(",");
    let sql = `SELECT distinct file_name FROM photos WHERE file_name IN (${placeholders})`;

    db.all(sql, photoFileNames, (err, rows) => {
      if (err) {
        reject(err);
      }
      if (rows.length === 0) {
        resolve(false);
      } else {
        let answer = rows.map((row) => row.file_name);
        resolve(answer);
      }
    });
  });
};

////////////////////////////////////////////////////////////////

const addTags = (db, photos) => {
  photos.forEach((photo) => {
    let { filename, tags } = photo;
    tags = tags.replace(/\s/g, "");
    tags = tags.split(",");
    tags.forEach((tag) => {
      let sql = `select tag_id from tags where name = ?`;
      db.get(sql, [tag], (err, row) => {
        if (err) {
          throw err;
        }
        if (row) {
          let sql2 = `select * from tags_photos where tag_id = ? and photo_id = (select photo_id from photos where file_name = ?)`;
          db.get(sql2, [row["tag_id"], filename], (err, row2) => {
            if (err) {
              throw err;
            }
            if (!row2) {
              let sql3 = `INSERT INTO tags_photos (photo_id, tag_id) VALUES ((select photo_id from photos where file_name = ?), ?)`;
              db.run(sql3, [filename, row["tag_id"]], (err) => {
                if (err) {
                  throw err;
                }
              });
            }
          });
        }
      });
    });
  });
};

export { arePhotosInDb, addTags };
