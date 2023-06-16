import Surreal from "surrealdb.js";

async function create() {
  const db = new Surreal("http://localhost:8000/rpc");
  await db.signin({
    user: "root",
    pass: "root",
    NS: "feature-flag",
    DB: "feature-flag",
  });

  return db;
}

export { create };
