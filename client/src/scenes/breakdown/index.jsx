import { Box } from "@mui/material";
import { Header, BreakdownChart } from "../../components";

const Breakdown = () => {
  return (
    <Box m="1.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="80vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
