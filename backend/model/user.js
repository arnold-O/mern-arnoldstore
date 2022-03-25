const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        require:true,
        trim:true,
        min:3,
        max:15
    },
    lastName:{
        type:String,
        require:true,
        trim:true,
        min:3,
        max:15

    },
    username:{
        type:String,
        unique:true,
        require:true,
        trim:true,
        index:3,
        lowercase:true

    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:"user"
    },
    contactNumber: {
        type:String
    },
    profilePic:{
        type:String
    }

},{timestamps:true})

userSchema.virtual('password')
.set(function(password){
    this.hash_password= bcrypt.hashSync(password, 10)
})
userSchema.virtual('fullName')
.get(function(){
   return  `${this.firstName} ${this.lastName}`
})

userSchema.methods= {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
}

module.exports = mongoose.model('User', userSchema)
