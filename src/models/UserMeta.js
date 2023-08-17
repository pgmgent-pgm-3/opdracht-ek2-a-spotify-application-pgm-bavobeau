import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "UserMeta",
  tableName: "usersMeta",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstname: {
      type: "varchar",
    },
    lastname: {
      type: "varchar",
    },
    username: {
      type: "varchar",
    },
    avatar: {
      type: "varchar",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-one",
      joinColumn: {
        name: "user_id"
      },
      onDelete: "CASCADE"
    }
  },
});