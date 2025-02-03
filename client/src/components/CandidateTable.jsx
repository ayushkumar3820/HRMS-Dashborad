import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  InputAdornment,
  IconButton,
  Box,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  DialogContentText,
} from '@mui/material';
import { CloudUpload, Delete as DeleteIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";

const statusOptions = ["New", "Selected", "Rejected"];
const positionOptions = [
  "Senior Developer",
  "Human Resource",
  "Full Time Designer",
  "Full Time Developer",
];

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [positionStatus, setPositionStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    experience: "",
    resumeUrl: "",
    declaration: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/candidates");
      if (response.data && Array.isArray(response.data.candidates)) {
        setCandidates(response.data.candidates);
      } else {
        setCandidates([]);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Temporary file preview URL
      setNewCandidate((prev) => ({ ...prev, resumeUrl: fileUrl }));
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/candidates/${selectedCandidate._id}`);
      fetchCandidates();
      setIsDeleteModalOpen(false);
      setSelectedCandidate(null);
    } catch (error) {
      console.error("Error deleting candidate:", error);
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
      const response = await axios.post(
        "http://localhost:5000/api/candidates/create",
        newCandidate,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        console.log("Candidate added successfully:", response.data);
        fetchCandidates(); // Refresh list after adding
        setIsAddCandidateModalOpen(false);
        setNewCandidate({
          fullName: "",
          email: "",
          phoneNumber: "",
          position: "",
          experience: "",
          resumeUrl: "",
        });
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.data);
      } else {
        console.error("Network Error:", error.message);
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
    const positionMatch = positionStatus
      ? candidate.position === positionStatus
      : true;
    const searchMatch = candidate.fullName
      ? candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      : false;
    return statusMatch && positionMatch && searchMatch;
  });

  const openMenu = Boolean(anchorEl);
  const id = openMenu ? "simple-popper" : undefined;

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "8px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" gap={2}>
          <Select
            value={filterStatus}
            onChange={handleFilterStatus}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              height: "36px",
              "& .MuiSelect-select": {
                padding: "8px 14px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
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
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              height: "40px",
              minWidth: "120px",
              border: "1px solid #E5E7EB",
              fontSize: "0.875rem",
              color: "#111827",
              "&:hover": {
                border: "1px solid #6366F1",
              },
              "& .MuiSelect-select": {
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSvgIcon-root": {
                color: "#6B7280",
                right: "8px",
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
              backgroundColor: "#fff",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCandidateOpen}
            sx={{
              backgroundColor: "#6A1B9A",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4A148C",
              },
              borderRadius: "4px",
            }}
          >
            Add Candidate
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: "8px", overflow: "hidden" }}>
        <Table sx={{ minWidth: 650 }} aria-label="candidate table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#6A1B9A", color: "#fff", fontWeight: "bold", padding: "8px 16px" }}>
                Sr no.
              </TableCell>
              <TableCell sx={{ backgroundColor: "#6A1B9A", color: "#fff", fontWeight: "bold", padding: "8px 16px" }}>
                Candidates Name
              </TableCell>
              <TableCell sx={{ backgroundColor: "#6A1B9A", color: "#fff", fontWeight: "bold", padding: "8px 16px" }}>
                Email Address
              </TableCell>
              <TableCell sx={{ backgroundColor: "#6A1B9A", color: "#fff", fontWeight: "bold", padding: "8px 16px" }}>
                Phone Number
              </TableCell>
              <TableCell sx={{ backgroundColor: "#6A1B9A", color: "#fff", fontWeight: "bold", padding: "8px 16px" }}>
                Position
              </TableCell>
              <TableCell sx={{ backgroundColor: "#6A1B9A", color: "#fff", fontWeight: "bold", padding: "8px 16px" }}>
                Status
              </TableCell>
              <TableCell sx={{ backgroundColor: "#6A1B9A", color: "#fff", fontWeight: "bold", padding: "8px 16px" }}>
                Experience
              </TableCell>
              <TableCell sx={{ backgroundColor: "#6A1B9A", color: "#fff", fontWeight: "bold", padding: "8px 16px" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCandidates.map((candidate, index) => (
              <TableRow key={candidate._id}>
                <TableCell sx={{ padding: "8px 16px" }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px" }}>
                  {candidate.fullName}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px" }}>
                  {candidate.email}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px" }}>
                  {candidate.phoneNumber}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px" }}>
                  {candidate.position}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px" }}>
                  <Select
                    value={candidate.status}
                    onChange={(event) => {
                      // Handle status change
                    }}
                    sx={{
                      width: "120px",
                      borderRadius: "20px", // More rounded
                      border: "2px solid", // Custom border
                      borderColor:
                        candidate.status === "Rejected" ? "#E53935" : "#6A1B9A",
                      color:
                        candidate.status === "Rejected" ? "#E53935" : "#6A1B9A",
                      fontWeight: "bold",
                      "& .MuiSelect-select": {
                        padding: "6px 12px", // Better padding
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover": {
                        borderColor:
                          candidate.status === "Rejected"
                            ? "#D32F2F"
                            : "#4A148C",
                      },
                    }}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem
                        key={status}
                        value={status}
                        sx={{
                          fontWeight:
                            candidate.status === status ? "bold" : "normal",
                          color:
                            status === "Rejected"
                              ? "#E53935"
                              : status === "Selected"
                              ? "#4CAF50"
                              : "#6A1B9A",
                        }}
                      >
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell sx={{ padding: "8px 16px" }}>
                  {candidate.experience}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px" }}>
                  <IconButton
                    color="primary"
                    aria-label="more options"
                    onClick={(event) => handleToggle(event, candidate)}
                    sx={{
                      backgroundColor: "#6A1B9A",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#4A148C",
                      },
                      borderRadius: "4px",
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Popper
                    open={openMenu}
                    anchorEl={anchorEl}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={openMenu}
                              id={id}
                              onKeyDown={(e) => handleClose(e)}
                            >
                              <MenuItem onClick={handleDownloadResume}>
                                Download Resume
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  handleDeleteConfirmation(candidate)
                                }
                              >
                                Delete Candidate
                              </MenuItem>
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
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Delete Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this candidate?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Candidate Modal */}
      <Dialog open={isAddCandidateModalOpen} onClose={handleAddCandidateClose}>
        <DialogTitle sx={{ backgroundColor: '#6A1B9A', color: '#fff', padding: '16px' }}>
          Add New Candidate
        </DialogTitle>
        <DialogContent sx={{ padding: '24px' }}>
          <TextField
            label="Full Name*"
            name="fullName"
            value={newCandidate.fullName}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                '& fieldset': {
                  borderColor: '#6A1B9A',
                },
                '&:hover fieldset': {
                  borderColor: '#4A148C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4A148C',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6A1B9A',
              },
            }}
          />
          <TextField
            label="Email Address*"
            name="email"
            value={newCandidate.email}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                '& fieldset': {
                  borderColor: '#6A1B9A',
                },
                '&:hover fieldset': {
                  borderColor: '#4A148C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4A148C',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6A1B9A',
              },
            }}
          />
          <TextField
            label="Phone Number*"
            name="phoneNumber"
            value={newCandidate.phoneNumber}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                '& fieldset': {
                  borderColor: '#6A1B9A',
                },
                '&:hover fieldset': {
                  borderColor: '#4A148C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4A148C',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6A1B9A',
              },
            }}
          />
          <TextField
            label="Position*"
            name="position"
            value={newCandidate.position}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                '& fieldset': {
                  borderColor: '#6A1B9A',
                },
                '&:hover fieldset': {
                  borderColor: '#4A148C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4A148C',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6A1B9A',
              },
            }}
          />
          <TextField
            label="Experience*"
            name="experience"
            value={newCandidate.experience}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                '& fieldset': {
                  borderColor: '#6A1B9A',
                },
                '&:hover fieldset': {
                  borderColor: '#4A148C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4A148C',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6A1B9A',
              },
            }}
          />
          <TextField
            label="Resume*"
            name="resumeUrl"
            value={newCandidate.resumeUrl}
            onChange={handleAddCandidateChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton component="label">
                    <CloudUpload sx={{ color: '#6A1B9A' }} />
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                borderColor: '#6A1B9A',
              },
              '& .MuiInputLabel-root': {
                color: '#6A1B9A',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6A1B9A',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4A148C',
              },
            }}
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
            sx={{
              '& .MuiFormControlLabel-label': {
                color: '#6A1B9A',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button onClick={handleAddCandidateClose} color="error" sx={{ marginRight: '8px' }}>
            Cancel
          </Button>
          <Button onClick={handleAddCandidateSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CandidateTable;
