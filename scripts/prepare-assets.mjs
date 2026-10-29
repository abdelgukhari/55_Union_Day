import sharp from 'sharp';
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const source=process.argv[2];
if(!source) throw new Error('Pass the supplied assets directory.');
await mkdir('public/designs',{recursive:true});
await copyFile(path.join(source,'niche star ad.png'),'public/niche-star-logo.png');
const files=[['ns-001','39c9b780-f915-4bd7-993f-ae6c9e9c92d2.png'],['ns-002','56bf8178-609f-4c2c-bc32-08acb9c53412.png'],['ns-003','aebc4bf5-b6c8-4cf3-ae93-093f5b2a1911.png'],['ns-004','feab5748-0213-41a5-98d9-4137c30bd6fb.png'],['ns-005','7e2d4740-82b9-4b93-a04c-7e8fc0169f4d.png'],['ns-006','15954d08-21b8-4135-b00f-b5de820878a6.png']];
const manifest=[];
for(const [id,file] of files){
 const original=sharp(path.join(source,file));const info=await original.metadata();
 for(const size of [640,1100]) await original.clone().resize({width:size,withoutEnlargement:true}).webp({quality:86}).toFile(`public/designs/${id}-${size}.webp`);
 manifest.push({id,source:file,width:info.width,height:info.height});
}
await writeFile('public/designs/sources.json',JSON.stringify(manifest,null,2));
console.log('Logo copied unchanged; six supplied standee visuals optimized in two sizes.');
