import Employee from '../models/Employee.js';

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ employees });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { fullName, email, phone, role } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, { fullName, email, phone, role }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getEmployees, updateEmployee, deleteEmployee };
