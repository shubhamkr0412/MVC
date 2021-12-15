const express=require('express');

const router= express.Router();

const Codingevaluation=require('../models/codingevaluation.model')


router.get("", async (req, res) => {
    try {
        const codingevaluations= await Codingevaluation.find().populate("student_id").populate("instructor_details").lean().exec();
        return res.send(codingevaluations);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }

})

router.get("/highestMarks", async (req, res) => {
    try {
        const codingevaluations= await Codingevaluation.find().populate("student_id").populate("instructor_details").lean().exec();
        let arr=[];
        let max=0;
        for(let i=0;i<codingevaluations.length;i++) {
            if(codingevaluations[i].student_marks>max) {
                max=codingevaluations[i].student_marks;
            }
        }
        for(let i=0;i<codingevaluations.length;i++) {
            if(codingevaluations[i].student_marks==max) {
                arr.push(codingevaluations[i]);
            }
        }
        return res.send(arr);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }

})


router.post("", async (req, res) => {
    try {
        const codingevaluation= await Codingevaluation.create(req.body);
        return res.status(201).send(codingevaluation);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

router.delete("/:id",async(req,res) => {
    try {
        const codingevaluation= await Codingevaluation.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(codingevaluation);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const codingevaluation= await Codingevaluation.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res.status(201).send(codingevaluation);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

module.exports =router;