import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Employee ID is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'leave'],
        default: 'present'
    }
}, {
    timestamps: true
});

export default mongoose.model('Attendance', attendanceSchema);
