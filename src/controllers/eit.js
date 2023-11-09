import express from 'express';
const eitRouter = express.Router();
import Supabase_Client from '../utils/dbConnection.js';

// import data from "../eitsdata.js"

const { data: users } = await Supabase_Client
  .from('users')
  .select()


const { data: skills } = await Supabase_Client
  .from('skills')
  .select()

const { data: roles } = await Supabase_Client
  .from('roles')
  .select()

const { data: tskills } = await Supabase_Client.from('tskills').select();


// Routes below

eitRouter.get('/eits', (req, res) => {
  // const person = Math.floor(Math.random() * 51)
  res.json(users);
});

eitRouter.get('/skills', (req, res) => {
  // const person = Math.floor(Math.random() * 51)
  res.json(skills);
});

eitRouter.get('/roles', (req, res) => {
  // const person = Math.floor(Math.random() * 51)
  res.json(roles);
});

eitRouter.get('/tskills', (req, res) => {
  // const person = Math.floor(Math.random() * 51)
  res.json(tskills);
});

// Adding skills
eitRouter.post('/skills', async (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.code) {
    return res.status(400).json({
      error: 'Some data is missing',
    });
  }

  const { name, code, category } = body;


  const { data, error } = await Supabase_Client
    .from('skills')
    .insert({
      scode: code,
      sname: name,
      scategory: category,
    }).select()
  res.json(data)
})

// Update skills / Users
eitRouter.put('/users/:id', async (req, res, next) => {
  const body = req.body;
  const id = req.params.id;

  const obj = JSON.parse(JSON.stringify(body));


  const { data, error } = await Supabase_Client
    .from('users')
    .update(obj)
    .eq('id', id)
    .select()
  res.json(data)
})

export default eitRouter;
