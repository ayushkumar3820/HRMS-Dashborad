import { Box, useTheme } from "@mui/material";
import { useGetMonthlySalesQuery } from "../state/api/adminApi";
import ReactLoading from "react-loading";
import { ResponsiveLine } from "@nivo/line";
import { useMemo } from "react";

/* eslint-disable react/prop-types */
const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetMonthlySalesQuery();

  const prepareChartData = useMemo(() => {
    if (!data) return [];

    const extractMonthlyData = (monthlyData) => {
      let total = 0;
      return monthlyData.map(({ x, y }) => {
        total += Number(y);
        return { x, y: total };
      });
    };

    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: extractMonthlyData(data.monthlySalesLine),
    };

    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: extractMonthlyData(data.monthlyUnitsLine),
    };

    return view === "sales" ? [totalSalesLine] : [totalUnitsLine];
  }, [data, view]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || isLoading)
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

  return (
    <ResponsiveLine
      data={prepareChartData}
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
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: undefined,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={undefined}
    />
  );
};

export default OverviewChart;
