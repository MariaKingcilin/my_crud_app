import { Employee } from "../models/employee.model";
import { Request, Response } from "express";

type SuccessResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export const getAllEmployees = async (
  req: Request,
  res: Response<SuccessResponse>
) => {
  try {
    const employees = await Employee.findAll({ order: [["Id", "ASC"]] });

    res.json({
      success: true,
      data: employees,
      message: "Employees data get successfully",
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get tasks.",
    });
  }
};

export const createEmployee = async (
  req: Request,
  res: Response<SuccessResponse>
) => {
  try {
    const employee = await Employee.create(req.body);

    res.json({
      success: true,
      data: employee,
      message: "Employee created successfully",
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get tasks.",
    });
  }
};
