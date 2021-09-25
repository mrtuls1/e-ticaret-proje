//Bu alanda sitenin gezinme çubuğu dizaynı bulunmaktadır.
import Link from 'next/link' //Linkleme için kullanılan link modülü import edilir
import {useRouter} from 'next/router' ///sayfa yönlendirmeleri için router modülü import edilir
import {parseCookies} from 'nookies' //cookie işlemleri için nookies modülü import edilir 
import cookie from 'js-cookie' //cookie işlemleri için cookie modülü import edilir
const NavBar = ()=>{
  //sayfa yönlendirmesi için router değişkeni
   const router = useRouter()
  //kullanıcı çerezi için cookieuser değişkeni
   const cookieuser = parseCookies()
  //kullanıcı bilgisi için user değişkeni
   const user =  cookieuser.user ? JSON.parse(cookieuser.user) : ""
  //navbarda aktif sayfanın belirtilmesi için fonksiyon
   function isActive(route){
     if(route== router.pathname){
         return "active"
     }
     else ""
  }
    //Navbar dizaynı 
    return(
        <nav>
        <div className="nav-wrapper #1565c0 blue darken-3">
          <Link href="/"><a className="brand-logo left">MertApp</a></Link>
          <ul id="nav-mobile" className="right">
          <li className={isActive('/cart')}><Link href="/cart"><a>Sepet</a></Link></li>
            {
            //eğer kullanıcı admin veya root ise navbarda ürün ekle butonu görünür
            (user.role == 'admin' || user.role == 'root') &&
              <li className={isActive('/create')}><Link href="/create"><a>Ürün Ekle</a></Link></li>
            }
        
            {
            //kullanıcı user,admin veya root ise Hesap ve Çıkış butonu görünür
            //çıkış butonu oluşturulan token ve user çerezini kaldırır. Ardından giriş sayfasına yönlendirir.
            //kullanıcı herhagi bir giriş yapmamışsa sadece login ve kayıt ol butonları görünür
            user ?
            <>
                <li className={isActive('/account')}><Link href="/account"><a>Hesap</a></Link></li>
                <li><button className="btn red" onClick={()=>{
                  cookie.remove('token')
                  cookie.remove('user')
                  router.push('/login')
                }}>Çıkış</button></li>  
             </>   
            :
            <>
            <li className={isActive('/login')}><Link href="/login"><a>Giriş Yap</a></Link></li>
            <li className={isActive('/signup')}><Link href="/signup"><a>Kayıt Ol</a></Link></li>
            </>
            }
           
           
          </ul>
        </div>
      </nav>
    )
}


export default NavBar