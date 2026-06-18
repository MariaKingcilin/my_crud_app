import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
} from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get("/", getAllEmployees);
employeeRouter.post("/create-employee", createEmployee);
employeeRouter.delete("/:UserId", deleteEmployee);

export default employeeRouter;
