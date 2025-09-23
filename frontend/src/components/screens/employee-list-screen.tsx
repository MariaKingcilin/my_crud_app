import { EllipsisVertical } from "lucide-react";
import { useGetAllEmployeeAPI } from "../../queries/employees-query";
import { useEffect, useState } from "react";

const getRandomColor = () => {
  const colors = [
    "#FF6B6B",
    "#6BCB77",
    "#4D96FF",
    "#FFD93D",
    "#9D4EDD",
    "#00C49A",
    "#FF7F50",
    "#FFB6C1",
    "#20B2AA",
    "#9370DB",
    "#FF6347",
    "#40E0D0",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const EmployeeListScreen = () => {
  const [allEmployeeList, setAllEmployeeList] = useState<any[]>([]);

  const { data: employeeList, isLoading: isEmployeeLoading } =
    useGetAllEmployeeAPI();

  useEffect(() => {
    if (employeeList) {
      const editedEmployeeList = employeeList.map((employee: any) => ({
        ...employee,
        bgColor: getRandomColor(),
      }));
      setAllEmployeeList(editedEmployeeList);
    }
  }, [employeeList]);

  return (
    <section className="w-full py-4 md:py-6 lg:py-6">
      <div className="w-[95%] mx-auto">
        <h3 className="text-[22px] text-content-black font-semibold mb-4">
          Employees List{" "}
          {isEmployeeLoading ? "(0)" : `(${allEmployeeList?.length})`}
        </h3>
        <div className="w-full flex flex-wrap">
          {allEmployeeList?.map((employee: any) => (
            <div
              key={employee?.UserId}
              className="w-full md:w-1/2 lg:w-1/4 p-1 mb-1 md:p-2 lg:p-2">
              <div className="w-full bg-white p-4 rounded-md shadow-md shadow-shadow-card flex flex-col hover:scale-[1.02] transition-all duration-200 ease-in-out">
                <div className="w-full relative flex flex-col items-center justify-center gap-1">
                  <div
                    className="w-[40px] h-[40px] rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: employee?.bgColor }}>
                    <h2 className="text-[18px] font-semibold text-primary-background">
                      {employee?.FirstName[0].toUpperCase()}
                    </h2>
                  </div>
                  <h3 className="text-[16px] font-semibold text-content-black">
                    {employee?.FirstName} {employee?.LastName}
                  </h3>
                  <h4 className="text-[14px] text-content-gray">
                    ID : {employee?.UserId}
                  </h4>
                  <div className="absolute top-0 right-0 p-2 cursor-pointer hover:bg-background-profile rounded-md">
                    <EllipsisVertical size={20} className="text-content-gray" />
                  </div>
                </div>
                <div className="w-full mt-4 flex flex-col gap-2">
                  <p className="text-[14px] text-content-gray">
                    {employee?.Designation}
                  </p>
                  <p className="text-[14px] text-content-gray truncate">
                    <span className="font-semibold text-content-black">
                      Email:
                    </span>{" "}
                    {employee?.Email}
                  </p>
                  <p className="text-[14px] text-content-gray">
                    <span className="font-semibold text-content-black">
                      Phone:
                    </span>{" "}
                    {employee?.Phone}
                  </p>
                  <p className="text-[14px] text-content-gray">
                    <span className="font-semibold text-content-black">
                      Department:
                    </span>{" "}
                    {employee?.Department}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployeeListScreen;
