import {policyText,consultantConsiderations} from './policy-language.js';
import {policyExtension} from './policy-extensions.js';
// Original recommendations informed by the user's BEP discovery/playbook and general AEC practice.
// These are proposed starting points, never contract terms, a compliance claim, or adopted standards.
export const projectTypes=[
 'General / mixed portfolio','Healthcare','Education','Commercial office','Multifamily residential','Single-family residential','Hospitality','Civic / government','Industrial / manufacturing','Infrastructure / transportation','Laboratory / research','Retail / mixed-use'
];
const base={
 policyOwner:['Assign a designated BIM or digital delivery lead as document owner, with responsibility for version control and updates.','Confirm staffing, delegated authority, and who maintains the framework after implementation.'],
 approver:['Require approval by the designated practice or operations leader, with documented review by affected discipline leads.','Identify who can approve project deviations and where approvals are recorded.'],
 applicability:['Apply the corporate baseline to projects where BIM deliverables are in scope; record exceptions by project, office and delivery contract.','Confirm whether small projects, renovations, 2D-only commissions and subcontracted work are included.'],
 exceptions:['Record each variance with the requirement, reason, affected parties, alternative, approver and effective date before relying on it.','Confirm contractual precedence and owner-specific obligations before adopting an exception.'],
 bimUses:['Prioritize design authoring, design reviews and coordination; add analysis, visualization, estimating, scheduling or asset data only where they serve defined outcomes.','Which uses are contract deliverables versus internal working methods?'],
 outcomes:['Define measurable BIM outcomes and evidence at agreed milestones, such as accepted exchanges, resolved high-priority coordination issues and required data completeness.','Avoid unverified universal clash counts or file-size targets.'],
 projectArchetypes:['Define a baseline process, then document variations for new construction, renovation, phased occupancy and project delivery methods.','Identify projects with special regulatory, security or operations needs.'],
 responsibility:['Maintain a deliverable responsibility matrix identifying the author, accountable reviewer, receiving party and acceptance authority for every critical exchange.','Distinguish the organization role from named project personnel.'],
 escalation:['Assign coordination issues to a responsible lead, record due dates, escalate unresolved inter-discipline issues to project leadership and close with recorded verification.','Confirm meeting cadence and formal change-control triggers.'],
 software:['Maintain an approved and revision-controlled tool register with application roles, supported versions, exchange extensions and known interoperability limitations.','Do not assume one vendor, platform or license across projects.'],
 formats:['Document exchange purpose, required native/open formats, recipient capabilities and verification tests before a contractual deliverable is required.','Specify what is authoritative when native files and exchanged data differ.'],
 coordinates:['Assign a georeferencing authority, agree units/datum/control points and test alignment before discipline authoring and exchanges begin.','Civil, survey and landscape control may require additional review.'],
 modelStructure:['Define model partitioning by responsible discipline, project scope or coordination zone; document link behavior, shared references and model ownership.','Avoid setting arbitrary model-size thresholds without test evidence.'],
 lodReference:['Select an explicitly identified LOD specification and edition only where needed; record the reference and any permitted project amendments.','BIMForum LOD does not prescribe one LOD for a whole model or universal LOD by design phase.'],
 elementMatrix:['For each required system/element and milestone, record element author, intended use, geometry requirements, non-graphical attributes, reviewer and permitted reliance.','Do not preassign LOD 300/350/400 across entire disciplines or phases.'],
 cde:['Designate an approved information management platform and define access permissions, suitability status, review, publication, issue handling and archive processes.','ISO 19650 concepts may guide structure but adoption and platform mapping must be explicit.'],
 exchange:['Define a project exchange schedule with sender, receiver, package purpose, format, status, acceptance checks and issue response process.','Confirm frequency against project stage, staffing and owner requirements.'],
 naming:['Document a consistent project information-container and drawing naming convention, including revision/status rules and a naming exception procedure.','Select applicable NCS or ISO 19650 conventions rather than claiming both are automatically mandatory.'],
 clashes:['Agree coordination zones, interference review priorities, issue owners, reasonable system-specific tolerance principles and a verified closure workflow.','Automated clashes are review candidates, not automatically design errors.'],
 qc:['Require an authoring-team prepublication check of model alignment, links, naming, required parameters, deliverables and exchange readiness.','Set any numeric thresholds using representative project evidence, not generic universal rules.'],
 acceptance:['Assign an authorized reviewer for each exchange, define acceptance criteria and capture rejections, corrections and approved exceptions.','Distinguish acceptance for coordination use from final contractual acceptance.'],
 milestones:['Maintain a deliverables matrix showing milestone, recipient, purpose, file/data format, required information, responsible author and acceptance authority.','Agree milestones and submittal terms with actual contract documents.'],
 assetData:['Define facilities/asset data only where expressly requested, with a verified property schema, data owner, exchange format and acceptance test.','Avoid automatically promising COBie, digital twins or operations models.'],
 security:['Apply organizational access and retention policies, document authorized recipients and intended reliance, and refer ownership/licensing to governing agreements.','Review sensitive sites and third-party digital-use terms with appropriate advisors.'],
 training:['Identify a BIM framework maintainer, provide role-based onboarding and document an issue-escalation path for workflows and tools.','Separate framework training from specialist software instruction or paid consulting services.'],
 reviews:['Review organizational BIM procedures at agreed intervals and following material technology, contract or project-delivery changes; retain approvals and revision history.','Determine how superseded versions remain accessible for active projects.']
};
const disciplineAdditions={
 Architecture:{bimUses:'Architecture: include spatial design reviews, envelope and architectural/interior coordination where applicable.',modelStructure:'Architecture: consider wings, towers, existing versus new work and shell/core versus tenant fit-out.',elementMatrix:'Architecture: identify architectural assemblies, openings, envelope and interiors based on project scope.',qc:'Architecture: check room/space data, levels, grids, drawing consistency and model coordination interfaces.'},
 Structural:{bimUses:'Structural: consider analysis-model coordination and structural-to-architectural interfaces.',coordinates:'Structural: verify grid, datum and levels against the agreed project control.',elementMatrix:'Structural: agree steel, concrete, foundations and connections authoring scope and reliance.'},
 Civil:{coordinates:'Civil: document survey control, horizontal/vertical datums, coordinate systems and unit conversions.',modelStructure:'Civil: address corridors, surfaces, alignments, utility networks and geographic extents.',formats:'Civil: test geometry, surface and geographic data transfers before milestones.'},
 Mechanical:{bimUses:'Mechanical: consider system layout, equipment clearances and performance analysis as scoped.',elementMatrix:'Mechanical: define equipment, ducts, pipework and access zones by system and milestone.',clashes:'Mechanical: include clearance/service access checks, not merely hard intersections.'},
 Electrical:{bimUses:'Electrical: consider equipment and pathway coordination plus scoped analysis.',elementMatrix:'Electrical: clarify electrical equipment, trays, conduits, fixtures and analytical data.',clashes:'Electrical: verify major equipment access and pathway separation requirements.'},
 Plumbing:{elementMatrix:'Plumbing: clarify gravity/pumped systems, risers, fixtures, and slope requirements.',clashes:'Plumbing: consider slope, clearance and penetration coordination.'},
 Landscape:{coordinates:'Landscape: reconcile site survey data, grading, planting and hardscape control.',modelStructure:'Landscape: define ties to civil surfaces and site zones.',elementMatrix:'Landscape: include surface, planting and hardscape elements where required.'},
 'Interior design':{bimUses:'Interiors: include space/finish reviews and procurement or furniture information only when scoped.',elementMatrix:'Interiors: clarify room finishes, fixed millwork, furniture, fixtures and equipment responsibilities.'},
 Construction:{bimUses:'Construction: add model federation, sequencing, logistics, quantity workflows or fabrication only when the scope and inputs support them.',responsibility:'Construction: establish contractor/trade federation, model ownership and design-versus-fabrication boundaries.',milestones:'Construction: account for coordination releases, fabrication handoff and record information.'},
 'Owner / facilities':{assetData:'Owner/FM: define required asset identifiers, maintainable assets, operations properties and field validation criteria.',acceptance:'Owner/FM: distinguish data-handover acceptance from construction completion.'}
};
const projectAdditions={
 Healthcare:{projectArchetypes:'Healthcare: separate occupied renovation, phased clinical renovation and new facilities.',bimUses:'Healthcare: consider above-ceiling coordination, equipment/utility interfaces and infection-control-dependent phasing.',clashes:'Healthcare: emphasize congested services, access panels and maintainability.',assetData:'Healthcare: confirm required maintainable equipment and clinical asset information with facilities teams.'},
 Education:{projectArchetypes:'Education: distinguish K–12, higher education, new campuses and occupied renovations.',milestones:'Education: coordinate handover dates with academic occupancy and phased construction.'},
 'Commercial office':{projectArchetypes:'Office: distinguish core-and-shell, tenant improvement and fit-out scopes.',modelStructure:'Office: record shell/core versus tenant boundaries and repeat-floor strategy.'},
 'Multifamily residential':{modelStructure:'Multifamily: document repeated unit types, unit variations and building/wing breakdown.',qc:'Multifamily: review unit/room consistency and shaft/vertical stack interfaces.'},
 'Single-family residential':{applicability:'Small residential: scale the BIM process proportionately to contract scope and project complexity.'},
 Hospitality:{modelStructure:'Hospitality: consider repeated guestroom types, public areas and back-of-house zones.'},
 'Civic / government':{security:'Civic/government: confirm agency security, data hosting and record retention obligations.',milestones:'Civic/government: confirm agency submittal formats and review gates.'},
 'Industrial / manufacturing':{bimUses:'Industrial: consider process equipment clearances, utility interfaces and construction sequencing where scoped.',elementMatrix:'Industrial: define process-versus-building system authoring and reliance responsibilities.'},
 'Infrastructure / transportation':{coordinates:'Infrastructure: require authoritative geospatial/project control and chainage or stationing conventions.',modelStructure:'Infrastructure: segment linear assets, corridors and extensive geographic work packages.'},
 'Laboratory / research':{clashes:'Laboratory: consider dense building services, equipment service access and specialized room requirements.',assetData:'Laboratory: confirm specialty equipment/asset data requirements.'},
 'Retail / mixed-use':{projectArchetypes:'Mixed-use: distinguish shell, retail tenant fit-out, residential and shared-core interfaces.'}
};
const combine=(items)=>items.filter(Boolean).join(' ');
export function recommendation(questionId,profile){
 const item=base[questionId];if(!item)return null;
 const d=(profile.disciplines||[]).map(x=>disciplineAdditions[x]?.[questionId]);
 const selected=Array.isArray(profile.projectTypes)?profile.projectTypes:(profile.projectType&&profile.projectType!=='General / mixed portfolio'?[profile.projectType]:[]);
 const byType=[...new Set(selected)].map(x=>projectAdditions[x]?.[questionId]);
 const other=selected.includes('Other')&&String(profile.otherProjectType||'').trim()?`Custom project type (${profile.otherProjectType.trim()}): confirm project-specific requirements, participants and information exchanges.`:null;
 return {value:combine([policyText[questionId]||item[0],policyExtension(questionId,profile)]),consider:combine([consultantConsiderations[questionId]||item[1],...d,...byType,other]),origin:'Proposed policy wording; confirm adoption with the organization'};
}
export function profileRelevant(moduleId,profile){
 // Keep governance and information requirements visible. Added guidance adapts to selection.
 return true;
}
