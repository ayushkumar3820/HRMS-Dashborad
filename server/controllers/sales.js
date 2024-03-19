import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find();
    res.status(200).json(overallStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMonthlySales = async (req, res) => {
  try {
    const monthlySalesLine = await OverallStat.aggregate([
      { $unwind: "$monthlyData" },
      {
        $project: {
          _id: 0,
          x: "$monthlyData.month",
          y: "$monthlyData.totalSales",
        },
      },
      {
        $addFields: {
          monthOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$x", "January"] }, then: 1 },
                { case: { $eq: ["$x", "February"] }, then: 2 },
                { case: { $eq: ["$x", "March"] }, then: 3 },
                { case: { $eq: ["$x", "April"] }, then: 4 },
                { case: { $eq: ["$x", "May"] }, then: 5 },
                { case: { $eq: ["$x", "June"] }, then: 6 },
                { case: { $eq: ["$x", "July"] }, then: 7 },
                { case: { $eq: ["$x", "August"] }, then: 8 },
                { case: { $eq: ["$x", "September"] }, then: 9 },
                { case: { $eq: ["$x", "October"] }, then: 10 },
                { case: { $eq: ["$x", "November"] }, then: 11 },
                { case: { $eq: ["$x", "December"] }, then: 12 },
              ],
              default: 0,
            },
          },
        },
      },
      { $sort: { monthOrder: 1 } },
    ]);

    const monthlyUnitsLine = await OverallStat.aggregate([
      { $unwind: "$monthlyData" },
      {
        $project: {
          _id: 0,
          x: "$monthlyData.month",
          y: "$monthlyData.totalUnits",
        },
      },
      {
        $addFields: {
          monthOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$x", "January"] }, then: 1 },
                { case: { $eq: ["$x", "February"] }, then: 2 },
                { case: { $eq: ["$x", "March"] }, then: 3 },
                { case: { $eq: ["$x", "April"] }, then: 4 },
                { case: { $eq: ["$x", "May"] }, then: 5 },
                { case: { $eq: ["$x", "June"] }, then: 6 },
                { case: { $eq: ["$x", "July"] }, then: 7 },
                { case: { $eq: ["$x", "August"] }, then: 8 },
                { case: { $eq: ["$x", "September"] }, then: 9 },
                { case: { $eq: ["$x", "October"] }, then: 10 },
                { case: { $eq: ["$x", "November"] }, then: 11 },
                { case: { $eq: ["$x", "December"] }, then: 12 },
              ],
              default: 0,
            },
          },
        },
      },
      { $sort: { monthOrder: 1 } },
    ]);

    res.status(200).json({
      monthlySalesLine: monthlySalesLine,
      monthlyUnitsLine: monthlyUnitsLine,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDailySales = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const dailySalesLine = await OverallStat.aggregate([
      { $unwind: "$dailyData" },
      {
        $project: {
          _id: 0,
          date: "$dailyData.date",
          x: { $substr: ["$dailyData.date", 5, -1] },
          y: "$dailyData.totalSales",
        },
      },
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      { $sort: { x: 1 } },
    ]);

    const dailyUnitsLine = await OverallStat.aggregate([
      { $unwind: "$dailyData" },
      {
        $project: {
          _id: 0,
          date: "$dailyData.date",
          x: { $substr: ["$dailyData.date", 5, -1] },
          y: "$dailyData.totalUnits",
        },
      },
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.status(200).json({
      dailySalesLine: dailySalesLine,
      dailyUnitsLine: dailyUnitsLine,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
