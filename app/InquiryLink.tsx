'use client';
import {ArrowUpLeft,ArrowUpRight,MessageCircle} from 'lucide-react';
import {whatsappNumber,type Product} from './products';
import {inquiryUrl,type Language} from './whatsapp';
declare global {interface Window {dataLayer?:Record<string,unknown>[]}}
export default function InquiryLink({language,product,placement,children,className=''}:{language:Language;product?:Product;placement:string;children:React.ReactNode;className?:string}) {
 const Arrow=language==='ar'?ArrowUpLeft:ArrowUpRight;
 return <a className={`inquiry-link ${className}`} href={inquiryUrl(whatsappNumber,language,product)} target="_blank" rel="noopener noreferrer" data-product-id={product?.id} onClick={()=>{
  // CTA clicks are intent signals, never confirmed inquiries or sent messages.
  const event={event:'whatsapp_cta_click',product_code:product?.id??null,product_name:product?(language==='ar'?product.ar:product.en):null,language,placement};
  window.dataLayer=window.dataLayer||[];window.dataLayer.push(event);
  window.dispatchEvent(new CustomEvent('niche:whatsapp-click',{detail:event}));
 }}><MessageCircle size={17} strokeWidth={1.6}/><span>{children}</span><Arrow className="cta-arrow" size={19}/></a>;
}
