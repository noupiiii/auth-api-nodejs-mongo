const express = require('express');
const connectDB = require("./config/db.js");
const dotenv = require('dotenv').config();
const port = 5000;

// connexion à la bdd
connectDB();

const app = express();

//Middleware -> permet de traiter les données de la request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/register", require("./routes/register.routes.js"));

// Lancer le serveur
app.listen(port, () => {
    console.log("\x1b[32m%s\x1b[0m", `Server started successfully on port: ${port}`);
});