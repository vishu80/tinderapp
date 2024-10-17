const authToken=(req,res,next)=>{
    const token='abcdefghi';
    if(token=='abcdefghi'){
      // res.status(200).send({
      //   name:'vishal',
      //   age:23,
      //   email:'vishal@gmail.com'
      // })
      next()
    }
    else{
      res.status(401).send({error:'invalid token'})
    }
  
  }

const userAuth=(req,res,next) => {
    const token='ulogin';
    if(token=='ulogin')
      next()
    else
    res.status(403).send({error:'Unauthorized'});  
  
  }

module.exports={authToken,userAuth};