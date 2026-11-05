// Original application prompts derived from the supplied draft frameworks, not reproduced standards text.
// Every question has a stable ID, category, related document(s), and a source-family reference.
export const disciplines = ['Architecture','Structural','Civil','Mechanical','Electrical','Plumbing','Landscape','Interior design','Construction','Owner / facilities','Other'];
export const standards = [
 {id:'bimforum-2025',name:'BIMForum LOD Specification',edition:'2025, Parts I and II',status:'Reference only',note:'No universal phase-to-LOD assignment; model element author, reliance and milestones are project decisions. Source licensing must be respected.',url:'https://bimforum.org/resource/lod-level-of-development-lod-specification/'},
 {id:'aia-digital',name:'AIA Digital Practice documents',edition:'2022 family (verify applicable forms)',status:'Applicability review',note:'Digital practice forms, BIM exhibits, model element tables and BEP must be selected in the context of executed agreements.',url:'https://aiacontracts.com/'},
 {id:'iso19650',name:'ISO 19650 information management',edition:'Applicable part and edition to be confirmed',status:'Applicability review',note:'CDE, appointment, exchange and information requirements concepts require explicit adoption; no compliance certification.',url:'https://www.iso.org/standard/68080.html'},
 {id:'ncs',name:'United States National CAD Standard',edition:'Version 7 (2025); applicability to be confirmed',status:'Applicability review',note:'Drawing and CAD production conventions require a project or company adoption decision.',url:'https://www.nationalcadstandard.org/ncs7/faqs.php'},
 {id:'nbims',name:'National BIM Standard – United States',edition:'Version 4',status:'Reference only',note:'Map relevant information-management practices explicitly; not automatically mandatory.',url:'https://nbims.nibs-wbdg.org/nbims/v4/'}
];
export const modules = [
 {id:'governance',title:'Governance & applicability',source:'Client BEP §01 / Playbook §01',questions:[
  {id:'policyOwner',label:'Who owns the corporate BIM framework?',hint:'Enter role or group, not necessarily a named person.',docs:['requirements','bep'],required:true},
  {id:'approver',label:'Who approves standards and exceptions?',docs:['requirements','bep'],required:true},
  {id:'applicability',label:'What project types, offices and business units are covered?',docs:['requirements','bep']},
  {id:'exceptions',label:'How are project-specific deviations reviewed and recorded?',docs:['requirements','bep']}]},
 {id:'objectives',title:'BIM strategy & uses',source:'Client BEP §02–03 / Requirements §1',questions:[
  {id:'bimUses',label:'Which BIM uses are performed or expected?',hint:'Examples: authoring, coordination, quantity extraction, 4D, sustainability, facilities handover.',docs:['requirements','bep'],required:true},
  {id:'outcomes',label:'Which measurable outcomes indicate successful BIM delivery?',docs:['requirements','bep']},
  {id:'projectArchetypes',label:'Which project archetypes require different workflows?',docs:['requirements','bep']}]},
 {id:'roles',title:'Roles & decision rights',source:'Client BEP §05 / Requirements §1.D',questions:[
  {id:'responsibility',label:'Who authors, reviews, accepts and publishes each information deliverable?',docs:['requirements','bep']},
  {id:'escalation',label:'How are unresolved discipline or stakeholder conflicts escalated?',docs:['bep']}]},
 {id:'technology',title:'Software & interoperability',source:'Client BEP §06 / Requirements §2',questions:[
  {id:'software',label:'Which applications and versions are approved?',hint:'Separate design authoring, review, analysis and coordination tools.',docs:['requirements','bep']},
  {id:'formats',label:'Which native/open deliverable formats and exchange tests are required?',docs:['requirements','bep']}]},
 {id:'modeling',title:'Model setup & development',source:'Client BEP §03, §07 / Requirements §5 / BIMForum LOD 2025',questions:[
  {id:'coordinates',label:'Who controls shared coordinates, datums, units and model alignment verification?',docs:['requirements','bep']},
  {id:'modelStructure',label:'How are models partitioned and linked by discipline, building or zone?',docs:['bep']},
  {id:'lodReference',label:'Which LOD reference and edition is adopted, if any?',hint:'Do not infer LOD from design phase.',docs:['requirements','bep']},
  {id:'elementMatrix',label:'How will model elements, authors, milestones and reliability limits be agreed?',hint:'Use an element-by-element Model Element Table; separate geometry and non-graphical attributes.',docs:['requirements','bep']}]},
 {id:'collaboration',title:'CDE & exchanges',source:'Client BEP §04, §08 / Requirements §3.F',questions:[
  {id:'cde',label:'Which common data environment or collaboration platform is authorized?',docs:['requirements','bep']},
  {id:'exchange',label:'How frequently are packages issued, by whom, and with what status and acceptance rules?',docs:['requirements','bep']},
  {id:'naming',label:'Which file, container, and drawing naming conventions apply?',docs:['requirements','bep']}]},
 {id:'quality',title:'Coordination & QA/QC',source:'Client BEP §09–10 / Requirements §3.C–D',questions:[
  {id:'clashes',label:'How are coordination issues prioritized, assigned, verified and closed?',docs:['requirements','bep']},
  {id:'qc',label:'Which model checks, tolerances and evidence are required before exchange?',docs:['requirements','bep']},
  {id:'acceptance',label:'Who determines acceptance and how are waivers documented?',docs:['requirements','bep']}]},
 {id:'handover',title:'Deliverables & handover',source:'Client BEP §11–12 / Requirements §3.G–H, §4',questions:[
  {id:'milestones',label:'What milestone deliverables, formats, reviewers and acceptance dates are required?',docs:['requirements','bep']},
  {id:'assetData',label:'What asset information, COBie or facilities-management data is explicitly required?',docs:['requirements','bep']},
  {id:'security',label:'What confidentiality, access, retention, reliance or ownership restrictions apply?',docs:['requirements','bep']}]},
 {id:'adoption',title:'Training & revisions',source:'Client BEP §13–14 / Playbook §14',questions:[
  {id:'training',label:'Who maintains guidance and trains staff on organization-specific practices?',docs:['bep']},
  {id:'reviews',label:'When are standards reviewed and who signs off revisions?',docs:['requirements','bep']}]}
];
export const exhibitNames=['BIM Use Analysis Worksheet','Information Exchange Worksheet','BIM Project Execution Planning Guide','Model Element Table','Responsibility Matrix','Software Platform Matrix','BIM Goals and Objectives Form','Project Delivery Method Exhibit','File Naming Convention Guide','Coordination Meeting Agenda Template','Quality Control Checklist','BIM Submittal Form','Hardware Specifications Sheet','Training Plan Template'];
export const allQuestions=modules.flatMap(m=>m.questions);
