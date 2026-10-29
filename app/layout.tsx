import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'نيش ستار | عيد الاتحاد 55 — Cinema Standees', description: 'قصّات تترك أثراً. تصاميم ستاندات سينمائية لعيد الاتحاد 55. Extraordinary UAE National Day die-cut standees. Select your concepts and request a quotation.', openGraph: {title: 'Niche Star | Eid Al Etihad 55',description:'هوية راسخة. وأفكار تتجاوز المألوف. Rooted in Identity. Beyond the Ordinary.',locale:'ar_AE',alternateLocale:'en_AE'} };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="ar" dir="rtl"><body>{children}</body></html> }
