import db from "./db.js";
import { faker } from "@faker-js/faker";

faker.seed(123);

// reset tables
db.setup();

// test db insertion
db.run("INSERT INTO dgfile (creator_user_id, date_created) values (?, ?)", [
  1,
  Date.now(),
]);
