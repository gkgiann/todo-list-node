import { sql } from "./db.js";

// sql`drop table tasks`.then(() => {
//   console.log("Tabela apagada!");
// });

sql`
    CREATE TABLE tasks (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        is_completed BOOLEAN NOT NULL DEFAULT FALSE
    );
`.then(() => {
  console.log("Tabela criada!");
});
