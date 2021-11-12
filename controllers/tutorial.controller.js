const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Criar e salvar um novo tutorial
exports.create = (req, res) => {
  // Validar requisição
  if (!req.body.title) {
    res.status(400).send({
      message: "Conteudo não pode estar vazio!"
    });
    return;
  }

  // Criar um cadastro
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    preco: req.body.preco,
    published: req.body.published ? req.body.published : false
  };

  // Salvar as informações
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu durante a criação."
      });
    });
};

// Retornar os dados do Banco de Dados
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu durante a criação.."
      });
    });
};

// Busca informação por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro durante o retorno do ID: " + id
      });
    });
};

// Atualiza os dados por ID requisitado
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Dados Cadastrados com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi atualizado os dados com ID: ${id}. Talvez os dados não tenha encontrado ou req.body está vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar o dados com o ID: " + id
      });
    });
};

// Deletar os dados com a especificação do ID solicitado
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Os dados foram delatados com sucesso!"
        });
      } else {
        res.send({
          message: `Não pode deletar o cadastro com Id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não pode deletar o cadastro com Id=" + id
      });
    });
};

// Delete tudo cadastro do banco
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Cadastro foi deletado com sucesso` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu."
      });
    });
};

// Encontre todos cadastros publicados
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu."
      });
    });
};