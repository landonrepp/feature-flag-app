import Surreal from "surrealdb.js";

async function create() {
  const db = new Surreal('http://127.0.0.1:8000/rpc', {
    // Set the namespace and database for the connection
    ns: "test",
    db: "test",

    // Set the authentication details for the connection
    auth: {
      user: "root",
      pass: "root",
      NS: "feature-flag",
      DB: "feature-flag",
    },
  });
  
  return db;
}

let db = create();

export { db };
