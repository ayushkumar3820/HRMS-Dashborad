import express from 'express';
import { register, login , logout } from '../../server/src/service/user.service.js';
import { createCandidate, getCandidates, moveToEmployee,getCandidateById } from '../../server/src/service/candidate.service.js';
import { getEmployees, updateEmployee, deleteEmployee  , getEmployeeById} from '../../server/src/service/employee.service.js';
import { markAttendance, getAttendance } from '../../server/src/service/attendence.service.js';
import { applyLeave, getLeaves, updateLeaveStatus } from '../../server/src/service/leave.service.js';
import { authMiddleware, authorizeRoles } from '../../server/middleware/authMiddleware.js';
import { validation } from '../validation/index.js';
const router = express.Router();





router.post('/auth/register', register);
router.post('/auth/login', authMiddleware ,validation.login, login);
router.post('auth/logout', authMiddleware,  logout);
router.post('/candidates/create', authMiddleware, createCandidate);
router.get('/candidates', authMiddleware,  getCandidates);
router.get('/candidates/:candidateId', authMiddleware, getCandidateById);
router.put('/candidates/:candidateId', authMiddleware, moveToEmployee);
router.get('/employees', authMiddleware,  getEmployees);
router.get('/employees/:id', authMiddleware, getEmployeeById);
router.put('/employees/:employeeId', authMiddleware,  updateEmployee);
router.delete('/employees/:employeeId', authMiddleware, deleteEmployee);
router.post('/attendance', authMiddleware, markAttendance);
router.get('/attendance', authMiddleware,  getAttendance);
router.post('/leaves', authMiddleware,  applyLeave);
router.get('/leaves', authMiddleware,  getLeaves);
router.put('/leaves/:leaveId', authMiddleware,  updateLeaveStatus);

export default router;
