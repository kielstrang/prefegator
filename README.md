## Preface
Prefegator is a group project made by students at [Lighthouse Labs] (lighthouselabs.ca). It served to introduce the students to working on a team, how development in that environment might work, and further let them practice full-stack development.

# Prefegator
Having trouble deciding on what to do? Try Prefegator and let your friends help you.

Prefegator is a group decision maker app meant to streamline group decision making. Prefegator provides a simple UI to allow a user to quickly create a poll and set voting options. Once a poll has been created, the user will be provided two links, one to the voting page, and one to the results page. 

## Screenshots
![Create poll](https://github.com/kielstrang/prefegator/blob/master/public/docs/Screenshot_20171002-094935.png?raw=true)
![Create options](https://github.com/kielstrang/prefegator/blob/master/public/docs/Screenshot_20171002-095124.png?raw=true)
![Links page](https://github.com/kielstrang/prefegator/blob/master/public/docs/Screenshot_20171002-095157.png?raw=true)
![Voting page](https://github.com/kielstrang/prefegator/blob/master/public/docs/Screenshot_20171002-095320.png?raw=true)
![Results page](https://github.com/kielstrang/prefegator/blob/master/public/docs/Screenshot_20171002-095347.png?raw=true)

## Prefegator v1.0 Features:
Prefegator uses [Instant-runoff voting ](https://en.wikipedia.org/wiki/Instant-runoff_voting) in its current version. An alpha version ran on [Borda counting] (https://en.wikipedia.org/wiki/Borda_count). A later version of Prefegator might offer an option for a user to choose which voting system to use.

The user must enter an email, a poll name and at least two choices. They can optionally set a description for the poll or for individual choices, or require voters to enter their name to cast their vote.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- body-parser: ^1.15.2,
- bootstrap: ^4.0.0-beta,
- cookie-session: ^1.3.2,
- dotenv: ^2.0.0,
- ejs: ^2.4.1,
- express: ^4.13.4,
- jquery: ^3.2.1,
- knex: ^0.11.7,
- knex-logger: ^0.1.0,
- mailgun-js: ^0.13.1,
- morgan: ^1.7.0,
- node-sass-middleware: ^0.9.8,
- pg: ^6.0.2,
- popper.js: ^1.12.5,
- sweetalert: ^2.0.4
