module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Criar um novo Cadastro
    router.post("/", tutorials.create);
  
    // Trazer todos os dados
    router.get("/", tutorials.findAll);
  
    // Trazer todos os itens comprados
    router.get("/published", tutorials.findAllPublished);
  
    // Trazer um cadastro por Id
    router.get("/:id", tutorials.findOne);
  
    // Atualizar os dados de acordo com o Id
    router.put("/:id", tutorials.update);
  
    // Deletar as informações de acordo com o Id
    router.delete("/:id", tutorials.delete);
  
    // Deletar todos os cadastrados
    router.delete("/", tutorials.deleteAll);
  
    app.use('/api/tutorials', router);
  };