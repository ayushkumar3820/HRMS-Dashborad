import { useState } from "react";
import { MoreVertical } from "lucide-react";
import "../AttendanceDashboard/EmployeeTable.css"; 

const employees = [
  {
    name: "Jane Copper",
    position: "Full Time",
    department: "Designer",
    task: "Dashboard Home page Alignment",
    status: "Present",
    image: "/images/jane.jpg",
  },
  {
    name: "Arlene McCoy",
    position: "Full Time",
    department: "Designer",
    task: "Dashboard Login page design, Dashboard Home page design",
    status: "Present",
    image: "/images/arlene.jpg",
  },
  {
    name: "Cody Fisher",
    position: "Senior",
    department: "Backend Development",
    task: "--",
    status: "Absent",
    image: "/images/cody.jpg",
  },
  {
    name: "Janney Wilson",
    position: "Junior",
    department: "Backend Development",
    task: "Dashboard login page integration",
    status: "Present",
    image: "/images/janney.jpg",
  },
  {
    name: "Leslie Alexander",
    position: "Team Lead",
    department: "Human Resource",
    task: "4 scheduled interviews, Sorting of resumes",
    status: "Present",
    image: "/images/leslie.jpg",
  },
];

export default function EmployeeTable() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredEmployees =
    statusFilter === "All"
      ? employees
      : employees.filter((e) => e.status === statusFilter);

  return (
    <div className="employee-container">
      <div className="employee-controls">
        <select
          className="filter-select"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Employees</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <input
          type="text"
          placeholder="Search Employee"
          className="search-input"
        />
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Employee Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td>
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="profile-img"
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.task}</td>
              <td>
                <select
                  className={`status-select ${
                    employee.status === "Present" ? "present" : "absent"
                  }`}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
              <td>
                <MoreVertical size={20} className="action-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
