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


app.post('/user/login', async (req, res) => {
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

app.get('/room', (req,res)=> {
  res.json(rooms)
})
async function getLastMessagesFromRoom(room){
  let roomMessages = await Message.aggregate([
    {$match: {to: room}},
    {$group: {_id: "$date",messagesByDate: {$push : "$$ROOT"}}}
  ])
   return roomMessages;
}

function sortRoomMessagesByDate(messages){
  return messages.sort(function(a,b){
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');
    date1 = date1[2] + date1[0] + date1[1]
    date2 = date2[2] + date2[0] + date2[1]

    return  date1 < date2 ? -1 : 1
  })
}

//socket connection 
io.on("connection", (socket)=> {
  socket.on('new-user', async()=> {
    const members = await User.find();
    io.emit('new-user', members)
  })
  socket.on('join-room' ,async(room)=> {
    socket.join(room);
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit('room-messages', roomMessages);
  })
})

server.listen(PORT, () => {
  console.log('listen to port', PORT)
})