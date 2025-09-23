export interface EmployeeInterface {
  Id: number;
  UserId: string;
  FirstName: string;
  LastName?: string;
  Email: string;
  Phone: string;
  DateOfBirth: string;
  Designation: string;
  Department: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
}
