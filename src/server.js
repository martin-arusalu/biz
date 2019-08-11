import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import env from './config';
import bodyParser from 'body-parser';
import User from './models/User';

mongoose.connect(env.dbUrl)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/', (req, res) => res.send('Hi!'));

  app.get('/users', (req, res) => {
    User.find((err, users) => {
      res.json(users);
    })
  });

  app.post("/register", (req, res) => {
    User.create({
      name: req.body.name,
      password: req.body.password,
      money: 1000
    }, (err, newUser) => {
      res.json(newUser);
    });
  });

  app.post('/login', (req, res) => {
    User.find({ name: req.body.name, password: req.body.password }, (err, user) => {
      if (user && user.length) {
        res.json(user);
      } else {
        res.send(false);
      }
    })
  })

  app.listen(env.port, () => console.log(`Visit ${env.url}:${env.port}`));
});