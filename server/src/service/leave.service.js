import Leave from '../../src/schema/Leave.js';

const applyLeave = async (req, res) => {
    try {
        const { employeeId, startDate, endDate, reason } = req.body;
        const newLeave = new Leave({ employeeId, startDate, endDate, reason });
        await newLeave.save();
        res.status(201).json({ message: 'Leave applied successfully', leave: newLeave });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('employeeId');
        res.status(200).json({ leaves });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateLeaveStatus = async (req, res) => {
    try {
        const { leaveId } = req.params;
        const { status } = req.body;
        const updatedLeave = await Leave.findByIdAndUpdate(leaveId, { status }, { new: true });
        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave not found' });
        }
        res.status(200).json({ message: 'Leave status updated successfully', leave: updatedLeave });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { applyLeave, getLeaves, updateLeaveStatus };
