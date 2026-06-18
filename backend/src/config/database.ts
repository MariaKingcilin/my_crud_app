import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg"; // Explicitly import pg for bundlers like Vercel

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "MyDataBase",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "1234",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    dialectModule: pg,
    port: Number(process.env.DB_PORT) || 5432,
    logging: false,
    dialectOptions: process.env.NODE_ENV === "production" ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.error("Unable to connect to database:", error);
    process.exit(1);
  }
};

export default connectDB;
