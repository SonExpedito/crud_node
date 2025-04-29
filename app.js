import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import {Agendamentos} from './banco/post.js'
const app = express();

app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
      eq: (a, b) => a === b
    }
  }));
  
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(8081, function () {
    console.log("Servidor Iniciado")
})

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.render("primeira_pagina")
})


app.get("/consulta", function (req, res) {
    Agendamentos.findAll().then(function (post) {
        res.render("consulta", { post })
    }).catch(function (erro) {
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

//Editor de tela
app.get("/editar/:id", function (req, res) {
    Agendamentos.findAll({ where: { 'id': req.params.id } }).then(function (post) {
        res.render("editar", { post })
    }).catch(function (erro) {
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

//Exclusão
app.get("/excluir/:id", function (req, res) {
    Agendamentos.destroy({ where: { 'id': req.params.id } }).then(function () {
        res.render("primeira_pagina")
    }).catch(function (erro) {
        console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
    })
})

app.post("/cadastrar", function (req, res) {
    Agendamentos.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function () {
        res.redirect("/")
    }).catch(function (erro) {
        res.send("Falha ao cadastrar os dados: " + erro)
    })
})

app.post("/atualizar", function (req, res) {
    Agendamentos.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }, {
        where: {
            id: req.body.id
        }
    }).then(function () {
        res.redirect("/consulta")
    })
})

