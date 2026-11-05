// Additional, optional draft clauses activated by selected disciplines and project types.
// They do not establish contractual obligations and are subject to client review.
const discipline={
 Architecture:{modelStructure:'Architectural models are organized to support review of building envelopes, levels, room and space data, and architectural interfaces with other disciplines.',qc:'Architectural model reviews address rooms, spatial relationships, levels and grids, model links, and consistency with issued drawing sets.'},
 Structural:{elementMatrix:'Structural model element requirements address foundations, framing systems, principal connections, and the intended use of analytical or physical representations, as applicable.'},
 Civil:{coordinates:'Civil and survey participants document the authoritative horizontal and vertical coordinate systems, survey control, georeferencing approach, and procedures for verifying site-to-building alignment.',modelStructure:'Civil models are organized by applicable surfaces, utility networks, alignments, corridors, and geographic project extents.'},
 Mechanical:{clashes:'Mechanical coordination reviews address equipment replacement and maintenance clearances, principal distribution routes, shafts, and interfaces with architectural and structural systems.',elementMatrix:'The Model Element Table identifies applicable mechanical equipment and distribution systems, including clearance and service information where required.'},
 Electrical:{clashes:'Electrical coordination reviews principal equipment access zones, pathway interfaces and identified system separation constraints.',elementMatrix:'The Model Element Table identifies electrical equipment, pathways, and other specified elements by intended use and information milestone.'},
 Plumbing:{clashes:'Plumbing coordination includes the required slope, drainage, major distribution, and accessible maintenance interfaces.',elementMatrix:'The Model Element Table identifies piping, fixtures, risers, equipment and associated information requirements where within scope.'},
 Landscape:{coordinates:'Landscape model references are checked against civil surfaces, project survey control and site grading information.',elementMatrix:'Landscape information requirements address applicable planting, hardscape and site elements where modeling is within project scope.'},
 'Interior design':{elementMatrix:'Interior information requirements address specified finishes, millwork, fixed furniture, fixtures and equipment, with clear boundaries between model authors.'},
 Construction:{bimUses:'Where the construction scope requires it, the project team identifies model federation, sequencing, construction logistics and fabrication exchanges as separate BIM uses with defined outputs.',responsibility:'The responsibility matrix distinguishes design-intent model authorship from construction coordination, trade detailing and fabrication obligations.'},
 'Owner / facilities':{assetData:'Where facilities data is required, the owner identifies maintainable assets, mandatory property fields, data validation procedures, and receiving systems before the information delivery plan is approved.'}
};
const buildings={
 Healthcare:{projectArchetypes:'Healthcare project planning identifies occupied facilities, phased clinical renovations and specialty system interfaces that affect information coordination.',clashes:'Healthcare project coordination addresses above-ceiling distribution, maintainability, clinical equipment interfaces and restrictions associated with occupied or phased work.'},
 Education:{milestones:'Project information-delivery milestones are coordinated with academic occupancy, operational continuity and any required phased turnover.'},
 'Commercial office':{modelStructure:'The team identifies responsibilities and information boundaries for core-and-shell works and tenant improvements where these scopes are separate.'},
 'Multifamily residential':{modelStructure:'Repeated unit configurations, core systems and unit-specific exceptions are managed through approved modeling and review conventions.'},
 'Industrial / manufacturing':{elementMatrix:'The model element responsibility table distinguishes building service systems from process and production equipment and defines exchange reliance at each relevant milestone.'},
 'Infrastructure / transportation':{coordinates:'Linear infrastructure projects identify stationing, alignment references, geospatial datums and authoritative survey control for all required exchanges.'},
 'Laboratory / research':{clashes:'Coordination reviews consider equipment service zones, dense utility interfaces, specialized rooms and required maintenance access.'},
 'Civic / government':{security:'Government or civic project information is managed in accordance with project-specific agency security, access and retention requirements established in the governing agreement.'}
};
export function policyExtension(id,profile={}){
 const d=(profile.disciplines||[]).map(n=>discipline[n]?.[id]).filter(Boolean);
 const types=Array.isArray(profile.projectTypes)?profile.projectTypes:profile.projectType?[profile.projectType]:[];
 const p=[...new Set(types)].map(n=>buildings[n]?.[id]).filter(Boolean);
 return [...d,...p].join(' ');
}
