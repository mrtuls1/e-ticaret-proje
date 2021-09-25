import Product from '../../../models/Product'
import initDB from '../../../helpers/initDB'
//bu alan dinamik ürün sayfaları için gerekli olan ürün getirme ve silme işlemi yapar
//database bağlantımızı yapıyoruz
initDB()

//ürün getirme ve silme işlemlerimizi yapıyoruz
export default async (req,res)=>{
    switch(req.method){
        case "GET":
          //ürün getirme
          await getProduct(req,res) 
          break; 
          //ürüm silme
        case "DELETE":
          await deleteProduct(req,res)
          break;
    }
    
}

//ürün getirme fonksiyonu
const getProduct = async (req,res)=>{

    const {pid } =  req.query
     const product = await Product.findOne({_id:pid})
     res.status(200).json(product)
}
//ürün silme fonksiyonu
const deleteProduct = async (req,res)=>{
    const {pid } =  req.query
    await Product.findByIdAndDelete({_id:pid})
    res.status(200).json({})
}