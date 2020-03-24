const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyparser = require("body-parser");
const empRouter = require("./api/routes/employees");
const depRouter = require("./api/routes/department");

app.use(bodyparser.json());

app.use(
  bodyparser.urlencoded({
    extended: false
  })
);

app.use("/employees", empRouter);

app.use("/department", depRouter);

app.listen(port, () => {
  console.log(`Listening to localhost:${port}`);
});
