const express = require("express");
const route = require('./routes');
const app = express();
app.use(express.json());
app.use(route);


console.log("Node Rodando ")
app.listen(3333);