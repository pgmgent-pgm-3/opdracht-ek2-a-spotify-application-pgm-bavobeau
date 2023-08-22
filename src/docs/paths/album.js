swagger: "2.0"
info:
  title: "Album Entity API",
  version: "1.0.0"
paths:
  "/albums":
    get:
      summary: "Retrieve a list of albums",
      responses:
        "200":
          description: "A list of albums",
          schema:
            type: "array",
            items:
              $ref: "#/definitions/Album"
  "/albums/{id}":
    get:
      summary: "Retrieve an album by ID",
      parameters:
        - name: "id",
          in: "path",
          description: "ID of the album to retrieve",
          required: true,
          type: "integer",
          format: "int64"
      responses:
        "200":
          description: "The retrieved album",
          schema:
            $ref: "#/definitions/Album"
definitions:
  Album:
    type: "object",
    properties:
      id:
        type: "integer",
        format: "int64",
        description: "The ID of the album"
      name:
        type: "string",
        description: "The name of the album"
      artist:
        $ref: "#/definitions/Artist"
  Artist:
    type: "object",
    properties:
      id:
        type: "integer",
        format: "int64",
        description: "The ID of the artist"
      name:
        type: "string",
        description: "The name of the artist"
