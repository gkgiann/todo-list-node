import { fastify } from "fastify";
import cors from "@fastify/cors";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DatabasePostgres();

server.register(cors, {});

// CRIAÇÃO DE TAREFA
server.post("/tasks", async (req, res) => {
  const { text } = req.body;

  const task = {
    text,
  };

  const taskCreated = await database.create(task);

  return taskCreated;
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
