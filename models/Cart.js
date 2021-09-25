import mongoose from 'mongoose' //mongoose modülü import ediliyor
//bu alanda Cart collectionunu(Sepet) tanmlıyoruz

const {ObjectId} = mongoose.Schema.Types
const cartSchema  = new mongoose.Schema({
    //user tanımı 
    user:{
        type:ObjectId,
        ref:"User"
    },
    //ürün tanımı
    products:[
        {
            quantity:{type:Number,default:1},
            product:{type:ObjectId,ref:"product"}
       }
    ]
})


export default mongoose.models.Cart || mongoose.model("Cart",cartSchema)
