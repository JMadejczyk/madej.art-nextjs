CREATE TABLE photos (
    photo_id INTEGER PRIMARY KEY,
    file_name TEXT,
    width INTEGER,
    height INTEGER,
    description TEXT,
    blurred TEXT,
    localization TEXT,
    position INTEGER UNIQUE
);

CREATE TABLE tags_photos (
    photo_id INTEGER,
    tag_id INTEGER,
    foreign KEY (photo_id) REFERENCES photos(photo_id),
    foreign KEY (tag_id) REFERENCES tags(tag_id)
);

CREATE TABLE tags (
    tag_id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    email TEXT,
    password TEXT
);

