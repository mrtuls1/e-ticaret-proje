import jwt from 'jsonwebtoken'
//bu alanda kullanıcı doğrulaması yapmak için modül bulunuyor 
function Authenticated(icomponent){
    return (req,res)=>{
       //parametre olarak gelen requestin headers verilerini authorizationa tanımlıyoruz 
        const {authorization} = req.headers
        //eğer headers yoksa giriş yap uyarısı veriyoruz
        if(!authorization){
            return res.status(401).json({error:"Lütfen Giriş Yapın"})
        }
        try{
            //giriş yapan kullanıcın verileri jwt sayesinde kontrol edilerek user id sini değişkene tanımlıyoruz
              const {userId} = jwt.verify(authorization,process.env.JWT_SECRET) 
              req.userId = userId
              //parametre olarak gelen icompenent nesneyile req,res parametrelerimiz işleme girer.
              return icomponent(req,res)
        }catch(err){
            //herhangi bir sorundan kaynaklı hatalar için hata fırlatır.
            console.log(err)
            return res.status(401).json({error:"Bir Sorun Oluştu"})
        }
       
    }
}


export default Authenticated