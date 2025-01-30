import express from 'express';
import { register, login } from '../controller/user.controller.js';
import { createCandidate, getCandidates, moveToEmployee,getCandidateById } from '../controller/candidateController.js';
import { getEmployees, updateEmployee, deleteEmployee } from '../controller/employeeController.js';
import { markAttendance, getAttendance } from '../controller/attendaneController.js';
import { applyLeave, getLeaves, updateLeaveStatus } from '../controller/leaveController.js';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth Routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Candidate Routes
router.post('/candidates', authMiddleware, createCandidate);
router.get('/candidates', authMiddleware,  getCandidates);
router.get('/candidates/:candidateId', authMiddleware, getCandidateById);

// Employee Routes
router.get('/employees', authMiddleware,  getEmployees);
router.put('/employees/:employeeId', authMiddleware,  updateEmployee);
router.delete('/employees/:employeeId', authMiddleware, deleteEmployee);

// Attendance Routes
router.post('/attendance', authMiddleware, authorizeRoles('hr', 'admin'), markAttendance);
router.get('/attendance', authMiddleware, authorizeRoles('hr', 'admin'), getAttendance);

// Leave Routes
router.post('/leaves', authMiddleware, authorizeRoles('hr', 'admin'), applyLeave);
router.get('/leaves', authMiddleware, authorizeRoles('hr', 'admin'), getLeaves);
router.put('/leaves/:leaveId', authMiddleware, authorizeRoles('hr', 'admin'), updateLeaveStatus);

export default router;
