import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as material from '@mui/material';
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
    resumeUrl: '',
    declaration: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/candidates');
      if (response.data && Array.isArray(response.data.candidates)) {
        setCandidates(response.data.candidates);
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
      await axios.delete(`/api/candidates/${selectedCandidate._id}`);
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
      const response = await axios.post('http://localhost:5000/api/candidates/create', newCandidate, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        console.log('Candidate added successfully:', response.data);
        fetchCandidates(); // Refresh list after adding
        setIsAddCandidateModalOpen(false);
        setNewCandidate({
          fullName: '',
          email: '',
          phoneNumber: '',
          position: '',
          experience: '',
          resumeUrl: '',
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      if (error.response) {
        console.error('API Error:', error.response.data);
      } else {
        console.error('Network Error:', error.message);
      }
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
    const positionMatch = positionStatus ? candidate.position === positionStatus : true;
    const searchMatch = candidate.fullName ? candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    return statusMatch && positionMatch && searchMatch;
  });

  const openMenu = Boolean(anchorEl);
  const id = openMenu ? 'simple-popper' : undefined;

  return (
    <material.Box sx={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <material.Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <material.Box display="flex" gap={2}>
          <material.Select
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
            <material.MenuItem value="" disabled>
              <em>Status</em>
            </material.MenuItem>
            {statusOptions.map((status) => (
              <material.MenuItem key={status} value={status}>
                {status}
              </material.MenuItem>
            ))}
          </material.Select>
          <material.Select
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
            <material.MenuItem value="" disabled>
              <em>Position</em>
            </material.MenuItem>
            {positionOptions.map((position) => (
              <material.MenuItem key={position} value={position}>
                {position}
              </material.MenuItem>
            ))}
          </material.Select>
        </material.Box>
        <material.Box display="flex" alignItems="center" gap={2}>
          <material.TextField
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
          <material.Button
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
          </material.Button>
        </material.Box>
      </material.Box>

      <material.TableContainer component={material.Paper} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
        <material.Table sx={{ minWidth: 650 }} aria-label="attendance table">
          <material.TableHead>
            <material.TableRow>
              <material.TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Profile</material.TableCell>
              <material.TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Employee Name</material.TableCell>
              <material.TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Position</material.TableCell>
              <material.TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Department</material.TableCell>
              <material.TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Task</material.TableCell>
              <material.TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Status</material.TableCell>
              <material.TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Action</material.TableCell>
            </material.TableRow>
          </material.TableHead>
          <material.TableBody>
            {filteredCandidates.map((candidate) => (
              <material.TableRow key={candidate._id}>
                <material.TableCell sx={{ padding: '8px 16px' }}>
                  <img
                    src={candidate.avatar}
                    alt={candidate.fullName}
                    className="w-8 h-8 rounded-full"
                  />
                </material.TableCell>
                <material.TableCell sx={{ padding: '8px 16px' }}>{candidate.fullName}</material.TableCell>
                <material.TableCell sx={{ padding: '8px 16px' }}>{candidate.position}</material.TableCell>
                <material.TableCell sx={{ padding: '8px 16px' }}>{candidate.department}</material.TableCell>
                <material.TableCell sx={{ padding: '8px 16px' }}>{candidate.task}</material.TableCell>
                <material.TableCell sx={{ padding: '8px 16px' }}>
                  <material.Select
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
                      <material.MenuItem
                        key={status}
                        value={status}
                        sx={{
                          fontWeight: candidate.status === status ? 'bold' : 'normal',
                          color: status === 'Absent' ? '#E53935' : status === 'Present' ? '#4CAF50' : '#6A1B9A',
                        }}
                      >
                        {status}
                      </material.MenuItem>
                    ))}
                  </material.Select>
                </material.TableCell>
                <material.TableCell sx={{ padding: '8px 16px' }}>
                  <material.IconButton
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
                  </material.IconButton>
                  <material.Popper open={openMenu} anchorEl={anchorEl} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <material.Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                      >
                        <material.Paper>
                          <material.ClickAwayListener onClickAway={handleClose}>
                            <material.MenuList autoFocusItem={openMenu} id={id} onKeyDown={(e) => handleClose(e)}>
                              <material.MenuItem onClick={handleDownloadResume}>Download Resume</material.MenuItem>
                              <material.MenuItem onClick={() => handleDeleteConfirmation(candidate)}>Delete Candidate</material.MenuItem>
                            </material.MenuList>
                          </material.ClickAwayListener>
                        </material.Paper>
                      </material.Grow>
                    )}
                  </material.Popper>
                </material.TableCell>
              </material.TableRow>
            ))}
          </material.TableBody>
        </material.Table>
      </material.TableContainer>

      {/* Delete Confirmation Modal */}
      <material.Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <material.DialogTitle>Delete Candidate</material.DialogTitle>
        <material.DialogContent>
          <material.DialogContentText>
            Are you sure you want to delete this candidate?
          </material.DialogContentText>
        </material.DialogContent>
        <material.DialogActions>
          <material.Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</material.Button>
          <material.Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </material.Button>
        </material.DialogActions>
      </material.Dialog>

      {/* Add Candidate Modal */}
      <material.Dialog open={isAddCandidateModalOpen} onClose={handleAddCandidateClose}>
        <material.DialogTitle>Add New Candidate</material.DialogTitle>
        <material.DialogContent>
          <material.TextField
            label="Full Name*"
            name="fullName"
            value={newCandidate.fullName}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <material.TextField
            label="Email Address*"
            name="email"
            value={newCandidate.email}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <material.TextField
            label="Phone Number*"
            name="phoneNumber"
            value={newCandidate.phoneNumber}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <material.TextField
            label="Position*"
            name="position"
            value={newCandidate.position}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <material.TextField
            label="Experience*"
            name="experience"
            value={newCandidate.experience}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <material.TextField
            label="Resume*"
            name="resumeUrl"
            value={newCandidate.resumeUrl}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
          />
          <material.FormControlLabel
            control={
              <material.Checkbox
                checked={newCandidate.declaration}
                onChange={handleAddCandidateDeclarationChange}
                color="primary"
              />
            }
            label="I hereby declare that the above information is true to the best of my knowledge and belief"
          />
        </material.DialogContent>
        <material.DialogActions>
          <material.Button onClick={handleAddCandidateClose}>Cancel</material.Button>
          <material.Button onClick={handleAddCandidateSave} variant="contained" color="primary">
            Save
          </material.Button>
        </material.DialogActions>
      </material.Dialog>
    </material.Box>
  );
};

export default CandidateTable;
