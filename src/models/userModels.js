const mongoose =require('mongoose')
const validationFromlibrary =require('validator');

const userSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        minLength:5,
        maxLength:20,
        // unique:true

    },
    lastName:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate: function(value){
        if(!validationFromlibrary.isEmail(value)){
            throw new Error('Email is not valid');
        }

      }},
    age:{
        type:Number,
        // required:true
        min:18,
        max:99
    },
    password:{
        type:String,    
        required:true
    },
    photoUrl:{
    type:String,
    default:'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg',
    validate(value){
        if(!validationFromlibrary.isURL(value))
            throw new Error('Invalid photoUrl')
    
    }        
    },
    about:{
        type:String,
        default:'This is a default user'
    },
    skills:{
        type:[String],
        validate:function(value){
            if(value.length>5){
                throw new Error('Skills should have at least 5 items')
            }
        }
    },
    gender:{
        type:String,
        validate:function(value){ //this validate value only be called when user is created not for update and deleter
            if(!['male', 'female','other'].includes(value)){
                throw new Error('Invalid gender')
    
        }
    },
    }
},{timestamps:true})

const userModel=mongoose.model('User',userSchema)
module.exports={userModel}