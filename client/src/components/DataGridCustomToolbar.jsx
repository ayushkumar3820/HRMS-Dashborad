/* eslint-disable react/prop-types */
import { Search } from "@mui/icons-material";
import {
  IconButton,
  TextField,
  InputAdornment,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

const DataGridCustomToolbar = ({ search, setSearch }) => {
  const isSmDevice = useMediaQuery("(max-width: 576px");
  const isXsDevice = useMediaQuery("(max-width: 494px");
  return (
    <GridToolbarContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {!isXsDevice && <GridToolbarColumnsButton />}
          {!isSmDevice && <GridToolbarDensitySelector />}
          <GridToolbarExport />
        </Box>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: isXsDevice ? "10rem" : "15rem" }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
