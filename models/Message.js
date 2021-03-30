const mongoose = require('mongoose');
const dayjs = require('dayjs');

const EtudiantSchema = new mongoose.Schema({
  content: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  date_creation: { type: Date, expires: '1440m', default: Date.now },
  imgdata: {
    type: Buffer,
  },
});


const Message = mongoose.model('messages', EtudiantSchema);
/* Message.createIndexes().then(res=>{
    console.log(res)
}).catch(err=>console.log(err)) */
module.exports = Message ;
