// Profile migration and reset operations; no document requirements are asserted here.
export const ALL_PROJECT_TYPES = 'All project types';
export const OTHER_PROJECT_TYPE = 'Other';
export function normalizeProfile(value={},validTypes=[]){
 const result={...value};
 const allowed=new Set(validTypes);
 let chosen=Array.isArray(result.projectTypes)?result.projectTypes.filter(v=>allowed.has(v)||v===OTHER_PROJECT_TYPE):
     allowed.has(result.projectType)&&result.projectType!=='General / mixed portfolio'?[result.projectType]:[];
 result.projectTypes=[...new Set(chosen)];
 result.otherProjectType=typeof result.otherProjectType==='string'?result.otherProjectType:'';
 if(!result.projectTypes.includes(OTHER_PROJECT_TYPE))result.otherProjectType='';
 return result;
}
export function projectTypeLabels(profile,validTypes=[]){
 const chosen=normalizeProfile(profile,validTypes).projectTypes;
 const other=chosen.includes(OTHER_PROJECT_TYPE) ? (profile.otherProjectType||'').trim(): '';
 return [...chosen.filter(v=>v!==OTHER_PROJECT_TYPE),...(chosen.includes(OTHER_PROJECT_TYPE)?[other||'Other (specify)']:[])];
}
export function toggleProjectType(profile,value,checked,validTypes=[]){
 const current=normalizeProfile(profile,validTypes);
 const allowed=new Set([...validTypes,OTHER_PROJECT_TYPE]);
 if(!allowed.has(value))return current;
 const values=checked?[...current.projectTypes,value]:current.projectTypes.filter(v=>v!==value);
 return {...current,projectTypes:[...new Set(values)],otherProjectType:value===OTHER_PROJECT_TYPE&&!checked?'':current.otherProjectType};
}
export function selectAllProjectTypes(profile,validTypes=[]){
 return {...normalizeProfile(profile,validTypes),projectTypes:[...validTypes],otherProjectType:''};
}
export function clearProjectTypes(profile,validTypes=[]){
 return {...normalizeProfile(profile,validTypes),projectTypes:[],otherProjectType:''};
}
export function resetAnswer(profile,id){
 const answers={...(profile.answers||{})},decisions={...(profile.decisions||{})},origins={...(profile.origins||{})};
 delete answers[id];delete decisions[id];delete origins[id];
 return {...profile,answers,decisions,origins};
}
export function resetSection(profile,ids=[]){
 return ids.reduce((d,id)=>resetAnswer(d,id),profile);
}
export function resetDiscovery(profile){
 return {...profile,answers:{},decisions:{},origins:{}};
}
