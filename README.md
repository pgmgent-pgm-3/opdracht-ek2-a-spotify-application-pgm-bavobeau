# Spotify Application bij Bavo Beaumon

## Functionalities

The project is divided into two main parts: an API and a web application. Our goal is to create a platform that lets users manage music-related data with specific roles: Admin, Editor, and Reader. Here's a breakdown of what each role can do:

- **Reader**: This role is all about exploration. Readers can view songs, artists, albums, and playlists.

- **Editor**: Editors have more control. They can do everything a Reader can, plus they can modify songs, artists, and playlists.

- **Admin**: The Admin role is the most powerful. Admins can perform all the tasks of an Editor and take things further by creating and deleting songs, artists, albums, playlists.

## Web Application

### Authentication

When you're not logged in, the application presents you with a login screen. Here's what you can do:

- Log in using your email and password.
- The form fields are validated, and you get instant feedback.
- You also have the option to register as a new user.

### Registration

Creating an account is straightforward:

- You sign up with your email and password.
- Your password is securely encrypted before storage.
- Just like with the login, form fields are validated, and you get feedback.
- Upon registration, you're assigned one of the three roles: Admin, Editor, or Reader.

### Main Application Functionalities

The core functionalities involve managing different aspects of music:

- Songs: Create, Read, Update, Delete.
- Artists: Manage artists along with their albums.
- Playlists: Handle playlists with different songs.

### Data Modification (not working)

You have control over your profile information:

- Change your password.
- Update your first name, last name, username, and avatar.

## API + Swagger Integration

### Entities

We work with several entities, each with its relations:

- User
- UserMeta
- Role
- Artist
- Album
- Song
- Playlist

## Tests (not made)

To ensure everything is working smoothly, we've set up 10 Jest tests:

## Technical Requirements

The tech side of things includes a few key elements:

- Nodemon for auto-reloading during development.
- ExpressJS for the MVC architecture.
- ES6 module syntax for clean code.
- Storage of data via SQLite3 database, managed with TypeORM.
- JWT for secure authentication.
- bcrypt to hash passwords.
- Essential Express middleware like body-parser, cookie-parser, and express-validator.
- Jest for testing.
- Seed your database initially with data, including users.

## Documentation (not made)

swagger