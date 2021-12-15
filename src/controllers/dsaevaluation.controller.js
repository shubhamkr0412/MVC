const express=require('express');

const router= express.Router();

const Dsaevaluation=require('../models/dsaevaluation.model')

router.get("", async (req, res) => {
    try {
        const dsaevaluations= await Dsaevaluation.find().populate("student_id").populate("instructor_details").lean().exec();
        return res.send(dsaevaluations);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }

})

router.get("/highestMarks", async (req, res) => {
    try {
        const dsaevaluations= await Dsaevaluation.find().populate("student_id").populate("instructor_details").lean().exec();
        let arr=[];
        let max=0;
        for(let i=0;i<dsaevaluations.length;i++) {
            if(dsaevaluations[i].student_marks>max) {
                max=dsaevaluations[i].student_marks;
            }
        }
        for(let i=0;i<dsaevaluations.length;i++) {
            if(dsaevaluations[i].student_marks==max) {
                arr.push(dsaevaluations[i]);
            }
        }
        return res.send(arr);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }

})

router.post("", async (req, res) => {
    try {
        const dsaevaluation= await Dsaevaluation.create(req.body);
        return res.status(201).send(dsaevaluation);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

router.delete("/:id",async(req,res) => {
    try {
        const dsaevaluation= await Dsaevaluation.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(dsaevaluation);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const dsaevaluation= await Dsaevaluation.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res.status(201).send(dsaevaluation);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

module.exports=router;
