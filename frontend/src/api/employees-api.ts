import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const GetAllEmployeeAPI = async () => {
  const response = await axios.get(`${baseUrl}/employees`);
  return response.data?.data;
};

export const CreateEmployeeAPI = async (employeeData: any) => {
  const response = await axios.post(
    `${baseUrl}/employees/create-employee`,
    employeeData
  );
  return response.data;
};
