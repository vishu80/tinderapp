const mongoose=require('mongoose');
const dbUrl ='mongodb://localhost:27017/tinderApp';
// const connections=mongoose.connect(dbUrl);
const mongodbConnection=mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, })


module.exports={mongodbConnection}