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

const employees = [
  {
    id: 1,
    name: 'Jane Copper',
    email: 'jane.copper@example.com',
    phone: '(704) 555-0127',
    position: 'Intern',
    department: 'Designer',
    dateOfJoining: '10/06/13',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 2,
    name: 'Arlene McCoy',
    email: 'arlene.mccoy@example.com',
    phone: '(302) 555-0107',
    position: 'Full Time',
    department: 'Designer',
    dateOfJoining: '11/07/16',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 3,
    name: 'Cody Fisher',
    email: 'deanna.curtis@example.com',
    phone: '(252) 555-0126',
    position: 'Senior',
    department: 'Backend Development',
    dateOfJoining: '08/15/17',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 4,
    name: 'Janney Wilson',
    email: 'janney.wilson@example.com',
    phone: '(252) 555-0126',
    position: 'Junior',
    department: 'Backend Development',
    dateOfJoining: '12/04/17',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 5,
    name: 'Leslie Alexander',
    email: 'willie.jennings@example.com',
    phone: '(207) 555-0119',
    position: 'Team Lead',
    department: 'Human Resource',
    dateOfJoining: '05/30/14',
    avatar: '/api/placeholder/32/32',
  },
];

const EmployeeTable = () => {
  const [filterPosition, setFilterPosition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    // Update the employees array with the filtered list
    // This is just a mock update, in a real scenario you would use a state management solution
    console.log('Deleted employee with id:', id);
    setAnchorEl(null);
  };

  const handleSave = () => {
    // Save the edited employee data
    // This is just a mock save, in a real scenario you would update the state or send a request to the server
    console.log('Saved employee:', editingEmployee);
    setOpen(false);
  };

  const filteredEmployees = employees.filter((employee) => {
    const positionMatch = filterPosition ? employee.position === filterPosition : true;
    const searchMatch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    return positionMatch && searchMatch;
  });

  const openMenu = Boolean(anchorEl);
  const id = openMenu ? 'simple-popper' : undefined;

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Select
          value={filterPosition}
          onChange={handleFilterPosition}
          displayEmpty
          sx={{
            width: '200px',
            '& .MuiSelect-select': {
              padding: '8px 14px',
            },
          }}
        >
          <MenuItem value="">
            <em>Position</em>
          </MenuItem>
          {[...new Set(employees.map((employee) => employee.position))].map((position) => (
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

      <TableContainer component={Paper} elevation={0}>
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
                key={employee.id}
                sx={{ '&:hover': { backgroundColor: '#F9FAFB' } }}
              >
                <TableCell>
                  <Avatar
                    src={employee.avatar}
                    alt={employee.name}
                    sx={{ width: 32, height: 32 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textPrimary">
                    {employee.name}
                  </Typography>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.dateOfJoining}</TableCell>
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
                              <MenuItem onClick={() => handleDelete(employee.id)}>Delete</MenuItem>
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
                  value={editingEmployee.name}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
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
                  value={editingEmployee.position}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
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
                  value={editingEmployee.dateOfJoining}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, dateOfJoining: e.target.value })}
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
