//Bu alanda sitenin Hesap kısmında root yetkisine sahip olanlara tüm kullanıcıların bilgisi listelenmektedir
//Listelenen kullanıcının rolleri değiştirilmektedir
import {useState,useEffect} from 'react'//state değişkenleri kullanabilmek için useState ve useEffect kütüphanesini import ediyoruz
import {parseCookies} from 'nookies'    //çerez işlemleri için nookies modülünü import ediyoruz
import baseUrl from '../helpers/baseUrl' //Site Url sini alabilmek için baseUrl componentini import ediyoruz

function UserRoles(){
    //kullanıcıları almak için dizi oluşturuyoruz
    const [users,setUsers] = useState([])
    //kullanıcı oturumu için token değişkeni oluşturuyoruz
    const {token} = parseCookies()
    
    //Bu alanda kullanıcıların rollerinin değişimi sağlandığında anlık reaksiyon göstermek için Effect Hook kullandık
    useEffect(()=>{
       fetchUser()
     },[])
     const fetchUser = async ()=>{
     const res =  await fetch(`${baseUrl}/api/users`,{
          headers:{
              "Authorization":token
          }
      })
      const res2 = await res.json()
      console.log(res2)
      setUsers(res2)
     }

     //kullanıcıların role değişimleri için fonksiyon
     const handleRole = async (_id,role)=>{
        //site bilgilerini res değişkenine tanımlıyoruz
        const res =  await fetch(`${baseUrl}/api/users`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            },
            //json formatını strig formatına çeviriyoruz
            body:JSON.stringify({
                _id,
                role
            })
            
        })
        //alınan değerleri res2 değişkeninie aktarıyoruz
        const res2 = await res.json()
        console.log(res2)
        //burda kullanıcı rolünü kontrol edip tersini return ediyoruz. kontrolü email değişkeniyle yapıyoruz.
       const updatedUsers =  users.map(user=>{
           if((user.role != res2.role) && (user.email == res2.email)){
               return res2
           }else{
              return user
           }
       })
       //update işlemini gerçekleştiriyoruz
       setUsers(updatedUsers)
     }

     //kullanıcılar tablosu dizaynı
     //onClick eventiyle handleRole metodunu çalıştırıyoruz
     return(
         <>
          <h4>Kullanıcılar</h4>
          <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Yetki</th>
          </tr>
        </thead>
        <tbody>
            {users.map(item=>{
                return(
                  <tr>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td onClick={()=>handleRole(item._id,item.role)}>{item.role}</td>
                       
                    </tr>  
                )
            })}
            
           
            </tbody>
        </table>
            
         </>
     )
}

export default UserRoles