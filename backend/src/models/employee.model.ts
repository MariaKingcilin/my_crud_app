import { DataTypes, Model, Optional } from "sequelize";
import { EmployeeInterface } from "../types/employee.type";
import { sequelize } from "../config/database";

interface EmployeeCreationAttributes
  extends Optional<
    EmployeeInterface,
    "Id" | "CreatedAt" | "UpdatedAt" | "DeletedAt"
  > {}

export class Employee
  extends Model<EmployeeInterface, EmployeeCreationAttributes>
  implements EmployeeInterface
{
  public Id!: number;
  public UserId!: string;
  public FirstName!: string;
  public LastName?: string;
  public Email!: string;
  public Phone!: string;
  public DateOfBirth!: string;
  public Designation!: string;
  public Department!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
  public readonly DeletedAt!: Date | null;
}

Employee.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    DateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    DeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Employees",
    modelName: "Employee",
    timestamps: false,
  }
);

Employee.beforeCreate(async (employee) => {
  const lastEmployee = await Employee.findOne({
    order: [["CreatedAt", "DESC"]],
  });

  let nextIdNumber = 1;

  if (lastEmployee && lastEmployee.UserId) {
    const lastNumber = parseInt(lastEmployee.UserId.replace("MK", ""), 10);
    nextIdNumber = lastNumber + 1;
  }

  employee.UserId = `MK${nextIdNumber.toString().padStart(4, "0")}`;
});
