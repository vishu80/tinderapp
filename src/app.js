const express = require("express");
const {authToken,userAuth} =require('../src/middleware/adminAuth')
const app = express();

//use cases of use of express


app.use('/admin',authToken
)

app.get("/admin/adminDetails", (req, res) => {
  res.send({
    name: 'vishal',
    id:'12',
    email:'vishal@gmail.com',
  });
});
app.get("/admin/adminName", (req, res) => {
  res.send({
    name: 'vishal',
  });
});

app.use('/user',userAuth)
app.get('/user/userDetails', (req, res,next) => {
res.send({name:'vishal',place:'jamshep',email:'vishal@gmail.com'})

})

app.post('/user/userDetails/postmethod', (req, res,next) => {
  res.send({name:'vishal',place:'jamshep',email:'vishal@gmail.com'})
  
  })
app.listen(7777);
