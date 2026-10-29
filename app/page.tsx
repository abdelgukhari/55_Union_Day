'use client';

import {useEffect,useState} from 'react';
import Image from 'next/image';
import {ArrowDown,ArrowUpLeft,ArrowUpRight} from 'lucide-react';
import {products} from './products';
import InquiryLink from './InquiryLink';
import StandeeArt from './StandeeArt';
import type {Language} from './whatsapp';

export default function Page(){
 const [language,setLanguage]=useState<Language>('ar');
 const ar=language==='ar';
 const t=(arabic:string,english:string)=>ar?arabic:english;
 const Arrow=ar?ArrowUpLeft:ArrowUpRight;
 useEffect(()=>{
  try {
   const saved=localStorage.getItem('niche-language');
   if(saved==='en'||saved==='ar') setLanguage(saved);
   // Remove the old quotation draft: this campaign no longer collects customer details.
   localStorage.removeItem('niche55');
  }catch{}
 },[]);
 useEffect(()=>{
  document.documentElement.lang=language;
  document.documentElement.dir=ar?'rtl':'ltr';
  document.title=t('نيش ستار | خلّ حضورك خارج الإطار — عيد الاتحاد 55','Niche Star | Go Beyond the Frame — Eid Al Etihad 55');
  const description=t('ستاندات مبتكرة لعيد الاتحاد 55، بتصاميم تعكس هويتنا وتترك أثرًا. اكتشف المجموعة واستفسر عن تصميمك مباشرة عبر واتساب.','Creative Eid Al Etihad 55 cinema standees that celebrate identity. Explore the collection and enquire about any design directly on WhatsApp.');
  document.querySelector('meta[name="description"]')?.setAttribute('content',description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content',description);
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content',ar?'ar_AE':'en_AE');
 },[language,ar]);
 function switchLanguage(){const next=ar?'en':'ar';setLanguage(next);try{localStorage.setItem('niche-language',next)}catch{}}
 return <>
  <a className="skip-link" href="#main">{t('انتقل إلى المحتوى','Skip to content')}</a>
  <header className="site-header">
   <a className="brand" href="#top" aria-label="Niche Star Advertising"><Image src="/niche-star-logo.png" alt="Niche Star Advertising" width={1280} height={394} priority sizes="(max-width: 600px) 156px, 210px"/></a>
   <nav aria-label={t('التنقل الرئيسي','Main navigation')}><a href="#collection">{t('المجموعة','The collection')}</a><a href="#studio">{t('نيش ستار','The studio')}</a></nav>
   <div className="header-actions"><button className="language" onClick={switchLanguage} aria-label={ar?'Switch to English':'التبديل إلى العربية'}><span lang="ar" className={ar?'active':''}>العربية</span><span className="language-divider">|</span><span lang="en" className={!ar?'active':''}>EN</span></button><InquiryLink language={language} placement="header" className="header-inquiry">{t('لنتحدث','Let’s talk')}</InquiryLink></div>
  </header>
  <main id="main">
   <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-copy"><p className="eyebrow"><span className="red-dot"/>{t('عيد الاتحاد 55','EID AL ETIHAD 55')}<span className="eyebrow-year">UAE · 2026</span></p>
     <h1 id="hero-title">{t('خلّ حضورك','Go beyond')}<br/><span className="headline-frame">{t('خارج الإطار.','the frame.')}<span className="headline-corner" aria-hidden="true"/></span></h1>
     <p className="hero-description">{t('ستاندات مبتكرة لعيد الاتحاد، بتصاميم تعكس هويتنا وتترك أثرًا.','Creative Eid Al Etihad Cinema Standees that celebrate identity and make every space unforgettable.')}</p>
     <div className="hero-actions"><a className="primary-button" href="#collection">{t('اكتشف التصاميم','Explore the collection')}<Arrow size={20}/></a><span className="hero-medium">{t('ستاندات سينمائية','CINEMA STANDEES')}<br/>{t('وقصّات خارج المألوف','& DIE-CUT DISPLAYS')}</span></div>
     <a href="#collection" className="scroll-cue"><span className="scroll-line"/><span>{t('مرّر. اكتشف. تجاوز الإطار.','SCROLL. DISCOVER. BREAK THE FRAME.')}</span><ArrowDown size={14}/></a>
    </div>
    <div className="hero-stage"><span className="hero-vertical" aria-hidden="true">A DIFFERENT KIND OF PRESENCE</span><span className="hero-edition" aria-hidden="true">EDITION <b>55</b></span><StandeeArt hero language={language}/><div className="hero-art-label"><span><b>NS–001</b> {t('الساعة الرملية المعكوسة','REVERSE HOURGLASS')}</span><span>{t('تصميم تصوّري','CONCEPT VISUAL')}</span></div><div className="cut-annotation" aria-hidden="true"><span/>{t('هنا ينتهي الإطار. وتبدأ الحكاية.','THE FRAME ENDS. THE STORY BEGINS.')}</div></div>
   </section>
   <div className="campaign-line" aria-hidden="true"><span>BEYOND THE FRAME</span><ArrowUpRight/><span lang="ar">هوية راسخة. حضور بلا حدود.</span><ArrowUpRight/><span>خارج الإطار</span></div>
   <section id="collection" className="collection section" aria-labelledby="collection-title">
    <div className="section-kicker"><span className="eyebrow">01 / {t('المعرض','THE EXHIBITION')}</span><span className="section-meta">{t('ستة تصاميم. ستّ حكايات.','SIX DESIGNS. SIX PERSPECTIVES.')}<span className="red-rule"/></span></div>
    <div className="collection-heading"><h2 id="collection-title">{t('الهوية تأخذ','Identity takes')}<br/><span>{t('شكلاً مختلفًا.','a different shape.')}</span></h2><div><p>{t('لكل قصّة حكاية. أيّها يشبه رؤيتك؟','Every contour has a story. Which one speaks for you?')}</p><p className="collection-instruction">{t('اختر ما يلهمك، واستفسر عنه مباشرة عبر واتساب.','Find your inspiration. Ask about it directly on WhatsApp.')}</p></div></div>
    <div className="exhibition-grid">{products.map((product,index)=><article key={product.id} className={`exhibit exhibit-${index+1}`} aria-labelledby={`title-${product.id}`}>
     <div className="exhibit-art"><span className="exhibit-counter">0{index+1}<span>/ 06</span></span><span className="concept-label">{t('تصميم تصوّري','CONCEPT VISUAL')}</span><StandeeArt product={product} language={language}/><span className="exhibit-code">{product.id}<span className="code-rule"/></span></div>
     <div className="exhibit-details"><div className="exhibit-title"><h3 id={`title-${product.id}`}>{ar?product.ar:product.en}</h3><span className="second-language" lang={ar?'en':'ar'} dir={ar?'ltr':'rtl'}>{ar?product.en:product.ar}</span></div><p>{ar?product.da:product.de}</p><InquiryLink language={language} product={product} placement="collection">{t('استفسر عن هذا التصميم','Enquire on WhatsApp')}</InquiryLink></div>
    </article>)}</div>
    <p className="concept-note">{t('صور تصوّرية للتصاميم، وليست توثيقًا لتركيبات منفّذة. تُناقش الخامات والمقاسات واللمسات النهائية مع فريقنا.','Design concept visuals, not photographs of completed installations. Discuss materials, dimensions and final finishes with our team.')}</p>
   </section>
   <section id="studio" className="studio section" aria-labelledby="studio-title"><div className="studio-mark" aria-hidden="true"><ArrowUpRight strokeWidth={.65}/><span>NICHE<br/>PERSPECTIVE.</span></div><div className="studio-copy"><span className="eyebrow">02 / {t('نيش ستار للإعلان','NICHE STAR ADVERTISING')}</span><h2 id="studio-title">{t('فكرة تستحق','An idea worth')}<br/>{t('أن تخرج إلى النور.','bringing to life.')}</h2><p>{t('من التصميم إلى الطباعة كبيرة الحجم والتشطيب، نحوّل رؤيتك إلى حضور. تحدّث مع فريقنا عن ستاند عيد الاتحاد الذي يناسب مساحتك.','From artwork and large-format printing to finishing, we help bring your vision into the room. Talk to our team about an Eid Al Etihad standee for your space.')}</p><div className="capabilities"><span>{t('تصميم وإعداد فني','DESIGN & ARTWORK')}</span><span>{t('طباعة كبيرة الحجم','LARGE-FORMAT PRINTING')}</span><span>{t('تشطيب وتجهيز','FINISHING')}</span></div><a className="studio-source" href="https://nichestaradvertising.com/" target="_blank" rel="noopener noreferrer">{t('تعرّف إلى نيش ستار','Meet Niche Star')}<Arrow size={15}/></a></div></section>
   <section id="contact" className="closing" aria-labelledby="closing-title"><div className="closing-top"><span className="eyebrow">{t('عيد الاتحاد 55 / 2026','EID AL ETIHAD 55 / 2026')}</span><span className="closing-coordinate">25° N · 55° E</span></div><h2 id="closing-title">{t('الإطار لا يحدّ','Some ideas don’t')}<br/>{t('طموحك.','fit in a frame.')}</h2><div className="closing-bottom"><p>{t('لنجعل حضورك في عيد الاتحاد استثنائيًا.','Let’s make your Eid Al Etihad presence unforgettable.')}</p><InquiryLink language={language} placement="final" className="closing-inquiry">{t('تحدّث معنا عبر واتساب','Let’s talk on WhatsApp')}</InquiryLink></div><ArrowUpRight className="closing-arrow" aria-hidden="true" strokeWidth={.65}/></section>
  </main>
  <footer><a className="footer-logo" href="https://nichestaradvertising.com/" target="_blank" rel="noopener noreferrer"><Image src="/niche-star-logo.png" alt="Niche Star Advertising — official website" width={1280} height={394} sizes="160px"/></a><span>{t('الإمارات العربية المتحدة · عيد الاتحاد 55 · 2026','UNITED ARAB EMIRATES · EID AL ETIHAD 55 · 2026')}</span><a href="#top">{t('إلى الأعلى','Back to top')}<ArrowDown size={13} className="back-arrow"/></a></footer>
 </>;
}
