const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./src/db/db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Usa middlewares
server.use(middlewares);

// Configura el json-server
server.use(router);

// Inicia el servidor
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
