const express = require('express');
const authRouter = express.Router();
// визначимо домашній роутер
authRouter.get('/login', (req, res) => {
res.send('Login success');
});
// визначимо роутер about
authRouter.get('/register', (req, res) => {
res.send('Registered');
});
module.exports = authRouter;
