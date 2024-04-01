import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.sqlite");

db.setup = () => {
  db.serialize(() => {
    db.parallelize(() => {
      db.run("DROP TABLE IF EXISTS dgfile");
      db.run("DROP TABLE IF EXISTS dgfile_data");
      db.run("DROP TABLE IF EXISTS dgfile_attribute");
      db.run("DROP TABLE IF EXISTS user");
      db.run("DROP TABLE IF EXISTS session");
      db.run("DROP TABLE IF EXISTS action_report");
    });

    db.run(`CREATE TABLE dgfile (
      id INTEGER PRIMARY KEY,
      is_active INTEGER DEFAULT 1,
      creator_user_id INTEGER,
      date_created INTEGER
  )`);

    db.run(`CREATE TABLE dgfile_data (
    id INTEGER PRIMARY KEY,
    dgfile_id INTEGER,
    attribute_id INTEGER,
    value TEXT
  )`);

    db.run(`CREATE TABLE dgfile_attribute (
    id INTEGER PRIMARY KEY,
    name TEXT,
    classNumber INTEGER
  )`);

    db.run(`CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    email TEXT,
    access_level INTEGER,
    first_name TEXT,
    last_name TEXT,
    code_melli INTEGER,
    creator_id INTEGER,
    date_created TEXT,
    is_active INTEGER
  )`);

    db.run(`CREATE TABLE session (
    id INTEGER PRIMARY KEY,
    date_created TEXT,
    user_id INTEGER,
    is_active INTEGER,
    ip_address TEXT,
    device TEXT
  )`);

    db.run(`CREATE TABLE action_report (
    id INTEGER PRIMARY KEY,
    dgfile_id INTEGER,
    user_id INTEGER,
    action_type TEXT,
    description TEXT
  )`);
  });
};

export default db;
