import { app } from "./app";
import dotenv from "dotenv";
import "reflect-metadata";
import { dataSource } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

dataSource
  .initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.log("Error during Data Source initialization:", error);
  });

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
