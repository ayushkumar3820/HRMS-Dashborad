/* eslint-disable react/prop-types */
import { ResponsivePie } from "@nivo/pie";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "../state/api/adminApi";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];
  const formattedData = Object.entries(data[0].salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );

  return (
    <Box
      height={isDashboard ? "300px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "300px" : undefined}
      minWidth={isDashboard ? "300px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
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
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 30, right: 50, bottom: 80, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 10 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 1,
            itemWidth: 75,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 14,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default BreakdownChart;
