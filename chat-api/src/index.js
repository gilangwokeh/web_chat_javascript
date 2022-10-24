const cors = require('cors')
const express = require('express');
const app = express();
const rooms = ['general', 'tech', 'finance', 'crypto'];
const User = require('./model/user')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('./user', require('./routes/userRouters'))
require('./connection')
app.get("/hello", (req, res) => {
  res.send('hello word')
})

app.post('/register', async (req, res) => {
  try {
    const { name, email, password, picture } = await req.body;
    console.log(req.body);
    const user = await User.create({ name, email, password, picture })
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if (e.code === 11000) {
      msg = "user already exist"
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json({
      message: "error :" + e
    })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(e.message)
  }
})
const server = require('http').createServer(app);
const PORT = 8000;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', "POST",]
  }
})

server.listen(PORT, () => {
  console.log('listen to port', PORT)
})