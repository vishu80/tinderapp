const express=require('express');
const app = express();

app.get('/user/:name', (req, res) => {
  res.send({
    name:req.params.name,
    id:req.query.id,
    value:req.query.value
  });
});
app.get(/a/,(req, res) => {

  res.send('test the regex api request');
})
app.post('/user',(req,res)=>{
  res.send('test the  api request post api');

})
app.delete('/user',(req,res)=>{
  res.send('First api request deleted');

})
app.put('/',(req,res)=>{
  res.send('Welcome to my API put');
 });




app.listen(7777)