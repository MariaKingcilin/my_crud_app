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
      message: "Failed to get employees.",
    });
  }
};

export const createEmployee = async (
  req: Request,
  res: Response<SuccessResponse>
) => {
  try {
    const { UserId } = req.body;

    if (UserId) {
      const [updatedCount, updatedEmployees] = await Employee.update(req.body, {
        where: { UserId },
        returning: true,
      });

      if (updatedCount > 0) {
        return res.json({
          success: true,
          data: updatedEmployees ? updatedEmployees[0] : null,
          message: "Employee updated successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
    } else {
      const employee = await Employee.create(req.body);

      return res.json({
        success: true,
        data: employee,
        message: "Employee created successfully",
      });
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process employee request.",
    });
  }
};
