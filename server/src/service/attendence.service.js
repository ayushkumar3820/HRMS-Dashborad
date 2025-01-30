import Attendance from '../../src/schema/Attendance.js';

const markAttendance = async (req, res) => {
    try {
        const { employeeId, date, status } = req.body;
        const newAttendance = new Attendance({ employeeId, date, status });
        await newAttendance.save();
        res.status(201).json({ message: 'Attendance marked successfully', attendance: newAttendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAttendance = async (req, res) => {
    try {
        const attendances = await Attendance.find().populate('employeeId');
        res.status(200).json({ attendances });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { markAttendance, getAttendance };
