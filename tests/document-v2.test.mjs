import test from 'node:test';
import assert from 'node:assert/strict';
import {publishDocument,publishedHtml,publishedText} from '../src/document-v2.js';
import {exhibitHtml,exhibitTemplates} from '../src/exhibit-templates.js';
import {recommendation} from '../src/recommendations.js';
const profile={organization:'Sample Architecture Group',organizationType:'Architecture firm',projectTypes:['Healthcare'],disciplines:['Architecture','Mechanical'],answers:{},origins:{},decisions:{},exhibits:[],excludedSections:{requirements:[],bep:[]}};
test('recommendations provide adoptable language separate from consultant discussion',()=>{
 const v=recommendation('clashes',profile);
 assert.match(v.value,/project team coordinates/i);
 assert.match(v.value,/Mechanical coordination/);
 assert.match(v.value,/Healthcare project coordination/);
 assert.match(v.consider,/Ask which coordination conflicts/);
 assert.ok(!v.value.includes('Ask which coordination conflicts'));
});
test('requirements and BEP have distinct sections and titles',()=>{
 const a=publishDocument(profile,'requirements'),b=publishDocument(profile,'bep');
 assert.equal(a.sections.length,7);
 assert.equal(b.sections.length,14);
 assert.notEqual(a.title,b.title);
 assert.match(a.meta.purpose,/Contractual effect requires express incorporation/);
 assert.match(b.meta.purpose,/not a contractual instrument/);
 assert.match(publishedHtml(a),/Table of Contents/);
 assert.match(publishedHtml(b),/Table of Contents/);
});
test('unapproved and missing decisions remain optional appendix rather than inline questionnaire',()=>{
 const d={...profile,answers:{clashes:recommendation('clashes',profile).value},origins:{clashes:'recommended'}};
 const doc=publishDocument(d,'bep',{showOpenDecisions:true});
 assert.ok(doc.review.unapproved.some(x=>x.id==='clashes'));
 assert.match(publishedText(doc),/APPENDIX: ITEMS REQUIRING CONFIRMATION/);
 const clean=publishDocument(d,'bep',{showOpenDecisions:false});
 assert.doesNotMatch(publishedText(clean),/APPENDIX: ITEMS REQUIRING CONFIRMATION/);
});
test('excluding a section removes that chapter and associated open decisions',()=>{
 const d={...profile,excludedSections:{requirements:[],bep:['Coordination, issues and change management']}};
 const doc=publishDocument(d,'bep');
 assert.ok(!doc.sections.some(x=>x.title==='Coordination, issues and change management'));
 assert.ok(!doc.review.missing.some(x=>x.id==='clashes') || doc.sections.some(x=>x.title==='BIM workflows and process maps'));
});
test('optional exhibits can be selected and exported as separate editable tables',()=>{
 const doc=publishDocument({...profile,exhibits:[3,4]},'bep');
 assert.ok(doc.sections.some(s=>s.title==='Referenced Exhibits and Supporting Schedules'));
 assert.match(publishedText(doc),/Model Element Table/);
 assert.match(exhibitHtml(3,profile.organization),/<table>/);
 assert.equal(exhibitTemplates.length,14);
});
test('client text is safely escaped in publication HTML',()=>{
 const d={...profile,organization:'<script>alert(1)</script>'};
 const html=publishedHtml(publishDocument(d,'requirements'));
 assert.doesNotMatch(html,/<script>alert/);
 assert.match(html,/&lt;script&gt;/);
});
