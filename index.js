import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validation/auth.js';
import UserModel from './models/User.js';

mongoose
  .connect(
    'mongodb+srv://kingovalexey:jXQpI4WiMzuEN3VS@cluster0.ceihoz1.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB - ok!');
  })
  .catch(err => {
    console.log('DB ERROR: ', err);
  });
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/auth/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash,
  });

  const user = await doc.save();

  res.json(user);
});

app.get('/auth/login', (req, res) => {
  res.send('get request on route /auth/login - ok!');
});

app.post('/auth/login', (req, res) => {
  console.log('asdf', req.body);
  //   console.log(req.body.email);

  if (req.body.email === 'test@test.test') {
    const token = jwt.sign(
      {
        email: req.body.email,
        fullName: 'kingov alexey',
      },
      'secret123'
    );
  }

  res.json({
    success: true,
    token,
  });
});

app.listen(4444, err => {
  if (err) {
    return console.log('listen_port_error:', err);
  }
  console.log('server worker - ok!');
});
