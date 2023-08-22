import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Song",
  tableName: "songs",
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
    artist: {
      target: "Artist",
      type: "many-to-one",
      inverseSide: "songs",
      joinColumn: {
        name: "artist_id"
      },
      onDelete: "CASCADE"
    },
    playlists: {
      target: "Playlist",
      type: "many-to-many",
      joinTable: {
        name: "playlists_songs",
      },
      cascade: true,
    },
  },
});