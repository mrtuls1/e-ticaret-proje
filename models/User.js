import mongoose from 'mongoose'//mongoose modülü import ediliyor
//bu alanda User collectionunu(kullanıcılar) tanmlıyoruz

const userSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true
   },
   email:{
       type:String,
       required:true,
       unique:true
   } ,
   password:{
       type:String,
       required:true
   },
   role:{
       type:String,
       required:true,
       default:"user",
       enum:["user",'admin','root']
   }
},{
  timestamps:true  
})


export default  mongoose.models.User || mongoose.model('User',userSchema)