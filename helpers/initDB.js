import mongoose from 'mongoose' // mongoDB bağlantısı yapmak için mongoose eklentisi import ediliyor
//bu alanada dökümanda belirtilen yönergeler doğrultusunda bağlantı konfigürasyonu yapılmıştır
//model sınıflarında collectionlar çekilmeden önce bu modül çalıştırılmalı
function initDB(){

    if(mongoose.connections[0].readyState){
        //bağlantı sağlandığında verilen console metni
        console.log("alredy connected")
        return
    }
    //.env.local kısmında belirtilen mongoDB stringini alır
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    //bağlantı başarılı bir şekilde sağlandığında verilen uyarı
    mongoose.connection.on('connected',()=>{
        console.log("connected to mongo")
    })
    //bağlantı başarısız olduğunda verilen uyarı
    mongoose.connection.on('error',(err)=>{
        console.log("error connecting",err)
    })
}


export default initDB