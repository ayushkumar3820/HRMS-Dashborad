import React, { useState, useEffect } from 'react';
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
  TextField,
  Box,
  IconButton,
  Avatar,
  Typography,
  ClickAwayListener,
  Popper,
  Grow,
  MenuList,
  Button,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [filterPosition, setFilterPosition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/employees')
      .then(response => response.json())
      .then(data => setEmployees(data.employees || [])) // Ensure employees is an array
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleFilterPosition = (event) => {
    setFilterPosition(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget ? event.currentTarget : null);
  };

  const handleClose = (event) => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setOpen(true);
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/employees/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Deleted employee with id:', id);
        setEmployees(employees.filter(employee => employee._id !== id));
      })
      .catch(error => console.error('Error deleting employee:', error));
    setAnchorEl(null);
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/api/employees/${editingEmployee._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingEmployee),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Saved employee:', data);
        setEmployees(employees.map(employee => employee._id === data.employee._id ? data.employee : employee));
        setOpen(false);
      })
      .catch(error => console.error('Error saving employee:', error));
  };

  const filteredEmployees = employees.filter((employee) => {
    const positionMatch = filterPosition ? employee.role === filterPosition : true;
    const searchMatch =
      employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    return positionMatch && searchMatch;
  });

  const openMenu = Boolean(anchorEl);
  const id = openMenu ? 'simple-popper' : undefined;

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} >
        <Select
          value={filterPosition}
          onChange={handleFilterPosition}
          displayEmpty
          sx={{
            width: '200px',
            borderRadius:"8px",
            '& .MuiSelect-select': {
              padding: '8px 14px',
            },
          }}
        >
          <MenuItem value="">
            <em>Position</em>
          </MenuItem>
          {[...new Set(employees.map((employee) => employee.role))].map((position) => (
            <MenuItem key={position} value={position}>
              {position}
            </MenuItem>
          ))}
        </Select>
        <TextField
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          size="small"
          sx={{ width: '240px' }}
        />
      </Box>

      <TableContainer component={Paper} elevation={0}  >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#6B7280' }}>Profile</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#6B7280' }}>Employee Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#6B7280' }}>Email Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#6B7280' }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#6B7280' }}>Position</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#6B7280' }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#6B7280' }}>Date of Joining</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#6B7280' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow
                key={employee._id}
                sx={{ '&:hover': { backgroundColor: '#F9FAFB' } }}
              >
                <TableCell>
                  <Avatar
                    src={employee.avatar}
                    alt={employee.fullName}
                    sx={{ width: 32, height: 32 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textPrimary">
                    {employee.fullName}
                  </Typography>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.createdAt}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={(e) => handleToggle(e, employee)}>
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
                              <MenuItem onClick={() => handleEdit(employee)}>Edit</MenuItem>
                              <MenuItem onClick={() => handleDelete(employee._id)}>Delete</MenuItem>
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

      {open && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <Paper
            sx={{
              padding: '20px',
              width: '400px',
              backgroundColor: '#fff',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Edit Employee Details
            </Typography>
            {editingEmployee && (
              <Box>
                <TextField
                  label="Full Name"
                  value={editingEmployee.fullName}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, fullName: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email Address"
                  value={editingEmployee.email}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phone Number"
                  value={editingEmployee.phone}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Position"
                  select
                  value={editingEmployee.role}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, role: e.target.value })}
                  fullWidth
                  margin="normal"
                >
                  {['Intern', 'Full Time', 'Junior', 'Senior', 'Team Lead'].map((position) => (
                    <MenuItem key={position} value={position}>
                      {position}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Department"
                  value={editingEmployee.department}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Date of Joining"
                  value={editingEmployee.createdAt}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, createdAt: e.target.value })}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            )}
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={() => setOpen(false)} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default EmployeeTable;
