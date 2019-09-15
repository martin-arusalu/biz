const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const cp = require('cookie-parser');
const passport = require('passport');

const { env } = require('./config');
const usersRoutes = require('./routes/users');
const companiesRoutes = require('./routes/companies');
const productsRoutes = require('./routes/products');
const companyProductRoutes = require('./routes/company-products');
const authRoutes = require('./routes/auth');
const initDb = require('./db');
const passportConfig = require('./passport-config');

initDb();
const app = express();

app.use(cp());
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(cors());
app.use(passport.initialize());
passportConfig(passport);

app.get('/', (req, res) => res.send('Hi!'));

app.use('/auth', authRoutes);

app.use('/users',
passport.authenticate('jwt', {session: false}),
usersRoutes);

app.use('/companies',
passport.authenticate('jwt', {session: false}),
companiesRoutes);

app.use('/products',
passport.authenticate('jwt', {session: false}),
productsRoutes);

app.use('/company-products',
passport.authenticate('jwt', {session: false}),
companyProductRoutes);

app.listen(env.port, () => console.log(`Visit ${env.url}:${env.port}`));