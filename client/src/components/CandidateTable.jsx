// src/components/CandidateTable.jsx
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
  Checkbox,
  FormControlLabel,
  DialogContentText,
} from '@mui/material';
import { Delete as DeleteIcon, Download as DownloadIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

const candidates = [
  {
    id: 1,
    name: 'Jacob William',
    email: 'jacob.william@example.com',
    phone: '(252) 555-0111',
    position: 'Senior Developer',
    status: 'New',
    experience: '1+',
  },
  {
    id: 2,
    name: 'Guy Hawkins',
    email: 'kenzi.lawson@example.com',
    phone: '(907) 555-0101',
    position: 'Human Resource Leader',
    status: 'New',
    experience: '2+',
  },
  {
    id: 3,
    name: 'Arlene McCoy',
    email: 'arlene.mccoy@example.com',
    phone: '(302) 555-0107',
    position: 'Full Time Designer',
    status: 'Selected',
    experience: '3+',
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    email: 'willie.jennings@example.com',
    phone: '(207) 555-0119',
    position: 'Full Time Developer',
    status: 'Rejected',
    experience: '0',
  },
];

const statusOptions = ['New', 'Selected', 'Rejected'];

const CandidateTable = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // New state for modals and form
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
  });

  const handleFilterStatus = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleFilterPosition = (event) => {
    setFilterPosition(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Modal handlers
  const handleAddModalOpen = () => setIsAddModalOpen(true);
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setNewCandidate({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      resume: null,
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewCandidate({ ...newCandidate, resume: file });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submission logic here
    handleAddModalClose();
  };

  const handleDeleteConfirmation = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    // Add your delete logic here
    setIsDeleteModalOpen(false);
    setSelectedCandidate(null);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const statusMatch = filterStatus ? candidate.status === filterStatus : true;
    const positionMatch = filterPosition ? candidate.position === filterPosition : true;
    const searchMatch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && positionMatch && searchMatch;
  });

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
            value={filterPosition}
            onChange={handleFilterPosition}
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
            {[...new Set(candidates.map((candidate) => candidate.position))].map((position) => (
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
            onClick={handleAddModalOpen}
            sx={{
              borderRadius: '4px',
              backgroundColor: '#6A1B9A',
              '&:hover': {
                backgroundColor: '#4A148C',
              },
            }}
          >
            Add Candidate
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="candidate table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Sr no.</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Candidates Name</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Email Address</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Phone Number</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Position</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Status</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Experience</TableCell>
              <TableCell sx={{ backgroundColor: '#6A1B9A', color: '#fff', fontWeight: 'bold', padding: '8px 16px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCandidates.map((candidate, index) => (
              <TableRow key={candidate.id}>
                <TableCell sx={{ padding: '8px 16px' }}>{index + 1}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{candidate.name}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{candidate.email}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{candidate.phone}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{candidate.position}</TableCell>
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
                          color: status === 'Rejected' ? '#E53935' : status === 'Selected' ? '#4CAF50' : '#6A1B9A',
                        }}
                      >
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{candidate.experience}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>
                  <IconButton
                    color="primary"
                    aria-label="download resume"
                    sx={{
                      backgroundColor: '#6A1B9A',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#4A148C',
                      },
                      borderRadius: '4px',
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete candidate"
                    onClick={() => handleDeleteConfirmation(candidate)}
                    sx={{
                      backgroundColor: '#E53935',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#D32F2F',
                      },
                      borderRadius: '4px',
                      marginLeft: '8px',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="more options"
                    sx={{
                      backgroundColor: '#6A1B9A',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#4A148C',
                      },
                      borderRadius: '4px',
                      marginLeft: '8px',
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Candidate Modal */}
      <Dialog open={isAddModalOpen} onClose={handleAddModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Candidate</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Full Name"
              required
              fullWidth
              margin="dense"
              value={newCandidate.name}
              onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
            />
            <TextField
              label="Email Address"
              required
              fullWidth
              margin="dense"
              type="email"
              value={newCandidate.email}
              onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
            />
            <TextField
              label="Phone Number"
              required
              fullWidth
              margin="dense"
              value={newCandidate.phone}
              onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
            />
            <TextField
              label="Position"
              required
              fullWidth
              margin="dense"
              value={newCandidate.position}
              onChange={(e) => setNewCandidate({ ...newCandidate, position: e.target.value })}
            />
            <TextField
              label="Experience"
              required
              fullWidth
              margin="dense"
              value={newCandidate.experience}
              onChange={(e) => setNewCandidate({ ...newCandidate, experience: e.target.value })}
            />
            <Box sx={{ mt: 2 }}>
              <input
                accept=".pdf,.doc,.docx"
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="resume-file"
              />
              <label htmlFor="resume-file">
                <Button variant="contained" component="span">
                  Upload Resume
                </Button>
              </label>
              {newCandidate.resume && (
                <Typography sx={{ ml: 2 }}>{newCandidate.resume.name}</Typography>
              )}
            </Box>
            <FormControlLabel
              control={<Checkbox required />}
              label="I hereby declare that the above information is true to the best of my knowledge and belief"
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddModalClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
    </Box>
  );
};

export default CandidateTable;