// Optional exhibit starters based on the supplied exhibit library names and examples.
// Blank illustrative tables are not adopted project requirements.
export const exhibitTemplates=[
 {title:'BIM Use Analysis Worksheet',columns:['BIM use','Business outcome','Phase / owner','Inputs / outputs','Priority / approval']},
 {title:'Information Exchange Worksheet',columns:['Exchange ID / trigger','Sender / recipient','Information and format','CDE status / frequency','Acceptance / reviewer']},
 {title:'BIM Project Execution Planning Guide',columns:['Planning stage','Required decision','Decision owner','Evidence / deadline','Approval status']},
 {title:'Model Element Table',columns:['Element / system','Milestone','LOD reference / target','Information required','Author / reviewer']},
 {title:'Responsibility Matrix',columns:['Activity / information','Responsible','Accountable','Consulted','Informed']},
 {title:'Software Platform Matrix',columns:['Function','Application / version','Owner / users','Exchange / interface','Verification / restriction']},
 {title:'BIM Goals and Objectives Form',columns:['Goal','Business outcome / KPI','Baseline / target','Owner / due','Evidence / status']},
 {title:'Project Delivery Method Exhibit',columns:['Project type / delivery method','BIM use','Team responsibility','Required exchange','Special conditions']},
 {title:'File Naming Convention Guide',columns:['Container type','Naming pattern','Example','Status / revision','Validation / approver']},
 {title:'Coordination Meeting Agenda Template',columns:['Agenda item','Issue / reference','Responsible party','Target date','Disposition']},
 {title:'Quality Control Checklist',columns:['Discipline / model','Quality check','Acceptance criterion','Reviewer','Status / evidence']},
 {title:'BIM Submittal Form',columns:['Milestone','Deliverable / identifier','Format / revision','Submitted by','Acceptance status']},
 {title:'Hardware Specifications Sheet',columns:['Role / workload','Minimum specification','Application dependency','Owner','Review date']},
 {title:'Training Plan Template',columns:['Role / audience','Workflow / competency','Delivery method','Trainer / owner','Completion evidence']}
];
export const exhibitTitle=i=>exhibitTemplates[i]?.title||'Optional Exhibit';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
export function exhibitHtml(i,organization=''){
 const item=exhibitTemplates[i];if(!item)return '';
 const heads=item.columns.map(v=>'<th>'+esc(v)+'</th>').join('');
 const rows=Array.from({length:6},()=>'<tr>'+item.columns.map(()=>'<td>&nbsp;</td>').join('')+'</tr>').join('');
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>'+esc(item.title)+'</title><style>body{font:11pt Arial,sans-serif;color:#213650;margin:48px}h1{color:#173c74}table{border-collapse:collapse;width:100%;margin:28px 0}th,td{border:1px solid #a5b5c8;padding:12px;text-align:left}th{background:#e9eff7}td{height:30px}p{line-height:1.5}.note{color:#636d79;font-size:10pt}</style></head><body><h1>Exhibit '+String(i+1).padStart(2,'0')+' · '+esc(item.title)+'</h1><p>Organization: '+esc(organization||'[ORGANIZATION]')+' &nbsp; | &nbsp; Project: [PROJECT] &nbsp; | &nbsp; Revision: [REV]</p><p class="note">Working template only. Project team must define the applicable content, approval, and any contractual status before use.</p><table><thead><tr>'+heads+'</tr></thead><tbody>'+rows+'</tbody></table><p>Prepared by: __________________ &nbsp; Reviewed by: __________________ &nbsp; Approved by: __________________</p></body></html>';
}
