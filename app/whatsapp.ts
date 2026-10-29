import type { Product } from './products';
export type Language = 'ar' | 'en';
export function inquiryMessage(language: Language, product?: Product) {
 if (!product) return language === 'ar'
  ? 'مرحبًا Niche Star Advertising 👋\n\nأرغب في الاستفسار عن ستاندات عيد الاتحاد 55. هل يمكنكم مشاركتي التصاميم والأسعار والتفاصيل؟ شكرًا!'
  : 'Hello Niche Star Advertising!\n\nI’m interested in your Eid Al Etihad 55 Cinema Standees. Could you please share the designs, prices and details? Thank you!';
 return language === 'ar'
  ? `مرحبًا Niche Star Advertising 👋\n\nأعجبني تصميم ستاند عيد الاتحاد التالي:\n\nالتصميم: ${product.ar}\nالكود: ${product.id}\n\nأرغب في معرفة السعر والتفاصيل. شكرًا!`
  : `Hello Niche Star Advertising!\n\nI'm interested in this Eid Al Etihad Cinema Standee:\n\nDesign: ${product.en}\nCode: ${product.id}\n\nCould you please share the price and details? Thank you!`;
}
export function inquiryUrl(number:string, language:Language, product?:Product) {
 const digits=number.replace(/\D/g,'');
 if(!/^[1-9]\d{6,14}$/.test(digits)) throw new Error('Configure a valid international WhatsApp number.');
 return `https://wa.me/${digits}?text=${encodeURIComponent(inquiryMessage(language,product))}`;
}
