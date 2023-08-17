import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Playlist",
  tableName: "playlists",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    }
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-one",
      inverseSide: "playlist",
      joinColumn: {
        name: "user_id"
      },
      onDelete: "CASCADE"
    },
    songs: {
      target: "Playlist",
      type: "many-to-many",
      joinTable: {
        name: "playlists_songs"
      },
      cascade: true
    }
  },
});