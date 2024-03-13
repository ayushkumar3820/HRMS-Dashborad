import Product from "../models/Product.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const productsWithStats = await Product.aggregate([
      {
        $lookup: {
          from: "productstats",
          localField: "_id",
          foreignField: "product",
          as: "stats",
        },
      },
    ]);

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { sort, search = "" } = req.query;

    const searchCriteria = {
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    };
    const transactions = await Transaction.find(searchCriteria).sort(sort);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const countryCounts = await User.aggregate([
      {
        $group: {
          _id: { country: "$country" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id.country",
          count: "$count",
        },
      },
    ]);

    const formattedLocations = await Promise.all(
      countryCounts.map(async (item) => ({
        id: await getCountryIso3(item.country),
        value: item.count,
      }))
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
