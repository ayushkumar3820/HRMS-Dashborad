import Candidate from '../models/candidate.js';
import Employee from '../models/Employee.js';

const createCandidate = async (req, res) => {
    try {
        const { fullName, email, phone, resume } = req.body;
        const newCandidate = new Candidate({ fullName, email, phone, resume });
        await newCandidate.save();
        res.status(201).json({ message: 'Candidate created successfully', candidate: newCandidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json({ candidates });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const moveToEmployee = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        const newEmployee = new Employee({
            fullName: candidate.fullName,
            email: candidate.email,
            phone: candidate.phone,
            role: 'Employee' 
        });
        await newEmployee.save();
        await Candidate.findByIdAndDelete(candidateId);
        res.status(200).json({ message: 'Candidate moved to employee successfully', employee: newEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getCandidateById = async (req, res) => {
    try {
        const candidateId = req.params.candidateId.trim(); // Trim any extra whitespace or newline characters
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ candidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createCandidate, getCandidates, moveToEmployee,getCandidateById };
