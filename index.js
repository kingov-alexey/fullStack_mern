import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

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
