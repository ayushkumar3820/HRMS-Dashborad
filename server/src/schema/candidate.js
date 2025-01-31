import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    position: {
        type: String,
        required: [true, 'pos.. is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['applied', 'interview', 'selected', 'rejected'],
        default: 'applied'
    },
    resumeUrl: {
        type: String,
        required: [true, 'Resume is required']
    },
    experience: {
        type: Number,
        required: [true, 'Experience is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Candidate', candidateSchema);
