import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const statusOptions = ['Scheduled', 'Ongoing', 'Selected', 'Rejected'];
const positionOptions = ['Designer', 'Backend Development', 'Human Resource', ''];

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [positionStatus, setPositionStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
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

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/api/candidates');
      if (Array.isArray(response.data)) {
        setCandidates(response.data);
      } else {
        setCandidates([]);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setCandidates([]);
    }
  };

  const handleFilterStatus = (event) => {
    setFilterStatus(event.target.value);
  };

  const handlePositionStatus = (event) => {
    setPositionStatus(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteConfirmation = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/candidates/${selectedCandidate.id}`);
      fetchCandidates();
      setIsDeleteModalOpen(false);
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
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

  const handleAddCandidateSave = async () => {
    try {
      await axios.post('/api/candidates/create', newCandidate);
      fetchCandidates();
      setIsAddCandidateModalOpen(false);
      setNewCandidate({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        experience: '',
        resume: '',
        declaration: false,
      });
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const handleToggle = (event, candidate) => {
    setAnchorEl(event.currentTarget);
    setSelectedCandidate(candidate);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadResume = () => {
    // Add your download resume logic here
    setAnchorEl(null);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const statusMatch = filterStatus ? candidate.status === filterStatus : true;
    const positionMatch = positionStatus ? candidate.department === positionStatus : true;
    const searchMatch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && positionMatch && searchMatch;
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
          <Select
            value={positionStatus}
            onChange={handlePositionStatus}
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
              <em>Position</em>
            </MenuItem>
            {positionOptions.map((position) => (
              <MenuItem key={position} value={position}>
                {position}
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
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell sx={{ padding: '8px 16px' }}>
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-8 h-8 rounded-full"
                  />
                </TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{candidate.name}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{candidate.position}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{candidate.department}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{candidate.task}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>
                  <Select
                    value={candidate.status}
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
                          fontWeight: candidate.status === status ? 'bold' : 'normal',
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
                    onClick={(event) => handleToggle(event, candidate)}
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
                              <MenuItem onClick={() => handleDeleteConfirmation(candidate)}>Delete Candidate</MenuItem>
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
        <DialogTitle>Delete Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this candidate?
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
