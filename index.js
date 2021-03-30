const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
var compression = require('compression');
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
var Message = require('./models/Message');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(compression());

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: '*' },
});
const pool = require('./database/config');
mongoose
.connect(
  'mongodb+srv://hmedhappy:yasmineahmed15@cluster0.5ayti.mongodb.net/hmedchat?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB Connected"));

app.get('/messages', async (req, res) => {
  try {
    var ress = await Message.find();
    console.log({ress});
    res.json(ress);
  } catch (err) {
    res.status(200).json({ err });
  }
});

app.post('/messages', async (req, res) => {
  var message = new Message(req.body);
  message.save();
  const { content, username } = req.body;
  /* var results = await pool.query(`
    INSERT INTO public.messages(content, date_creation, username)
	VALUES ('${content}', '13/09/1999', '${username}');`);
  console.log(results.rowCount); */
  res.json({message:"Message added"})
});

app.get('/', (req, res) => {
  res.send('welcome to th eserver');
});

io.on('connection', (socket) => {
  socket.on('message', ({ content, username, imgdata }) => {
    io.emit('new-message', { content, imgdata, username });
  });
});

http.listen(PORT, () => console.log('listening to tehp ort 4000'));
