'use client';
import {useId,useRef} from 'react';
import {motion,useReducedMotion,useScroll,useTransform} from 'motion/react';
import {products,type Product} from './products';
import {artwork} from './artwork';
export default function StandeeArt({product=products[0],hero=false,language='ar'}:{product?:Product;hero?:boolean;language?:'ar'|'en'}) {
 const id=useId().replace(/:/g,''),ref=useRef<HTMLDivElement>(null),reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start 95%','center 35%']});
 const pathLength=useTransform(scrollYProgress,[0,.85],[0,1]);
 const {width,height,contour}=artwork[product.id];
 const source=`/designs/${product.id.toLowerCase()}-${hero?'1100':'640'}.webp`;
 return <div ref={ref} className={`standee-art ${hero?'hero-standee':''}`}>
  <svg className="standee" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={language==='ar'?`${product.ar} — تصميم ستاند تصوّري`:`${product.en} — standee concept visual`}>
   <defs><clipPath id={`${id}-shape`} clipPathUnits="objectBoundingBox"><path d={contour}/></clipPath><clipPath id={`${id}-frame`}><rect x={width*.14} y={height*.16} width={width*.72} height={height*.68}/></clipPath></defs>
   <rect className="art-panel" x={width*.14} y={height*.16} width={width*.72} height={height*.68} fill={hero?'#e9e3d8':product.color} fillOpacity={hero?1:.16}/>
   {!hero&&<image href={source} width={width} height={height} clipPath={`url(#${id}-frame)`} opacity=".45"/>}
   <image className="standee-cutout" href={source} width={width} height={height} clipPath={`url(#${id}-shape)`}/>
   <rect className="editorial-frame" x={width*.14} y={height*.16} width={width*.72} height={height*.68} fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity=".2"/>
   <motion.path className="contour-line" d={contour} transform={`scale(${width} ${height})`} fill="none" stroke="#d61f27" strokeWidth="1.4" vectorEffect="non-scaling-stroke" style={{pathLength:reduce?1:pathLength}}/>
  </svg>
  <span className="frame-corner corner-a" aria-hidden="true"/><span className="frame-corner corner-b" aria-hidden="true"/>
 </div>;
}
