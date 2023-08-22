import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    meta: {
      target: "UserMeta",
      type: "one-to-one",
      inverseSide: "user",
      cascade: true
    },
    role: {
      target: "Role",
      type: "many-to-one",
      inverseSide: "users",
      joinColumn: {
        name: "role_id"
      },
      onDelete: "CASCADE"
    },
    playlists: {
      target: "Playlist",
      type: "one-to-many",
      inverseSide: "user",
    }
  },
});