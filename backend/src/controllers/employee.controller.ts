import { Employee } from "../models/employee.model";
import { Request, Response } from "express";

type SuccessResponse = {
  success: boolean;
  status: number;
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
      status: 200,
      data: employees,
      message: "Employees data get successfully",
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      success: false,
      status: 500,
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
          status: 200,
          data: updatedEmployees ? updatedEmployees[0] : null,
          message: "Employee updated successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Employee not found",
        });
      }
    } else {
      const employee = await Employee.create(req.body);

      return res.json({
        success: true,
        status: 200,
        data: employee,
        message: "Employee created successfully",
      });
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to process employee request.",
    });
  }
};
export const deleteEmployee = async (
  req: Request,
  res: Response<SuccessResponse>
) => {
  try {
    const { UserId } = req.params;

    const deletedCount = await Employee.destroy({
      where: { UserId },
    });

    if (deletedCount > 0) {
      return res.json({
        success: true,
        status: 200,
        message: "Employee deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Employee not found",
      });
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to delete employee.",
    });
  }
};
