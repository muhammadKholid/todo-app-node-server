const express = require('express');
const todoRouter = express.Router();

const todoController = require('../controllers/todo.controller');

// simple route
todoRouter.get("/", todoController.list);
todoRouter.get("/:id", todoController.detail);
todoRouter.post("/", todoController.create);
todoRouter.patch("/:id", todoController.update);
todoRouter.delete("/:id", todoController.delete);

module.exports = todoRouter;

