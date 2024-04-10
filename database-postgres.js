import { sql } from "./db.js";
import { randomUUID } from "node:crypto";

export class DatabasePostgres {
  async list() {
    const tasks = await sql`select * from tasks`;

    return tasks;
  }

  async create(task) {
    const taskId = randomUUID();
    const { text } = task;

    await sql`INSERT INTO tasks (id, text) VALUES (${taskId}, ${text});`;
  }

  async update(id, task) {
    const { text, isCompleted } = task;

    await sql`UPDATE tasks SET text = ${text}, is_completed = ${isCompleted} WHERE id = ${id};`;
  }

  async delete(id) {
    await sql`DELETE FROM tasks WHERE id = ${id}`;
  }
}
