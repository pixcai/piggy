import { Router } from 'express';
import User from '../data/models/User';

const api = new Router();

api.post('/login', (req, res) => {
  req.login(req.body, err => {
    if (err) {
      return res.json();
    }
    return res.redirect('/');
  });
});

api.post('/register', (req, res) => {
  // const { username, email, password } = req.body;

  User.create(req.body).then((err, user) => {
    if (err) {
      return res.json({ message: 'user exists' });
    }
    return res.json({ message: 'success', data: user });
  });
});

api.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

export default api;
