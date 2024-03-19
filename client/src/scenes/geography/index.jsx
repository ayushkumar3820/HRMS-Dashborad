import { Box, useTheme } from "@mui/material";
import { GeographyChart, Header } from "../../components";
const Geography = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem">
      <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;
