const express=require('express');

const router= express.Router();

const Student=require('../models/student.model')

router.get("", async (req, res) => {
    try {
        const students= await Student.find().populate("user_id").lean().exec();
        return res.send(students);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }

})

router.post("", async (req, res) => {
    try {
        const student= await Student.create(req.body);
        return res.status(201).send(student)
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

router.delete("/:id",async(req,res) => {
    try {
        const student= await Student.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(student);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const student= await Student.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res.status(201).send(student);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

module.exports=router;