# MoLOS

This is the showcase and documentation website for MoLOS, built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

Here you can find:

- Comprehensive documentation for getting started with MoLOS
- Blog posts about updates and features
- Detailed guides for available modules like Tasks, Health, Finance, and more
- Community resources and contribution guidelines

## Running with Docker

You can run the pre-built Docker image directly:

```bash
docker pull ghcr.io/molos-app/molos-web:latest
docker run -p 3001:8080 ghcr.io/molos-app/molos-web:latest
```

This will start the website on `http://localhost:3001`.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
