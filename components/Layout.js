//Bu alanda sitenin layout dizaynı bulunmaktadır
import NavBar from "./Navbar"; //NavBar componentini import edilir
import Head from 'next/head' //head modülü import edilir

const layout=({children})=>{
    return(
        //Bu alanda seo için gerekli head(Head) modülü ve geziti çubuğu için NavBar modülü bulunmaktadır
        //children parametresi görüntülenecek sayfalar içindir.
        <>
        <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
        <link rel="stylesheet" href="/style.css"/>
        </Head>
        <NavBar />
         {children}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </>
    )
}


export default layout