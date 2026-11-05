// Original interpretive guidance, not reproduced standards text or compliance certification.
// References identify the source and edition. Adoption remains conditional on applicable agreements.
export const standardProfiles=[
 {id:'aia-digital',name:'AIA Digital Practice / G203',edition:'2022 digital practice family',source:'https://acdoperations.zendesk.com/hc/en-us/articles/7356618493075-Instructions-G203-2022-BIM-Execution-Plan',scope:'BIM exhibits, execution-plan procedures, shared model responsibilities and file naming protocols. Does not prescribe one universal model filename.'},
 {id:'ncs-v7',name:'United States National CAD Standard',edition:'Version 7 (2025)',source:'https://www.nationalcadstandard.org/ncs7/faqs.php',scope:'AIA CAD layer guidelines, Uniform Drawing System sheet organization/identification, drawing production and CAD file conventions. Verify licensed edition and organizational selections.'},
 {id:'iso19650-2',name:'ISO 19650 information management',edition:'ISO 19650-2:2018; national annex / adoption to confirm',source:'https://www.iso.org/standard/68080.html',scope:'Information requirements, CDE workflow, information status, container identification and approval. Exact naming fields vary by national annex and project information standard.'},
 {id:'bimforum-2025',name:'BIMForum Level of Development',edition:'2025 Parts I/II',source:'https://bimforum.org/resource/lod-level-of-development-lod-specification/',scope:'Element-level development, author and permitted reliance by milestone; never blanket model/phase LOD.'}
];
export const standardsFor=d=>(Array.isArray(d.selectedStandards)?d.selectedStandards:[]).filter(id=>standardProfiles.some(p=>p.id===id));
const has=(d,id)=>standardsFor(d).includes(id);
export function standardGuidance(questionId,d){
 const notes=[];
 if(has(d,'aia-digital')){
   if(questionId==='naming')notes.push('AIA G203-2022 section 5.7 calls for consistent file naming protocols by file type and software. Record the adopted syntax in the BEP or an identified exhibit; selecting AIA does not establish a universal AIA filename pattern.');
   if(questionId==='responsibility'||questionId==='elementMatrix')notes.push('Record model element authors, authorized model uses and reliance boundaries in the applicable AIA digital practice instruments and project planning exhibits.');
   if(questionId==='exceptions')notes.push('Confirm executed AIA digital practice exhibits and any conflicts with owner requirements or agreements before finalizing project deviations.');
 }
 if(has(d,'ncs-v7')){
   if(questionId==='naming')notes.push('For CAD deliverables consider NCS V7 AIA CAD Layer Guidelines and Uniform Drawing System: distinguish CAD layer naming, drawing sheet identification and actual file naming. Confirm applicable discipline designators and approved organization-specific implementation.');
   if(questionId==='qc')notes.push('Consider validating drawing sheet organization, discipline/sheet identifiers, CAD layer naming and any approved departures from NCS V7.');
 }
 if(has(d,'iso19650-2')){
   if(questionId==='naming')notes.push('ISO 19650 requires agreed information-container identification and metadata arrangements. Confirm the national annex or local/project convention before choosing actual fields, separators, examples and revision/status handling.');
   if(questionId==='cde'||questionId==='exchange')notes.push('Assign the information exchange responsibility, suitability/status metadata, review authorization and CDE state transitions; map terms to actual platform features.');
   if(questionId==='responsibility')notes.push('Define appointing-party and appointed-party information management responsibilities only where applicable to the selected contract/appointment structure.');
 }
 if(has(d,'bimforum-2025')){
   if(questionId==='lodReference'||questionId==='elementMatrix')notes.push('Use the BIMForum 2025 element-level LOD reference to document development, model element author, intended use and milestone. Never infer a blanket LOD by design phase or require all elements to share the same LOD.');
 }
 return notes;
}
const add=(key,title,kind,body,source,ids=[],when=()=>true)=>({key,title,kind,body,source,ids,when});
export function applicableProvisions(d){
 const p=[],org=String(d.organization||'the organization').trim(),annex=String(d.isoAnnex||'').trim(),convention=String(d.namingConvention||'').trim();
 if(has(d,'aia-digital')){
  p.push(add('aia-file','AIA digital practice: naming protocol','Requires project decision','Where applicable AIA digital practice forms are adopted, project participants shall establish and document agreed file naming protocols by file type and authoring or coordination application in the project BEP or an identified naming exhibit. No universal filename is established by selecting AIA documents.','AIA G203-2022, §5.7',['naming']));
  p.push(add('aia-uses','Model uses and permitted reliance','Requires project decision','The project team shall record intended model uses, information exchange roles, model element responsibilities and authorized reliance, consistent with the selected executed AIA digital practice instruments.','AIA digital practice forms, selected editions',['responsibility','elementMatrix']));
 }
 if(has(d,'ncs-v7')){
  p.push(add('ncs-cad','NCS CAD and drawing conventions','Proposed adoption','For CAD and drawing deliverables within the selected NCS scope, the project team shall establish consistent CAD layer naming, discipline and sheet identification, drawing set organization and file naming using the adopted National CAD Standard edition and documented organizational/project options. These are separate naming systems and shall not be treated as interchangeable.','United States National CAD Standard, Version 7; AIA CAD Layer Guidelines and Uniform Drawing System',['naming','qc']));
 }
 if(has(d,'iso19650-2')){
  p.push(add('iso-container','ISO 19650 information container identification','Requires national annex / project convention',annex?('Apply the selected '+annex+' information container identification approach as confirmed in the project information standard. Verify field definitions, unique identifiers, metadata, suitability and revision rules before issue.'):('Before prescribing a filename, identify the applicable national annex or agreed project information standard, including required container identifier fields, metadata, status, revision and validation rules. ISO 19650 selection alone does not supply one universal filename.'),'ISO 19650-2:2018 and applicable national annex',['naming','cde']));
  p.push(add('iso-cde','CDE information management','Proposed adoption','Define work-in-progress, shared, published and archived information processes where applicable, including authorizations, suitability/status codes, controlled exchanges and accountability. Validate platform mappings against agreed information-management workflows.','ISO 19650 series: project-specific adoption required',['cde','exchange']));
 }
 if(has(d,'bimforum-2025')){
  p.push(add('lod-matrix','Element-specific LOD requirements','Requires element/milestone decisions','Prepare an agreed Model Element Table with element/system, author, milestone, intended use, graphical development, required non-graphical information and reliance limitations. Do not assume a single LOD for a whole model or apply a universal phase-to-LOD mapping.','BIMForum LOD Specification 2025, Parts I and II',['lodReference','elementMatrix']));
 }
 if(d.disciplines?.includes('Civil')&&has(d,'iso19650-2'))p.push(add('civil-geospatial','Civil information exchange and spatial reference','Recommended consideration','For civil and survey-related information, identify authoritative horizontal/vertical datums, coordinate reference systems, unit conventions and spatial reference records. Confirm consistency between information-container naming and geospatial deliverable classification.','Discipline-specific implementation recommendation',['coordinates','naming']));
 if(d.disciplines?.some(x=>['Mechanical','Electrical','Plumbing'].includes(x))&&has(d,'bimforum-2025'))p.push(add('mep-lod','MEP equipment and service access','Recommended consideration','Agree element-level authorship, geometric development and non-graphical properties for applicable building services, including coordination and maintenance clearance expectations. Do not equate an LOD label with verified serviceability.','Discipline-specific implementation recommendation',['elementMatrix','clashes']));
 const selected=Array.isArray(d.projectTypes)?d.projectTypes:[];
 if(selected.includes('Healthcare'))p.push(add('healthcare-coordination','Healthcare coordination controls','Recommended consideration','Where healthcare facilities are included, review clinical equipment interfaces, congested service zones, operational continuity, phased construction and maintainable-asset data. Confirm these are in scope before making any deliverable obligation.','Healthcare project-type implementation recommendation',['clashes','assetData']));
 if(selected.includes('Infrastructure / transportation'))p.push(add('infra-data','Infrastructure information controls','Recommended consideration','For infrastructure projects, review alignment/chainage referencing, geographic scope, corridor segmentation, civil model responsibilities and long-term information handover.','Infrastructure project-type implementation recommendation',['coordinates','modelStructure']));
 if(convention)p.push(add('adopted-naming','Client-selected naming convention','Client-entered convention','The organization proposes the following information-container or file-naming convention: '+convention+'. The responsible reviewers shall confirm syntax, examples, software limitations, metadata and contractual applicability before approving this provision.','Client discovery input',['naming']));
 return p;
}
export const namingExample=(d)=>{
 const selected=standardsFor(d);
 return selected.includes('iso19650-2')?'An approved project identifier example must be recorded after selecting the national annex or project information standard.':selected.includes('ncs-v7')?'Illustrative CAD layer format: A-WALL (discipline and major group); this is NOT a filename.':'No filename pattern has been adopted. Record naming fields, separators and an approved example.';
};
