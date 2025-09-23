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
exports.Employee = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Employee extends sequelize_1.Model {
}
exports.Employee = Employee;
Employee.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    UserId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    FirstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    LastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    DateOfBirth: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Designation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Department: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    CreatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    UpdatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    DeletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: "Employees",
    modelName: "Employee",
    timestamps: false,
});
Employee.beforeCreate((employee) => __awaiter(void 0, void 0, void 0, function* () {
    const lastEmployee = yield Employee.findOne({
        order: [["CreatedAt", "DESC"]],
    });
    let nextIdNumber = 1;
    if (lastEmployee && lastEmployee.UserId) {
        const lastNumber = parseInt(lastEmployee.UserId.replace("MK", ""), 10);
        nextIdNumber = lastNumber + 1;
    }
    employee.UserId = `MK${nextIdNumber.toString().padStart(4, "0")}`;
}));
