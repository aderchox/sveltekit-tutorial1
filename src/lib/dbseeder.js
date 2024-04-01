import db from "./db.js";
import { faker } from "@faker-js/faker";

faker.seed(123);

// reset tables
db.setup();

// TABLES:
// dgfile
// dgfile_structure
// dgfile_attribute
// dgfile_data
// user
// session
// action_report

db.run(
  "INSERT INTO dgfile_structure (title, creator_user_id, date_created) values (?, ?, ?)",
  [faker.system.fileName({ extensionCount: 0 }), 1, faker.date.past()]
);

for (let i = 0; i < 10; i++) {
  db.run(
    "INSERT INTO dgfile (creator_user_id, structure_id, date_created) values (?, ?, ?)",
    [1, 1, faker.date.past()]
  );
}

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
dgattr_stmt.run(["is_position_active", 1, 2]);
dgattr_stmt.run(["position_date_start", 1, 2]);
dgattr_stmt.run(["position_date_end", 1, 2]);
dgattr_stmt.run(["edu_certificates", 1, 3]);
dgattr_stmt.run(["other_certificates", 1, 3]);

const dgdata_stmt = db.prepare(
  "INSERT INTO dgfile_data (dgfile_id, attribute_id, value) VALUES (?, ?, ?)"
);
dgdata_stmt.run([1, 1, faker.string.nanoid(20)]);
dgdata_stmt.run([2, 1, faker.string.nanoid(20)]);
dgdata_stmt.run([3, 1, faker.string.nanoid(20)]);

dgdata_stmt.run([1, 2, faker.person.firstName()]);
dgdata_stmt.run([2, 2, faker.person.firstName()]);
dgdata_stmt.run([3, 2, faker.person.firstName()]);

dgdata_stmt.run([1, 3, faker.person.lastName()]);
dgdata_stmt.run([2, 3, faker.person.lastName()]);
dgdata_stmt.run([3, 3, faker.person.lastName()]);
