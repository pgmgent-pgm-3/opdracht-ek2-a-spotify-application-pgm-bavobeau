import DS from "../../lib/DataSource.js";
import Factory from "./Factory.js";

class UserFactory extends Factory {
  constructor() {
    super();
    this.types = [];
  }
  async make() {
  }
  async makeMany() {
  }
  async insert(name, randType) {   }
}

export default new UserFactory();