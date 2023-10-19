import express from "express";
const eitRouter = express.Router()
import Supabase_Client from "../utils/dbConnection.js";


// import data from "../eitsdata.js"

const { data: users, error } = await Supabase_Client
  .from('users')
  .select()


const { data: skills, error } = await Supabase_Client
  .from('skills')
  .select()

const { data: roles, error } = await Supabase_Client
  .from('roles')
  .select()

const { data: tskills, error } = await Supabase_Client
  .from('tskills')
  .select()


// Routes below

eitRouter.get('/eits', (req, res) => {
  // const person = Math.floor(Math.random() * 51)
  res.json(users)
})

eitRouter.get('/skills', (req, res) => {
  // const person = Math.floor(Math.random() * 51)
  res.json(skills)
})

eitRouter.get('/roles', (req, res) => {
  // const person = Math.floor(Math.random() * 51)
  res.json(roles)
})

eitRouter.get('/tskills', (req, res) => {
  // const person = Math.floor(Math.random() * 51)
  res.json(tskills)
})


export default eitRouter 