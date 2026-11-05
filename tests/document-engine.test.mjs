import test from 'node:test';
import assert from 'node:assert/strict';
import {buildDocument,documentHtml,documentText} from '../src/document-engine.js';
import {allQuestions} from '../src/catalog.js';
import {recommendation} from '../src/recommendations.js';
const empty={organization:'Example AEC Studio',organizationType:'Multidisciplinary A/E firm',projectType:'Healthcare',disciplines:['Architecture','Mechanical'],objective:'',answers:{},origins:{},decisions:{}};
test('distinct document structures and substantial clause text',()=>{
 const brd=buildDocument(empty,'requirements'),bep=buildDocument(empty,'bep');
 assert.equal(brd.sections.length,7);assert.equal(bep.sections.length,14);
 assert.match(documentText(brd),/baseline information-management/);
 assert.match(documentText(bep),/project BIM lead/);
 assert.notEqual(documentText(brd),documentText(bep));
 assert.ok(documentText(brd).length>5000);
 assert.ok(documentText(bep).length>5000);
});
test('missing answers stay explicitly open rather than becoming approved requirements',()=>{
 const doc=buildDocument(empty,'requirements');
 assert.ok(doc.review.missing.length>0);
 assert.equal(doc.review.canIssue,false);
 assert.match(documentText(doc),/OPEN DECISION/);
 assert.match(documentText(doc),/NOT APPROVED/);
});
test('recommendation origin and client approval statuses are visible',()=>{
 const draft=structuredClone(empty),r=recommendation('clashes',draft);
 assert.match(r.value,/project team coordinates/);
 assert.match(r.consider,/Mechanical:/);
 draft.answers.clashes=r.value;
 draft.origins.clashes='recommended';
 const doc=buildDocument(draft,'bep');
 assert.match(documentText(doc),/Suggested default; Draft \/ unapproved/);
 assert.ok(doc.review.unapproved.some(x=>x.id==='clashes'));
});
test('HTML output escapes client text and contains meaningful document headings',()=>{
 const draft=structuredClone(empty);draft.answers.policyOwner='<script>alert(1)</script>';
 const html=documentHtml(buildDocument(draft,'requirements'));
 assert.doesNotMatch(html,/<script>alert/);
 assert.match(html,/&lt;script&gt;/);
 assert.match(html,/<h2>\d+\./);
 assert.match(html,/Review and approval register/);
});
test('every discovery question has a recommended starting point',()=>{
 for(const q of allQuestions){const v=recommendation(q.id,empty);assert.ok(v?.value?.length>25,q.id)}
});
