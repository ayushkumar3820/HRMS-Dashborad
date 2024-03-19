/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../constants/GeoData.js";
import { useGetGeographyQuery } from "../state/api/adminApi";
import ReactLoading from "react-loading";

const GeographyChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetGeographyQuery();
  const theme = useTheme();

  if (!data || isLoading) {
    return (
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
    );
  }
  return (
    <ResponsiveChoropleth
      data={data}
      colors="spectral"
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      features={geoData.features}
      margin={{ top: 0, right: 0, bottom: 0, left: isDashboard ? 0 : -50 }}
      domain={[0, 60]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.3}
      borderColor="#ffffff"
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default GeographyChart;
