import { DataSource } from "typeorm";

// import all entities
import { entities } from "../models";


const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: entities, // vertel aan de datasource welke entities die moet gebruiken
});

export default DS;