import express from "express";
const eitRouter = express.Router()

import data from "../eitsdata.js"


eitRouter.get('/eits', (req, res) =>{
    const person = Math.floor(Math.random() * 51)
    res.json(data[person])
})


export default eitRouter 