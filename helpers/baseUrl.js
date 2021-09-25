//Bu alanda projedeki url değişiklerinden etkilenilmemesi için dinamik bir url tanımlanmıştır
//vercel sayesinde aşağıdaki urle projemizi göndermiş olduk
const baseUrl = process.env.NODE_ENV === 'production' ? "eticaret2021.vercel.app": "http://localhost:3000"
export default baseUrl
