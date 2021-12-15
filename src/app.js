const express=require('express');

const userController = require("./controllers/user.controller");
const studentController = require("./controllers/student.controller");
const codingevaluationController = require("./controllers/codingevaluation.controller")
const dsaevaluationController = require("./controllers/dsaevaluation.controller")

const connect= require("./configs/db")

const app = express();
app.use(express.json());

app.use("/users",userController);
app.use("/students",studentController);
app.use("/codingevaluations",codingevaluationController);
app.use("/dsaevaluations",dsaevaluationController);


app.listen(2525, async ()=> {
    await connect();
    console.log("listening on port 2525")
})