import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateEmployeeAPI, GetAllEmployeeAPI } from "../api/employees-api";

export const useGetAllEmployeeAPI = () => {
  return useQuery({
    queryFn: GetAllEmployeeAPI,
    queryKey: ["get-employees"],
  });
};

export const useCreateEmployeeAPI = () => {
  return useMutation({
    mutationFn: CreateEmployeeAPI,
    mutationKey: ["create-employee"],
  });
};
