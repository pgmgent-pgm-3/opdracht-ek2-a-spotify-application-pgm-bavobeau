import "dotenv/config";
import DatabaseSeeder from "./DatabaseSeeder";
import entities from "../../models/index.js";
import minimist from "minimist";
import {

} from "../factories/index.js"

// new instance of db seeder
const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_NAME,
  entities
);

const { factory, amount = 1} = minimist(process.argv.slice(2));

const logResponse = (records) => {
  console.log(`${records.length} records inserted.`);
  console.log("Inserted records:", records);
};

switch (factory) {

}
// run a factory