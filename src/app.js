const express = require("express");
const {authToken,userAuth} =require('../src/middleware/adminAuth')
const app = express();
const {mongodbConnection}=require('../dbConfig.js')
const {userModel} = require('../src/models/userModels.js')
console.log(userModel,'user')
//use cases of use of express


// app.use('/admin',authToken
// )

// app.get("/admin/adminDetails", (req, res) => {
//   res.send({
//     name: 'vishal',
//     id:'12',
//     email:'vishal@gmail.com',
//   });
// });
// app.get("/admin/adminName", (req, res) => {
//   res.send({
//     name: 'vishal',
//   });
// });

// app.use('/user',userAuth)
// app.get('/user/userDetails', (req, res,next) => {
// res.send({name:'vishal',place:'jamshep',email:'vishal@gmail.com'})

// })

// app.post('/user/userDetails/postmethod', (req, res,next) => {
//   res.send({name:'vishal',place:'jamshep',email:'vishal@gmail.com'})
  
//   })

  // app.use('/', (err,req, res,next)=>{
  //   console.log('it was called or not')
  //   if(err)
  //     res.status(500).send('something went wrong')
  //   // throw new Error('something went wrong')
  
  //   // throw new Error('something went wrong')

  // })
  // app.get('/error/error_handling', (err,req, res, next)=>{
  //   console.log('it was called or not')
  //   res.status(500).send('something went wrong')
  //   // throw new Error('something went wrong')
  // })

app.use(express.json())//this is used by express to recognise the incoming request object as a JSON object
app.post('/signUp',async (req, res, next) => {
  const user=new userModel(req.body); //creating a new instance of userModel 
  try{
    await user.save() // data will be store in mongodb 
    res.send({message:'user created successfully'})
  }
  catch(error){
    console.log(error)
    res.status(400).send({error:error.message})
  }
});

  mongodbConnection.then(()=>{
      console.log('Db connection established')
      app.listen(7777,()=>{
        console.log('server is listening on port 7777')
      })
  }
).catch(err=>{
  console.log(err)
})


