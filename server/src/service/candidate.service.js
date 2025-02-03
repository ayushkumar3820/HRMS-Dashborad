import Candidate from "../../src/schema/candidate.js";
import Employee from "../../src/schema/Employee.js";

const createCandidate = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, resumeUrl, position, status, experience } =
      req.body;
    let payload = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      resumeUrl: resumeUrl,
      position: position,
      status: status,
      experience: experience,
    };
    const newCandidate = new Candidate(payload);
    await newCandidate.save();
    res
      .status(201)
      .json({
        message: "Candidate created successfully",
        candidate: newCandidate,
      });
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
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Ensure correct field mapping
    const newEmployee = new Employee({
      fullName: candidate.fullName,
      email: candidate.email,
      phone: candidate.phoneNumber, // ✅ Fix: Ensure correct field mapping
      role: "Employee",
    });

    await newEmployee.save();
    await Candidate.findByIdAndDelete(candidateId);

    res.status(200).json({
      message: "Candidate moved to employee successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const { candidateId } = req.params; // ✅ Fix: Remove `.trim()` to prevent potential errors
    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
      return res.status(400).json({ message: "Invalid Candidate ID" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ candidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { createCandidate, getCandidates, moveToEmployee, getCandidateById };
