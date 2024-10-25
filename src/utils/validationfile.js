const validEmail=require('validator')

const validateEmail=async(email)=>{

    let checkEmail=validEmail.isEmail(email)
    return checkEmail
}

module.exports={validateEmail};