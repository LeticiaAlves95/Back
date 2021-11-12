//import bodyParser from bodyParser;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

//db.sequelize.sync({ force: true }).then(() => {
 // console.log("Drop and re-sync db.");
//});

// Rota Simples
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo a aplicação ICTS" });
});

require("./routes/tutorial.routes")(app);

// Configurar Porta, requisição
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor está executando na porta ${PORT}.`);
});