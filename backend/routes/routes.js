import express from "express";

import data from "..//models/db.model.js";
const router = express.Router();
router.get("/usersless5", async (req, res) => {
  const soll = await data.find({
    income: { $lt: "$5.00" },
    $or: [{ car: "BMW" }, { car: "Mercedes" }],
  });

  res.json(soll);
  // .then((users) => {
  //   console.log(users);

  //   res.send(JSON.stringify(users));
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
});

router.get("/getmalephonegt10", (req, res) => {
  data
    .find({
      $expr: {
        $gt: [{ $toInt: "$phone_price" }, 10000],
      },
      gender: "Male",
    })
    .then((users) => {
      console.log(users);
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
  // res.send("completted");
});

router.get("/m15", (req, res) => {
  data
    .find({
      last_name: { $regex: "^M" },
      quote: { $regex: "^.{15,}$" },
    })
    .then((users) => {
      console.log(users);
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/bma", (req, res) => {
  data
    .find({
      $and: [
        { car: { $in: ["BMW", "Mercedes", "Audi"] } },
        { email: { $not: { $regex: /\d/ } } },
      ],
    })
    .then((users) => {
      console.log(users);
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/top10", (req, res) => {
  // data
  //   .aggregate([
  //     {
  //       $group: {
  //         _id: "$city",
  //         count: { $sum: 1 },
  //         averageIncome: {
  //           $avg: {
  //             $toDouble: {
  //               $replaceAll: { input: "$income", find: "$", replacement: "" },
  //             },
  //           },
  //         },
  //       },
  //     },
  //     // Sort the cities by the number of users in descending order
  //     { $sort: { count: -1 } },
  //     // Limit the result to 10 cities
  //     { $limit: 10 },
  //   ])

  data
    .find({}, { city: 1, income: 1 })
    .group({
      _id: "$city",
      num_users: { $sum: 1 },
      total_income: { $sum: { $toDouble: "$income" } },
    })
    .sort({ num_users: -1 })
    .limit(10)
    .toArray((err, result) => {
      if (err) {
        // handle error
      }
      console.log(result);
    });

  // .then((users) => {
  //   console.log(users);
  //   res.send(users);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
});
router.get("/users", async (req, res) => {
  try {
    const users = await data.find();
    console.log(users);
    res.setHeader("Content-Type", "application/json");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
export default router;
