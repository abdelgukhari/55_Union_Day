import type { Metadata } from 'next';
import './exhibition.css';
export const metadata: Metadata = {
 metadataBase: new URL('https://niche-star-etihad55.lovelymyna21.chatgpt.site'),
 title:'نيش ستار | خارج الإطار — عيد الاتحاد 55',
 description:'ستاندات مبتكرة لعيد الاتحاد 55، بتصاميم تعكس هويتنا وتترك أثرًا. Beyond the Frame: discover Eid Al Etihad Cinema Standees and enquire directly on WhatsApp.',
 openGraph:{title:'نيش ستار | خارج الإطار — Beyond the Frame',description:'هوية راسخة. حضور بلا حدود. Creative Eid Al Etihad 55 Cinema Standees.',locale:'ar_AE',alternateLocale:'en_AE',type:'website',images:[{url:'/designs/ns-001-1100.webp',width:1100,height:1375,alt:'Reverse Hourglass — concept standee'}]},
 robots:{index:true,follow:true},
};
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="ar" dir="rtl"><body>{children}</body></html> }
