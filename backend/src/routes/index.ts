import { Router } from "express";
import employeeRouter from "./employee.routes";

const router = Router();

router.use("/employees", employeeRouter);

export default router;
