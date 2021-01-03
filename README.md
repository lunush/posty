# Posty - a very unique social media

Built with TypeScript, GraphQL, MongoDB, and React Native Web

# Installation

Since the online preview is not yet available, you can run the app locally.

1. Spin up a MongoDB instance on you PC on port 27017, e.g.

```
docker run -d --rm -p 27017:27017 -v path/to/db:/data/db --name posty-mongodb mongo
```

2. Run `yarn dev` in `server`. The server should be available at http://localhost:3456
3. Run `yarn dev` in `web`. The client should be available at http://localhost:3000
