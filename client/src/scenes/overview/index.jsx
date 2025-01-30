import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Header, EmployeeTable } from "../../components";
import { useState } from "react";

const Overview = () => {
  const [view, setView] = useState("units");
  return (
    
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          
        </FormControl>
        <EmployeeTable view={view} />
      
    </Box>
  );
};

export default Overview;
