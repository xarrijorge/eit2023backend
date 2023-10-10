import express from "express";
const eitRouter = express.Router()
import Supabase_Client from "../utils/dbConnection.js";


// import data from "../eitsdata.js"

const { data: users, error } = await Supabase_Client 
  .from('users')
  .select()



eitRouter.get('/eits', (req, res) =>{
    // const person = Math.floor(Math.random() * 51)
    res.json(users)
})


export default eitRouter 