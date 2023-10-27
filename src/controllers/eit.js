import express from 'express';
const eitRouter = express.Router();
import Supabase_Client from '../utils/dbConnection.js';

// import data from "../eitsdata.js"

const { data: users } = await Supabase_Client.from('users').select();

const { data: skills } = await Supabase_Client.from('skills').select();

const { data: roles } = await Supabase_Client.from('roles').select();

const { data: tskills } = await Supabase_Client.from('tskills').select();

const { data: abscrow_store } = await Supabase_Client.from(
  'abscrow_store'
).select();
const { data: abscrow_users } = await Supabase_Client.from(
  'abscrow_users'
).select();

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

eitRouter.get('/abscrow_store', (req, res) => {
  // const person = Math.floor(Math.random() * 51)
  res.json(abscrow_store);
});

eitRouter.get('/abscrow_users', (req, res) => {
  // const person = Math.floor(Math.random() * 51)
  res.json(abscrow_users);
});

eitRouter.get('/abscrow_users/user/:email', (req, res) => {
  const userEmail = req.params.email; // Get the email parameter from the URL

  res.send('hhhhhhhhy');

  // // Search for the user in the abscrow_store array by email
  // const user = abscrow_users.find(user => user.email === userEmail);

  // if (user) {
  //   res.json(user); // User found and returned as JSON
  // } else {
  //   res.status(404).json({ message: 'User not found' }); // User not found, respond with a 404 status
  // }
});

eitRouter.post('/api/shop', async (req, res, next) => {
  const body = req.body;

  if (!body.storeOwner || !body.storeName) {
    return res.status(400).json({
      error: 'missing storeOwner or storeName',
    });
  }

  // Define the SQL query to insert data into the PostgreSQL database
  // const insertQuery = `
  //   INSERT INTO shops (store_id, store_name, store_owner, total_sales, num_products)
  //   VALUES ($1, $2, $3, $4, $5)
  //   RETURNING *;
  // `;

  const { storeId, storeName, storeOwner, totalSales, numProducts } = body;


  const {data, error} = await Supabase_Client
        .from('abscrow_store')
        .insert({
            storeId: storeId,
            storeName: storeName,
            storeOwner: storeOwner,
            totalSales: totalSales,
            numProducts: numProducts
        })
      })
  // Execute the SQL query
//   db.abscrow_store(insertQuery, [storeId, storeName, storeOwner, totalSales, numProducts])
//     .then((savedShop) => {
//       res.status(201).json(savedShop); // Respond with a 201 Created status
//     })
//     .catch((error) => next(error));
// });

export default eitRouter;
