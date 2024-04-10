import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DatabasePostgres();

// CRIAÇÃO DE TAREFA
server.post("/tasks", async (req, res) => {
  const { text } = req.body;

  const task = {
    text,
  };

  await database.create(task);

  return res.status(201).send();
});

// BUSCANDO TAREFA
server.get("/tasks", async (req, res) => {
  const tasks = database.list();

  return tasks;
});

// ATUALIZANDO TAREFA
server.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { text, isCompleted } = req.body;

  await database.update(taskId, {
    text,
    isCompleted,
  });

  return res.status(204).send();
});

// DELETANDO TAREFA
server.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  await database.delete(taskId);

  res.status(204).send();
});

server.listen({
  port: 3333,
});

console.log("Rodando na porta 3333...");
