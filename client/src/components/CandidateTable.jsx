import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  DialogContentText,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
} from '@mui/material';
import { Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

const employees = [
  {
    id: 1,
    name: 'Jane Copper',
    position: 'Full Time',
    department: 'Designer',
    task: 'Dashboard Home page Alignment',
    status: 'Present',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 2,
    name: 'Arlene McCoy',
    position: 'Full Time',
    department: 'Designer',
    task: 'Dashboard Login page design, Dashboard Home page design',
    status: 'Absent',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 3,
    name: 'Cody Fisher',
    position: 'Senior',
    department: 'Backend Development',
    task: '--',
    status: 'Absent',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 4,
    name: 'Jenny Wilson',
    position: 'Junior',
    department: 'Backend Development',
    task: 'Dashboard login page integration',
    status: 'Present',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 5,
    name: 'Leslie Alexander',
    position: 'Team Lead',
    department: 'Human Resource',
    task: '4 scheduled interview, Sorting of resumes',
    status: 'Present',
    avatar: '/api/placeholder/32/32',
  },
];

const statusOptions = ['Present', 'Absent', 'Medical Leave', 'Work from Home'];

const CandidateTable = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    experience: '',
    resume: '',
    declaration: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFilterStatus = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteConfirmation = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    // Add your delete logic here
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleAddCandidateOpen = () => {
    setIsAddCandidateModalOpen(true);
  };

  const handleAddCandidateClose = () => {
    setIsAddCandidateModalOpen(false);
  };

  const handleAddCandidateChange = (event) => {
    const { name, value } = event.target;
    setNewCandidate((prevCandidate) => ({
      ...prevCandidate,
      [name]: value,
    }));
  };

  const handleAddCandidateDeclarationChange = (event) => {
    setNewCandidate((prevCandidate) => ({
      ...prevCandidate,
      declaration: event.target.checked,
    }));
  };

  const handleAddCandidateSave = () => {
    // Add your save logic here
    setIsAddCandidateModalOpen(false);
  };

  const handleToggle = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadResume = () => {
    // Add your download resume logic here
    setAnchorEl(null);
  };

  const filteredEmployees = employees.filter((employee) => {
    const statusMatch = filterStatus ? employee.status === filterStatus : true;
    const searchMatch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  const openMenu = Boolean(anchorEl);
  const id = openMenu ? 'simple-popper' : undefined;

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" gap={2}>
          <Select
            value={filterStatus}
            onChange={handleFilterStatus}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              height: '36px',
              '& .MuiSelect-select': {
                padding: '8px 14px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          >
            <MenuItem value="" disabled>
              <em>Status</em>
            </MenuItem>
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            size="small"
            sx={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCandidateOpen}
            sx={{
              backgroundColor: '#6A1B9A',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#4A148C',
              },
              borderRadius: '4px',
            }}
          >
            Add Candidate
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="attendance table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Profile</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Employee Name</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Position</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Department</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Task</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Status</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell sx={{ padding: '8px 16px' }}>
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-8 h-8 rounded-full"
                  />
                </TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{employee.name}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{employee.position}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{employee.department}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{employee.task}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>
                  <Select
                    value={employee.status}
                    onChange={(event) => {
                      // Handle status change
                    }}
                    sx={{
                      width: '100px',
                      backgroundColor: '#fff',
                      borderRadius: '4px',
                      '& .MuiSelect-select': {
                        padding: '4px 8px',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    }}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem
                        key={status}
                        value={status}
                        sx={{
                          fontWeight: employee.status === status ? 'bold' : 'normal',
                          color: status === 'Absent' ? '#E53935' : status === 'Present' ? '#4CAF50' : '#6A1B9A',
                        }}
                      >
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>
                  <IconButton
                    color="primary"
                    aria-label="more options"
                    onClick={(event) => handleToggle(event, employee)}
                    sx={{
                      backgroundColor: '#6A1B9A',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#4A148C',
                      },
                      borderRadius: '4px',
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Popper open={openMenu} anchorEl={anchorEl} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={openMenu} id={id} onKeyDown={(e) => handleClose(e)}>
                              <MenuItem onClick={handleDownloadResume}>Download Resume</MenuItem>
                              <MenuItem onClick={() => handleDeleteConfirmation(employee)}>Delete Candidate</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Candidate Modal */}
      <Dialog open={isAddCandidateModalOpen} onClose={handleAddCandidateClose}>
        <DialogTitle>Add New Candidate</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name*"
            name="fullName"
            value={newCandidate.fullName}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email Address*"
            name="email"
            value={newCandidate.email}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number*"
            name="phoneNumber"
            value={newCandidate.phoneNumber}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Position*"
            name="position"
            value={newCandidate.position}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Experience*"
            name="experience"
            value={newCandidate.experience}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Resume*"
            name="resume"
            value={newCandidate.resume}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newCandidate.declaration}
                onChange={handleAddCandidateDeclarationChange}
                color="primary"
              />
            }
            label="I hereby declare that the above information is true to the best of my knowledge and belief"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCandidateClose}>Cancel</Button>
          <Button onClick={handleAddCandidateSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CandidateTable;
