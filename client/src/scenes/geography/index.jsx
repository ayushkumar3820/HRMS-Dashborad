import { Box, useTheme } from "@mui/material";
import { GeographyChart, Header } from "../../components";
import { useGetGeographyQuery } from "../../state/api/adminApi";
import ReactLoading from "react-loading";

const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();
  console.log(data);
  return (
    <Box m="1.5rem">
      <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
      <Box
        mt="40px"
        height="80vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {!isLoading ? (
          <GeographyChart data={data} />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ReactLoading
              type="spin"
              color={theme.palette.secondary[200]}
              height="40px"
              width="40px"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
