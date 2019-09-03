import express from 'express';
import cors from 'cors';
import env from './config';
import bp from 'body-parser';
import usersRoutes from './routes/users';
import companiesRoutes from './routes/companies';
import productsRoutes from './routes/products';
import companyProductRoutes from './routes/company-products';
import authRoutes from './routes/auth';
import initDb from './db';
import cp from 'cookie-parser';
import passport from 'passport';

initDb();
const app = express()
app.use(passport.initialize());
require('./passport-config')(passport);
app.use(cp());
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(cors());

app.use((req,res,next) => {
  if (req.body) console.log(req.body);
  if (req.params) console.log(req.params);
  if(req.query) console.log(req.query);
  console.log(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
  next();
});

app.get('/', (req, res) => res.send('Hi!'));
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/companies', companiesRoutes);
app.use('/products', productsRoutes);
app.use('/company-products', companyProductRoutes);

app.get('/protected',
  passport.authenticate('jwt', {session: false}),
  (req,res) => {
    res.send('yeehaaw');
  }
);

app.listen(env.port, () => console.log(`Visit ${env.url}:${env.port}`));