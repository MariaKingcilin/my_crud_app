"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = exports.getAllEmployees = void 0;
const employee_model_1 = require("../models/employee.model");
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employee_model_1.Employee.findAll({ order: [["Id", "ASC"]] });
        res.json({
            success: true,
            data: employees,
            message: "Employees data get successfully",
        });
    }
    catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get tasks.",
        });
    }
});
exports.getAllEmployees = getAllEmployees;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield employee_model_1.Employee.create(req.body);
        res.json({
            success: true,
            data: employee,
            message: "Employee created successfully",
        });
    }
    catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get tasks.",
        });
    }
});
exports.createEmployee = createEmployee;
