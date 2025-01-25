import db from "../modelsSQL/indexSQL";

db.connection
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .then(() => db.connection.close())
  .catch((error: Error) => console.error("Error syncing database:", error));