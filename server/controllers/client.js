import Product from "../models/Product.js";
import User from "../models/User.js";

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
