import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/database";
import { syncDatabase } from "./models";

dotenv.config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  await syncDatabase();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV}`);
  });
};

startServer();
