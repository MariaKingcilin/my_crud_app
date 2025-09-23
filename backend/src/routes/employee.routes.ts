import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
} from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get("/", getAllEmployees);
employeeRouter.post("/create-employee", createEmployee);

export default employeeRouter;
