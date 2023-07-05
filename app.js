const App = require("./classes/App");
require('dotenv').config()
const port = process.env.PORT;
const dbConnectionString = process.env.CONNECTION_STRING

const app = new App(port,dbConnectionString);
app.startServer(port);