import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";
import {
  useCreateEmployeeAPI,
  useDeleteEmployeeAPI,
} from "../../queries/employees-query";
import EmployeeListScreen from "./employee-list-screen";
import TodoHeader from "./todo-header";

const inputFields = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "email", label: "Email ID", type: "email" },
  { name: "mobileNumber", label: "Mobile Number", type: "text" },
  { name: "dateOfBirth", label: "Date Of Birth", type: "text" },
  { name: "designation", label: "Designation", type: "text" },
  { name: "department", label: "Department", type: "text" },
];

const TodoListScreen = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    designation: "",
    department: "",
  });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = React.useState(false);
  const [editEmployeeId, setEditEmployeeId] = React.useState<string | null>(
    null,
  );
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [employeeToDelete, setEmployeeToDelete] = React.useState<any>(null);

  const { mutate: createEmployeeMutate, isPending: isCreateEmployeeLoading } =
    useCreateEmployeeAPI();

  const { mutate: deleteEmployeeMutate, isPending: isDeleteEmployeeLoading } =
    useDeleteEmployeeAPI();

  const handleOnChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setFormData({ ...formData, [field]: e.target.value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Date of Birth is required";
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = "Use format DD/MM/YYYY";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClickSubmitBtn = async () => {
    if (validateForm()) {
      const employeeData = {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        Phone: formData.mobileNumber,
        DateOfBirth: formData.dateOfBirth,
        Designation: formData.designation,
        Department: formData.department,
      };

      if (isEditing) {
        createEmployeeMutate(
          { ...employeeData, UserId: editEmployeeId },
          {
            onSuccess: async () => {
              handleClickCancelBtn();
              await queryClient.invalidateQueries({
                queryKey: ["get-employees"],
              });
            },
            onError: (error: any) => {
              console.error("Error updating employee:", error);
            },
          },
        );
      } else {
        createEmployeeMutate(employeeData, {
          onSuccess: async () => {
            handleClickCancelBtn();
            await queryClient.invalidateQueries({ queryKey: ["get-employees"] });
          },
          onError: (error: any) => {
            console.error("Error creating employee:", error);
          },
        });
      }
    }
  };

  const handleClickCancelBtn = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      dateOfBirth: "",
      designation: "",
      department: "",
    });
    setErrors({});
    setIsEditing(false);
    setEditEmployeeId(null);
  };

  const handleEditEmployee = (employee: any) => {
    setFormData({
      firstName: employee.FirstName,
      lastName: employee.LastName,
      email: employee.Email,
      mobileNumber: employee.Phone,
      dateOfBirth: employee.DateOfBirth,
      designation: employee.Designation,
      department: employee.Department,
    });
    setIsEditing(true);
    setEditEmployeeId(employee.UserId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteEmployee = (employee: any) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      deleteEmployeeMutate(employeeToDelete.UserId, {
        onSuccess: async () => {
          setShowDeleteModal(false);
          setEmployeeToDelete(null);
          await queryClient.invalidateQueries({ queryKey: ["get-employees"] });
        },
        onError: (error: any) => {
          console.error("Error deleting employee:", error);
        },
      });
    }
  };

  return (
    <React.Fragment>
      <TodoHeader />
      <section className="w-full pt-4 md:pt-6 lg:pt-6">
        <div className="w-[95%] h-full mx-auto">
          <h3 className="text-[22px] text-content-black font-semibold mb-4">
            {isEditing ? "Edit Employee" : "Create Employee"}
          </h3>
          <div className="w-full flex flex-wrap">
            {inputFields.map((field: any) => (
              <div
                key={field.name}
                className="w-full md:w-1/2 lg:w-1/4 p-1 mb-1 md:p-2 md:mb-2 lg:p-2 lg:mb-2"
              >
                <label className="text-content-gray text-[14px]">
                  {field.label} <span className="text-content-red">*</span>
                </label>
                <input
                  type={field.type}
                  placeholder={`Enter ${field.label}`}
                  value={(formData as any)[field.name]}
                  onChange={(e) => handleOnChangeInput(e, field.name)}
                  className={`w-full border-2 rounded-md mt-1 py-2 px-3 
                    focus:outline-none 
                    ${errors[field.name]
                      ? "border-red-500"
                      : "border-stroke-border hover:border-primary-blue focus:border-primary-blue"
                    }`}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-[12px] mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end mt-4 border-b border-b-stroke-divider px-2 pb-4 md:pb-6 lg:pb-6 gap-6">
            <button
              onClick={handleClickSubmitBtn}
              disabled={isCreateEmployeeLoading}
              className="w-1/2 md:w-auto lg:w-auto bg-primary-blue text-white text-[14px] font-medium hover:bg-icon-background rounded-md px-6 py-2"
            >
              {isEditing ? "Update" : "Submit"}
              {isCreateEmployeeLoading && "..."}
            </button>
            <button
              onClick={handleClickCancelBtn}
              className="w-1/2 md:w-auto lg:w-auto bg-primary-background text-stroke-border hover:text-icon-focus hover:border-icon-focus border-2 border-stroke-border text-[14px] font-medium rounded-md px-6 py-2"
            >
              {isEditing ? "Cancel" : "Clear"}
            </button>
          </div>
        </div>
      </section>
      <EmployeeListScreen
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-semibold text-content-black">
                Confirm Delete
              </h3>
              <X
                className="cursor-pointer text-content-gray"
                onClick={() => setShowDeleteModal(false)}
              />
            </div>
            <p className="text-[14px] text-content-gray mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-content-black">
                {employeeToDelete?.FirstName} {employeeToDelete?.LastName}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-[14px] text-content-gray border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-[14px] text-white bg-content-red rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TodoListScreen;
