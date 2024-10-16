const express=require('express');
const app = express();

app.use('/hello', (req, res) => {
  res.send('Hello World!');
});
app.use('/',(req,res)=>{
  res.send('Welcome to my API');
 });


app.use('/123',(req,res)=>{
    res.send('First api request');

})
app.use('/test',(req,res)=>{
    res.send('test the  api request');

})
app.listen(7777)