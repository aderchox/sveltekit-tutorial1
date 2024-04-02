import db from "./db.js";
import { faker } from "@faker-js/faker";

faker.seed(123);

// reset tables
db.setup();

const dgstrct_stmt = db.prepare(
  "INSERT INTO dgfile_structure (title, creator_user_id, date_created) values (?, ?, ?)"
);
dgstrct_stmt.run([faker.company.buzzPhrase(), 1, faker.date.past()]);
dgstrct_stmt.run([faker.company.buzzPhrase(), 1, faker.date.past()]);

const dgf_stmt = db.prepare(
  "INSERT INTO dgfile (creator_user_id, structure_id, date_created) values (?, ?, ?)"
);
dgf_stmt.run([1, 1, faker.date.past()]);
dgf_stmt.run([2, 1, faker.date.past()]);
dgf_stmt.run([2, 2, faker.date.past()]);

const dgattr_stmt = db.prepare(
  "INSERT INTO dgfile_attribute (name, structure_id, classNumber) VALUES (?, ?, ?)"
);
dgattr_stmt.run(["dgfile_uid", 1, 1]);
dgattr_stmt.run(["first_name", 1, 1]);
dgattr_stmt.run(["last_name", 1, 1]);
dgattr_stmt.run(["code_melli", 1, 1]);
dgattr_stmt.run(["date_of_birth", 1, 1]);
dgattr_stmt.run(["engaged", 1, 1]);
dgattr_stmt.run(["address", 1, 1]);
dgattr_stmt.run(["organizational_position", 1, 2]);
dgattr_stmt.run(["position_date_start", 1, 2]);
dgattr_stmt.run(["edu_certificates", 1, 3]);
dgattr_stmt.run(["other_certificates", 1, 3]);

const dgdata_stmt = db.prepare(
  "INSERT INTO dgfile_data (dgfile_id, attribute_id, value) VALUES (?, ?, ?)"
);
dgdata_stmt.run([1, 1, faker.string.nanoid(20)]);
dgdata_stmt.run([1, 2, faker.person.firstName()]);
dgdata_stmt.run([1, 3, faker.person.lastName()]);
dgdata_stmt.run([1, 4, faker.number.int({ min: 100000000, max: 200000000 })]);
dgdata_stmt.run([1, 5, faker.date.birthdate()]);
dgdata_stmt.run([1, 6, faker.number.binary()]);
dgdata_stmt.run([1, 7, faker.location.streetAddress(true)]);
dgdata_stmt.run([1, 8, faker.person.jobType()]);
dgdata_stmt.run([1, 9, faker.date.past()]);
dgdata_stmt.run([1, 10, faker.word.words(3).split(" ")]);
dgdata_stmt.run([1, 11, faker.word.words(7).split(" ")]);

dgdata_stmt.run([2, 1, faker.person.firstName()]);
dgdata_stmt.run([2, 2, faker.person.lastName()]);
dgdata_stmt.run([2, 3, faker.internet.exampleEmail()]);
dgdata_stmt.run([2, 4, faker.phone.number()]);
dgdata_stmt.run([2, 5, faker.number.int(100)]);

dgdata_stmt.run([3, 1, faker.person.firstName()]);
dgdata_stmt.run([3, 2, faker.person.lastName()]);
dgdata_stmt.run([3, 3, faker.internet.exampleEmail()]);
dgdata_stmt.run([3, 4, faker.phone.number()]);
dgdata_stmt.run([3, 5, faker.number.int(100)]);

const user_stmt = db.prepare(
  "INSERT INTO user (username, password, email, access_level, first_name, last_name, code_melli, creator_id, date_created, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
);
// Default main (root) admin (with access to everything)
user_stmt.run([
  process.env.ADMIN_USERNAME,
  "[hash from dotenv]",
  process.env.ADMIN_EMAIL,
  2,
  "admin",
  "admin",
  "1234567890",
  1,
  Date.now(),
  1,
]);
// Sub-admin user (read & write, without access to user management and reports)
user_stmt.run([
  "testuser",
  "[hash]",
  "testuser@example.com",
  1,
  "testuser",
  "testuser",
  "2345678901",
  1,
  Date.now(),
  1,
]);
// Read-only user:
user_stmt.run([
  "test_ro_user",
  "[hash]",
  "test_ro_user@example.com",
  0,
  "test_ro_user",
  "test_ro_user",
  "3456789012",
  1,
  Date.now(),
  1,
]);
