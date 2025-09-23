import { Employee } from "./employee.model";

export const syncDatabase = async (): Promise<void> => {
  try {
    await Employee.sync({ alter: true });
    console.log("Database model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
    throw error;
  }
};
