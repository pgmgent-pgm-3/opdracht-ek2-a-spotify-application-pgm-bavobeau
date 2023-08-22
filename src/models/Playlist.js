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
      type: "many-to-one",
      inverseSide: "playlists",
      joinColumn: {
        name: "user_id"
      },
      cascade: true,
    },
    songs: {
      target: "Song",
      type: "many-to-many",
      joinTable: {
        name: "playlists_songs",
      },
    },
  },
});