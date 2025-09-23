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
exports.syncDatabase = void 0;
const employee_model_1 = require("./employee.model");
const syncDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield employee_model_1.Employee.sync({ alter: true });
        console.log("Database model synchronized successfully.");
    }
    catch (error) {
        console.error("Error synchronizing database:", error);
        throw error;
    }
});
exports.syncDatabase = syncDatabase;
