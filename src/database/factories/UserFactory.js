import DS from "../../lib/DataSource.js";
import Factory from "./Factory.js";
import { faker } from "@faker-js/faker";

class UserFactory extends Factory {
  constructor() {
    super();
  }
  async make() {
    const email = faker.person.email();
  }
  async makeMany() {
  }
  async insert(name, randType) {   }
}

export default new UserFactory();