const express = require("express");
const router = express.Router();
const model = require("../../models/index");
const Employees = model.employees;
const Department = model.department;

router.get("/", async (req, res, next) => {
  try {
    await Employees.findAll({ include: [Department] }).then(result => {
      res.status(200).json({
        message: "Successfuly fetched.",
        counts: result.length,
        empDetails: result
      });
      result.map(doc => {
        console.log(doc.dataValues);
      });
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      error: e.message
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const dep = await Department.findByPk(req.body.depId);
    if (dep) {
      await Employees.create({
        name: req.body.name,
        salary: req.body.salary,
        depId: req.body.depId
      })
        .then(result => {
          res.status(201).json({
            message: "Employee Added.",
            empDetails: result
          });
        })
        .catch(err => {
          console.log(err.message);
          res.status(500).json({
            error: err.message
          });
        });
    } else {
      res.status(404).json({
        message: "Department not found..."
      });
      console.log("Department not found...");
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      error: e.message
    });
  }
});

router.get("/:empId", async (req, res, next) => {
  try {
    const emp = await Employees.findByPk(req.params.empId, {
      include: [Department]
    });
    res.status(200).json({
      message: "Successfuly fetched...",
      empDetails: emp
    });
    console.log(emp.dataValues);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message
    });
  }
});

router.delete("/:empId", async (req, res, next) => {
  try {
    const delEmp = await Employees.findByPk(req.params.empId);
    if (delEmp) {
      delEmp.destroy();
      res.status(200).json({
        message: "Employee Deleted...",
        empDetails: delEmp
      });
    } else {
      console.log("Employee not found...");
      res.status(404).json({
        message: "Employee not found..."
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message
    });
  }
});

router.patch("/:empId", async (req, res, next) => {
  const empId = req.params.empId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  try {
    const [numberOfAffectedRows, affectedRows] = await Employees.update(
      {
        adoptedStatus: true
      },
      {
        where: {
          id: empId
        }
      }
    );
    console.log(numberOfAffectedRows);
    console.log(  );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
