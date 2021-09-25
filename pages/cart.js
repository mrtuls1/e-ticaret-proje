import baseUrl from '../helpers/baseUrl'
import { parseCookies} from 'nookies'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useState} from 'react'

import StripeCheckout from 'react-stripe-checkout';

//burası sepet alanın dizaynı
const Cart  = ({error,products})=>{
    const {token} =  parseCookies()
    const router = useRouter()
    const [cProducts,setCartProduct] = useState(products)
    let price = 0
    //eğer tokensiz giriş denenirse veya tokende bir sorun oluşursa bu sayfa görünür
    if(!token){
        return(
            <div className="center-align">
                <h5>Sepeti görebilmek için giriş yapınız</h5>
                <Link href="/login"><a><button className="btn #1565c0 blue darken-3">Giriş Yap</button></a></Link>
            </div>
        )
    }
    //herhangi bir hatada oturum sonlanrılır.
    if(error){
        M.toast({html:error,classes:"red"})
        cookie.remove("user")
        cookie.remove("token")
        router.push('/login')

    }
    //sepetteki ürünü kaldırır
    const handleRemove = async (pid)=>{
     const res = await fetch(`${baseUrl}/api/cart`,{
           method:"DELETE",
           headers:{
              "Content-Type":"application/json",
              "Authorization":token 
           },
           body:JSON.stringify({
               productId:pid
           })
       })

       const res2 =  await res.json()
       setCartProduct(res2)
    }
    //sepetteki ürünlerin dizaynı. kaldırma butonu basıldığında handleRemove fonksiyonu çalışır
    const CartItems = ()=>{
        return(
            <>
              {cProducts.map(item=>{
                price = price + item.quantity * item.product.price
                  return(
                      <div style={{display:"flex",margin:"20px"}} key={item._id}>
                          <img src={item.product.mediaUrl} style={{width:"30%"}}/>
                          <div style={{marginLeft:"20px"}}>
                              <h6>{item.product.name}</h6>
                              <h6>{item.quantity} x  ₺ {item.product.price}</h6>
                              <button className="btn red" onClick={()=>{handleRemove(item.product._id)}}>Kaldır</button>
                          </div>
                      </div>
                  )
              })}
            </>
        )
    }
    
    const handleCheckout = async (paymentInfo)=>{
        console.log(paymentInfo)
        const res = await fetch(`${baseUrl}/api/payment`,{
            method:"POST",
            headers:{
               "Content-Type":"application/json",
              "Authorization":token 
            },
            body:JSON.stringify({
                paymentInfo
            })
        })
        const res2 = await res.json()
        M.toast({html: res2.mesage,classes:"green "})
        router.push('/')
    }
    //bu alan toplam sepet tutarını gösterir ve stripe eklentisi sayesinde ödeme işlemi yapılabilir
    const TotalPrice = ()=>{
        return(
            <div className="container" style={{display:"flex",justifyContent:"space-between"}}>
                <h5>Toplam {price}₺</h5>
                {products.length != 0
                //ödeme için stripe modülü sarmalanır 
                &&  <StripeCheckout
                name="My store"
                amount={price * 100}
                image={products.length > 0 ? products[0].product.mediaUrl:""}
                currency="INR"
                shippingAddress={true}
                billingAddress={true}
                zipCode={true}
                //bu key test içindir herhangi bir banka hesabıyla bağlantısı bulunmamaktadır.
                stripeKey="pk_test_51H6fgDEta3rHzkPYGgIOQZSFrukEzAl71AOnyAUjyGR8uJPDaGfALQYWre4F5g0Quyh9d7PTphh56SmUlhtsQYmd00DZwB9gMj"
                token={(paymentInfo)=>handleCheckout(paymentInfo)}
                >
                <button className="btn">Ödeme Yap</button>
                </StripeCheckout>
                }
              
            </div>
        )
    }
    return(
        <div className="container" >
          <CartItems />
          <TotalPrice />
        </div>

    )
}

//bu alanda doğrulama işlemleri yapılır. izinsiz erişimler engellenir.
export async function getServerSideProps(ctx){
    const {token} = parseCookies(ctx)
    if(!token){
        return {
            props:{products:[]}
        }
    }
    const res =  await fetch(`${baseUrl}/api/cart`,{
        headers:{
            "Authorization":token
        }
    })
    const products =  await res.json()
    if(products.error){
        return{
            props:{error:products.error}
        }
    }
    console.log("products",products)
    return {
        props:{products}
    }
}



export default Cart