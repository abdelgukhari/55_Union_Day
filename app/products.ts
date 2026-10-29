export const products = [
{id:'NS-001',en:'Reverse Hourglass',ar:'الساعة الرملية المعكوسة',de:'Our roots become the shape of tomorrow.',da:'من جذورنا، يتشكّل الغد.',color:'#bba17b'},
{id:'NS-002',en:'Emirati Fingerprint',ar:'بصمة الهوية',de:'Seven emirates. One unmistakable identity.',da:'سبع إمارات. وهوية لا تشبه سواها.',color:'#637367'},
{id:'NS-003',en:'Pearl to Planet',ar:'من اللؤلؤ إلى الفضاء',de:'An enduring spirit of discovery.',da:'روح الاكتشاف… من أعماق البحر إلى الفضاء.',color:'#8d9fa3'},
{id:'NS-004',en:'Falcon Vision',ar:'رؤية الصقر',de:'A perspective that reaches beyond the horizon.',da:'رؤية تمتدّ إلى أبعد من الأفق.',color:'#9e7461'},
{id:'NS-005',en:'Agal Infinity',ar:'أصالة بلا حدود',de:'A thread of heritage. An infinity of possibilities.',da:'خيط من الأصالة. وآفاق بلا حدود.',color:'#565b52'},
{id:'NS-006',en:'Heritage to Future',ar:'من الأصالة إلى المستقبل',de:'The next chapter, shaped by our beginnings.',da:'فصل جديد، ترسمه حكاية البدايات.',color:'#a48d60'}];
// User-confirmed sales number. Override at build time when needed.
export const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971567933174').replace(/\D/g,'');
export type Product = typeof products[number];
