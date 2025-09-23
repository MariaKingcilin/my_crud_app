"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const employeeRouter = (0, express_1.Router)();
employeeRouter.get("/", employee_controller_1.getAllEmployees);
employeeRouter.post("/create-employee", employee_controller_1.createEmployee);
exports.default = employeeRouter;
