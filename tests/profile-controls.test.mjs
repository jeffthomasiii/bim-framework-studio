import test from 'node:test';
import assert from 'node:assert/strict';
import {projectTypes,recommendation} from '../src/recommendations.js';
import {buildDocument,documentText} from '../src/document-engine.js';
import {normalizeProfile,projectTypeLabels,toggleProjectType,selectAllProjectTypes,clearProjectTypes,resetAnswer,resetSection,resetDiscovery} from '../src/profile-controls.js';
const valid=projectTypes.filter(v=>v!=='General / mixed portfolio');
const example={organization:'AEC Test',projectTypes:[],otherProjectType:'',disciplines:['Architecture'],answers:{policyOwner:'BIM Manager',approver:'Principal',qc:'Check before publishing'},decisions:{policyOwner:'Approved',approver:'Under review'},origins:{policyOwner:'custom',approver:'recommended'},exhibits:[1]};
test('migrates single-choice profile without removing existing answers',()=>{
 const old={projectType:'Healthcare',answers:{qc:'Retain me'}};
 const migrated=normalizeProfile(old,valid);
 assert.deepEqual(migrated.projectTypes,['Healthcare']);
 assert.equal(migrated.answers.qc,'Retain me');
});
test('choose one, multiple, all or none project types',()=>{
 let d=toggleProjectType(example,'Healthcare',true,valid);
 assert.deepEqual(d.projectTypes,['Healthcare']);
 d=toggleProjectType(d,'Education',true,valid);
 assert.deepEqual(d.projectTypes,['Healthcare','Education']);
 assert.match(recommendation('projectArchetypes',d).consider,/Healthcare:/);
 assert.match(recommendation('projectArchetypes',d).consider,/Education:/);
 d=selectAllProjectTypes(d,valid);
 assert.deepEqual(d.projectTypes,valid);
 d=clearProjectTypes(d,valid);
 assert.deepEqual(d.projectTypes,[]);
});
test('Other requires custom text and removes text when unchecked',()=>{
 let d=toggleProjectType(example,'Other',true,valid);
 d.otherProjectType='Airport terminal';
 assert.deepEqual(projectTypeLabels(d,valid),['Airport terminal']);
 assert.match(documentText(buildDocument(d,'requirements')),/Airport terminal/);
 d=toggleProjectType(d,'Other',false,valid);
 assert.equal(d.otherProjectType,'');
 assert.deepEqual(projectTypeLabels(d,valid),[]);
});
test('project selections transfer to both document outputs',()=>{
 const d={...example,projectTypes:['Healthcare','Education']};
 for(const type of ['requirements','bep']){
   const doc=buildDocument(d,type);
   assert.equal(doc.meta.projectFocus,'Healthcare, Education');
   assert.match(documentText(doc),/Healthcare, Education/);
 }
});
test('resetting one answer clears its provenance and status but keeps others',()=>{
 const d=resetAnswer(example,'policyOwner');
 assert.equal(d.answers.policyOwner,undefined);
 assert.equal(d.decisions.policyOwner,undefined);
 assert.equal(d.origins.policyOwner,undefined);
 assert.equal(d.answers.approver,'Principal');
 assert.deepEqual(d.projectTypes,[]);
});
test('section and entire discovery resets preserve organization and project types',()=>{
 const d={...example,projectTypes:['Healthcare']};
 const section=resetSection(d,['policyOwner','approver']);
 assert.equal(Object.keys(section.answers).length,1);
 assert.equal(section.answers.qc,'Check before publishing');
 const all=resetDiscovery(d);
 assert.deepEqual(all.answers,{});
 assert.deepEqual(all.decisions,{});
 assert.deepEqual(all.origins,{});
 assert.equal(all.organization,'AEC Test');
 assert.deepEqual(all.projectTypes,['Healthcare']);
 assert.deepEqual(all.exhibits,[1]);
});
test('normalizing invalid selections removes unknown catalog types and stale Other value',()=>{
 const d=normalizeProfile({projectTypes:['Healthcare','Invalid','Healthcare'],otherProjectType:'Stale'},valid);
 assert.deepEqual(d.projectTypes,['Healthcare']);
 assert.equal(d.otherProjectType,'');
});
