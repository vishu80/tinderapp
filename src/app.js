const express = require("express");
const app = express();

// app.get("/user/:name", (req, res) => {
//   res.send({
//     name: req.params.name,
//     id: req.query.id,
//     value: req.query.value,
//   });
// });
// // app.get(/a/, (req, res) => {
// //   res.send("test the regex api request");
// // });
// app.post("/user", (req, res) => {
//   res.send("test the  api request post api");
// });
// app.delete("/user", (req, res) => {
//   res.send("First api request deleted");
// });


// app.put("/", (req, res) => {
//   res.send("Welcome to my API put");
// });

//Routing and multple middleware for expres

const cb1=(req,res,next)=>{
  console.log('cb1 function was called');
  next();

}

const cb2=(req,res,next)=>{
  console.log('cb2 functionwas called');
  next();
}

const cb3=(req,res,next)=>{
console.log('cb3 functionwas called');
res.send('finally cb3 was called')
}
app.post(
  "/admin",[cb1, cb2, cb3]

);
app.listen(7777);
