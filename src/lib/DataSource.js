import { DataSource } from "typeorm";

// import van de navigation item entity


// steek die in een array
const entities = [];

const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: entities, // vertel aan de datasource welke entities die moet gebruiken
});

export default DS;