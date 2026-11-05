// Publication-oriented renderer layered on the existing source-mapped document framework.
// Original document types remain distinct: requirements baseline vs noncontractual corporate BEP.
import {buildDocument} from './document-engine.js';
import {exhibitTemplates} from './exhibit-templates.js';
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const valid=d=>Array.isArray(d.exhibits)?d.exhibits.filter(x=>Number.isInteger(x)&&x>=0&&x<exhibitTemplates.length):[];
const omitted=d,type=>new Set(d.excludedSections?.[type]||[]);
const isOmitted=(d,v)=>d.decisions?.[v.id]==='Not applicable'||(d.excludedFields||[]).includes(v.id);
export function publishDocument(d,type,{showOpenDecisions=true}={}){
 const raw=buildDocument(d,type), excluded=omitted(d,type), chosen=valid(d);
 const sections=raw.sections.filter(s=>!excluded.has(s.title)).map((s,index)=>({
  ...s,number:index+1,clauses:s.clauses.map((c,j)=>{
   const provisions=(c.decisions||[]).filter(v=>!isOmitted(d,v)&&v.value).map(v=>({text:v.value,origin:v.origin,status:v.status,id:v.id}));
   return {...c,number:(index+1)+'.'+(j+1),provisions,decisions:[]};
  })
 }));
 if(chosen.length){
  sections.push({number:sections.length+1,title:'Referenced Exhibits and Supporting Schedules',source:'Selected optional exhibit starters',clauses:chosen.map((i,j)=>({
   number:(sections.length+1)+'.'+(j+1),
   heading:'Exhibit '+String(i+1).padStart(2,'0')+' — '+exhibitTemplates[i].title,
   body:'The '+exhibitTemplates[i].title+' is included as a separately issued, editable supporting schedule where adopted for this framework. Its project-specific content, applicability, responsibility and approval status are confirmed before use.',
   provisions:[],decisions:[]
  }))});
 }
 const relevant=new Set(sections.flatMap(s=>s.clauses.flatMap(c=>c.keys||[])));
 const missing=raw.review.missing.filter(x=>!isOmitted(d,x)&&relevant.has(x.id));
 const unapproved=raw.review.unapproved.filter(x=>!isOmitted(d,x)&&relevant.has(x.id));
 return {...raw,sections,review:{missing,unapproved,canIssue:missing.length===0&&unapproved.length===0&&!!d.organization},showOpenDecisions,exhibits:chosen,excluded:[...excluded],meta:{...raw.meta,revision:'0.1 · Draft',status:'DRAFT FOR REVIEW',purpose:type==='bep'?'Corporate BIM execution procedures. This template is operational guidance and is not a contractual instrument. A project-specific BEP will identify the team and implementation details.':'Organizational BIM requirements and minimum information-delivery expectations. Contractual effect requires express incorporation into executed agreements.'}};
}
export function publishedText(doc){
 const lines=[doc.meta.organization,doc.title.toUpperCase(),'Revision '+doc.meta.revision,'Status: '+doc.meta.status,'','Purpose',doc.meta.purpose,'','Contents',...doc.sections.map(s=>s.number+'. '+s.title),''];
 for(const s of doc.sections){lines.push(s.number+'. '+s.title.toUpperCase(),'');for(const c of s.clauses){lines.push(c.number+' '+c.heading,c.body);for(const p of c.provisions||[])lines.push(p.text);lines.push('')}}
 if(doc.showOpenDecisions){lines.push('APPENDIX: ITEMS REQUIRING CONFIRMATION',...doc.review.missing.map(q=>'OPEN: '+q.label),...doc.review.unapproved.map(q=>'REVIEW: '+q.label));}
 lines.push('','Prepared by: __________________','Reviewed by: _________________','Approved by: _________________');
 return lines.join('\n');
}
export function publishedHtml(doc){
 const bep=doc.type==='bep',color=bep?'#276957':'#174e89';
 const sheet=doc.sections.map(s=>'<section class="chapter"><h2>'+s.number+'. '+e(s.title)+'</h2>'+s.clauses.map(c=>'<article><h3>'+e(c.number+' '+c.heading)+'</h3><p>'+e(c.body)+'</p>'+(c.provisions||[]).map(p=>'<p>'+e(p.text)+'</p>').join('')+'</article>').join('')+'</section>').join('');
 const open=doc.showOpenDecisions?'<section class="chapter review"><h2>Appendix · Items requiring confirmation</h2><p>Unanswered or unapproved items are listed here for client review and are not automatically adopted.</p>'+(!doc.review.missing.length&&!doc.review.unapproved.length?'<p>No outstanding discovery items recorded; this does not constitute approval.</p>':'')+doc.review.missing.map(v=>'<p><strong>Open:</strong> '+e(v.label)+'</p>').join('')+doc.review.unapproved.map(v=>'<p><strong>Review:</strong> '+e(v.label)+'</p>').join('')+'</section>':'';
 const styles=':root{color-scheme:light}body{background:white;color:#253348;max-width:900px;margin:0 auto;padding:42px 46px;font:11pt/1.62 Georgia,serif}.cover{min-height:390px;page-break-after:always;display:flex;flex-direction:column;justify-content:center;border-top:12px solid '+color+';padding:45px 0}.eyebrow{font:700 10pt Arial,sans-serif;letter-spacing:2px;color:'+color+'}.cover h1{font:700 32pt/1.15 Arial,sans-serif;max-width:620px;color:#142f4b;margin:24px 0}.cover .org{font:18pt Arial,sans-serif}.cover .meta{font:10pt Arial,sans-serif;color:#66768b}.purpose{border-top:1px solid #cbd5e2;margin-top:40px;padding-top:20px}.toc{page-break-after:always;padding-top:40px}.toc h2,.chapter h2{font:700 18pt Arial,sans-serif;color:'+color+';border-bottom:1px solid #bdcad8;padding-bottom:9px}.toc li{padding:5px 0}.chapter{margin-top:38px;break-before:auto}.chapter article{margin:17px 0 27px;break-inside:avoid}.chapter h3{font:700 12pt Arial,sans-serif;color:#263f61;margin:0 0 9px}.chapter p{margin:8px 0}.review{background:#f9fafc;padding:10px 24px}.footer{font:9pt Arial,sans-serif;color:#728398;border-top:1px solid #dbe2eb;padding-top:13px;margin-top:40px}.approval{page-break-before:always} @media print{body{max-width:none;padding:0 24px}.cover{padding-top:80px}.chapter{break-inside:auto}}';
 const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>'+e(doc.title)+'</title><style>'+styles+'</style></head><body><header class="cover"><div class="eyebrow">'+(bep?'BIM DELIVERY PROCEDURES':'BIM INFORMATION REQUIREMENTS')+'</div><h1>'+e(doc.title)+'</h1><div class="org">'+e(doc.meta.organization)+'</div><div class="meta"><p>Revision: '+e(doc.meta.revision)+' · '+e(doc.meta.status)+'</p><p>Disciplines: '+e(doc.meta.disciplines)+'</p><p>Project types: '+e(doc.meta.projectFocus)+'</p></div><p class="purpose">'+e(doc.meta.purpose)+'</p></header><section class="toc"><h2>Table of Contents</h2><ol>'+doc.sections.map(s=>'<li>'+e(s.title)+'</li>').join('')+'</ol></section>'+sheet+open+'<section class="chapter approval"><h2>Document control and approvals</h2><p>Prepared by: ________________________ Date: ______________</p><p>Reviewed by: ________________________ Date: ______________</p><p>Approved by: ________________________ Date: ______________</p><p>Record revisions, approving authority, effective date and applicable projects before issue.</p></section><div class="footer">Working draft. Client review required. Neither standards compliance nor contractual incorporation is certified.</div></body></html>';
 return html;
}
