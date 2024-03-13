import Product from "../models/Product.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

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

// export const getTransactions = async (req, res) => {
//   try {
//     const { page = 1, pageSize = 20, sort, search = "" } = req.query;

//     const searchCriteria = {
//       $or: [
//         { cost: { $regex: new RegExp(search, "i") } },
//         { userId: { $regex: new RegExp(search, "i") } },
//       ],
//     };

//     const transactions = await Transaction.find(searchCriteria)
//       .sort(sort)
//       .skip((page - 1) * pageSize)
//       .limit(Number(pageSize));

//     const total = await Transaction.countDocuments(searchCriteria);

//     res.status(200).json({ transactions, total });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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
