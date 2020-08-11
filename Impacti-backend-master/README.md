# ImpactI Backend

## Technology stack
 - mocha + chai + nyc for testing
 - swagger for documentation
 - docker config
 - babel for transpilation
 - environment-related configuration
 - sequelize and psql for database layer
 - eslint configuration
 - airbnb code style guide

## Development Setup

### Environment

#### Install Docker.

[Ubuntu Docs](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

#### Install Node, NPM, and Yarn.

[NVM](https://github.com/creationix/nvm/blob/master/README.md) (Recommended)

[Yarn](https://yarnpkg.com/en/docs/install)

#### Create Mongo docker container.

*Edit the local data path in the command below.*

`docker run --name=impactidb -d -p 57017:27017 -v /home/user/data/impactidb:/data/db mongo:3.6`

*To start and stop mongoDB.*
`docker start impactidb`
`docker stop impactidb`

### Installation

#### Copy sample config.

```
cd {project_folder}`
cp src/config/config.sample.js src/config/config.dev.js
```

*The sample config should work with the container created above.*

#### Initial configuration.

Before you can configure nodemailer to send email locally, you must change
your Google account to [allow less secure access](https://support.google.com/accounts/answer/6010255).

Then, add values to your `config.dev.js` similar to:

```
  mailerUser: 'chase@impacti.solutions',
  mailerPassword: '*****your google account password****',
```

#### Initialize, start, and seed.

```
cd {project_folder}
yarn install
yarn seed:delta:dev
yarn start
```

#### After making changes to fixtures

```
yarn seed:delta:dev
```

#### Clearing fixtures data

```
yarn clear
```

#### Testing and linting

```
yarn test
```
