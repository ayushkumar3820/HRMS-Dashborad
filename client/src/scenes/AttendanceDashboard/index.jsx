import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MoreVertical, Mail, Bell, User } from 'lucide-react';

// Sample employee data
const Daily = [
  {
    id: 1,
    name: "Jane Copper",
    position: "Full Time",
    department: "Designer",
    task: "Dashboard Home page Alignment",
    status: "Present",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 2,
    name: "Arlene McCoy",
    position: "Full Time",
    department: "Designer",
    task: "Dashboard Login page design, Dashboard Home page design",
    status: "Absent",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 3,
    name: "Cody Fisher",
    position: "Senior",
    department: "Backend Development",
    task: "--",
    status: "Absent",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 4,
    name: "Jenny Wilson",
    position: "Junior",
    department: "Backend Development",
    task: "Dashboard login page integration",
    status: "Present",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 5,
    name: "Leslie Alexander",
    position: "Team Lead",
    department: "Human Resource",
    task: "4 scheduled interview, Sorting of resumes",
    status: "Present",
    avatar: "/api/placeholder/32/32"
  }
];

const AttendanceDashboard = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [employeeStatus, setEmployeeStatus] = useState(Daily.map(emp => ({ ...emp, status: emp.status })));

  const handleStatusChange = (id, newStatus) => {
    setEmployeeStatus(prevStatus =>
      prevStatus.map(emp =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-6xl mx-auto bg-white">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded"></div>
              <span className="text-xl font-semibold">Attendance</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-gray-500" />
              <Bell className="w-5 h-5 text-gray-500" />
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex justify-between mb-6">
            <Input
              className="w-64"
              placeholder="Search"
              type="search"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="medical">Medical Leave</SelectItem>
                <SelectItem value="wfh">Work from Home</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Profile</th>
                  <th className="px-6 py-3 text-left">Employee Name</th>
                  <th className="px-6 py-3 text-left">Position</th>
                  <th className="px-6 py-3 text-left">Department</th>
                  <th className="px-6 py-3 text-left">Task</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeStatus
                  .filter(emp => statusFilter === "all" || emp.status.toLowerCase() === statusFilter)
                  .map((employee) => (
                    <tr key={employee.id} className="border-b">
                      <td className="px-6 py-4">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-8 h-8 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4">{employee.name}</td>
                      <td className="px-6 py-4">{employee.position}</td>
                      <td className="px-6 py-4">{employee.department}</td>
                      <td className="px-6 py-4">{employee.task}</td>
                      <td className="px-6 py-4">
                        <Select
                          value={employee.status}
                          onValueChange={(newStatus) => handleStatusChange(employee.id, newStatus)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder={employee.status} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Present">Present</SelectItem>
                            <SelectItem value="Absent">Absent</SelectItem>
                            <SelectItem value="Medical Leave">Medical Leave</SelectItem>
                            <SelectItem value="Work from Home">Work from Home</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceDashboard;
