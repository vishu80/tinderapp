const express = require("express");
const {authToken,userAuth} =require('../src/middleware/adminAuth')
const app = express();
const {mongodbConnection}=require('../dbConfig.js')
const {userModel} = require('../src/models/userModels.js')

const {validateEmail} = require('../src/utils/validationfile.js');
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
 
  try{
    const user=new userModel(req.body); //creating a new instance of userModel 
    const {firstName,lastName,password,email}=req.body
    if(!validateEmail(email))
    {
      throw new Error('Invalid Email')
    }
    else 
    {
    await user.save({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password
    }) // data will be store in mongodb 
    res.send({message:+'user created successfully'})
  }
  }
  catch(error){
    res.status(400).send({message:error.message})
  }
});

app.get('/users', async (req, res) => {
  
  try{
  // const user = await userModel.find({}); // this will return all the user passing empty object inside find method
  const user=await userModel.findOne({email:req.body.email}); //this will return only one user from the database based on email
  res.send(user)
  }
  catch(error){
    console.log(error)
    res.status(500).send({error:error.message})
  }

})

app.delete('/users',async function(req, res) {

  const id=req.body.id
  try{
    const user=await userModel.findByIdAndDelete(id);
    if(!user) return res.status(404).send({message:'User not found'})
    res.send(user)
  }
  catch(error){
    console.log(error)
    res.status(500).send({error:error.message})
  }

})

app.put('/users',async function(req, res) {

  const id=req.body.id
  try{
    const user=await userModel.findByIdAndUpdate(id,req.body,{      runValidators:true
    });
    if(!user) return res.status(404).send({message:'User not found'})
    res.send(user)
  }
  catch(error){
    console.log(error)
    res.status(500).send({error:error.message})
  }

})
app.patch('/users/:userId',async function(req, res) {
  const id=req.params?.userId
  // const id=req.body.id
  try{
    const ALLOWED_TO_UPDATE=['firstName', 'lastName', 'skills', 'photoUrl','password','gender']
    const updateKeys=Object.keys(req.body).every(key=>ALLOWED_TO_UPDATE.includes(key))
    if(!updateKeys)
    {
      throw new Error('Updation of email id is not allowed')
      // res.status(404).send({message:'Updation of email address is not allowed'})//this causing cannot set headers after they send to clien
    }
    const user=await userModel.findByIdAndUpdate(id,req.body,{
    runValidators:true // here runvalidators is required for to run validators while updating
    });  
    if(!user) return res.status(404).send({message:'User not found'})
    res.send(user)
  }
  catch(error){
    console.log(error)
    res.status(500).send("message:"+error.message)
  }

})

//email id should not be updated 

  mongodbConnection.then(()=>{
      console.log('Db connection established')
      app.listen(7777,()=>{
        console.log('server is listening on port 7777')
      })
  }
).catch(err=>{
  console.log(err)
})


