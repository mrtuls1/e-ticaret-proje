import Cart from '../../models/Cart' //cart modelini import eder
import Authenticated from '../../helpers/Authenticated' //user doğrulması için authenticated i import eder
import initDb from '../../helpers/initDB' // database bağlantısı için initDB import eder

//database bağlantısı sağlanır
initDb()

//burda get put ve delete işlemleri yapılır
export default async (req,res)=>{
    switch(req.method){
        case "GET":
            //kullanıcı sepeti getirme fonksiyonu
            await fetchUserCart(req,res)
            break
        case "PUT":
            //sepete ürün ekleme foksiyonu
            await addProduct(req,res)  
            break   
        case "DELETE":
            //sepetten ürün silme fonksiyonu
            await removeProduct(req,res) 
            break   
    }
}


//burda kullanıcı sepeti autnhenticated ile doğrulanır ver cart değişkenine tanımlanır.
const fetchUserCart =  Authenticated(async (req,res) =>{
         const cart =  await Cart.findOne({user:req.userId})
                       .populate("products.product")
        //işlem başarılı olduğunda 200 ok kodu gönderilir.
         res.status(200).json(cart.products)
})

//burda sepete ürün ekleme işlemi yapılır ve 
const addProduct = Authenticated(async(req,res)=>{
     const {quantity,productId} = req.body
     const cart =  await Cart.findOne({user: req.userId})
     const pExists =  cart.products.some(pdoc => productId === pdoc.product.toString() )
     console.log(pExists)
   
     if(pExists){
        await Cart.findOneAndUpdate(
            {_id:cart._id,"products.product":productId},
            {$inc:{"products.$.quantity":quantity}}
        )
     }else{
         const newProduct = {quantity,product:productId}
         await Cart.findOneAndUpdate(
             {_id:cart._id},
             {$push:{products:newProduct}}
             )
     }
     res.status(200).json({message:"product added to cart"})


})

//burda ürün silme işlemi yapılır
const removeProduct = Authenticated(async (req,res)=>{
    const {productId} = req.body
    const cart =   await Cart.findOneAndUpdate(
        {user:req.userId},
        {$pull:{products:{product:productId}}},
        {new:true}
    ).populate("products.product")
    res.status(200).json(cart.products)
})