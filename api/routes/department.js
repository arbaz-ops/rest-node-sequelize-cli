const express = require("express");
const router = express.Router();
const model = require("../../models/index");
const Department = model.department;

router.get("/", async (req, res, next) => {
  await Department.findAll({ include: [model.employees] })
    .then(result => {
      count = result.length;
      res.status(200).json({
        message: "Successfuly fetched...",
        counts: count,
        depDeptails: result
      });
      result.map(doc => {
        console.log(doc.dataValues);
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
      console.log(err);
    });
});

module.exports = router;
