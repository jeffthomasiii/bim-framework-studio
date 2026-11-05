# BIM Framework Studio

**Standards-informed BIM discovery and document drafting for AEC organizations.**

This is the initial working application. Its blue, responsive UI follows the approved desktop and mobile mockup direction, and the same site now includes an installable Progressive Web App (PWA) shell. It turns an organization's answers into **two separate, unapproved working drafts**: a BIM Requirements Document and a corporate BIM Execution Plan template. Both drafts display unanswered decisions rather than inventing policies.

## Live deployment
After GitHub Pages is set to **GitHub Actions** under Settings > Pages, merge the feature PR into main. The site will deploy to:

https://jeffthomasiii.github.io/bim-framework-studio/

## Development
No package manager or build step is required for the initial prototype. Open using any local static HTTP server, for example:

```bash
python -m http.server 8000
```

Visit http://localhost:8000. Opening `index.html` directly from disk may not load the JavaScript module, so use a local server.

## Blue brand and PWA
- Navy and blue identity with a geometric BIM Studio mark, card-based desktop overview and persistent mobile bottom navigation
- Web app manifest and 192/512-pixel PNG icons, including a maskable icon
- Service worker that caches the application shell for offline re-entry after the first successful online load
- Install prompts when the browser allows them, plus browser-specific installation guidance
- A mobile More menu for Standards, Exhibits and organization/backup tools
- PWA installation does **not** provide cloud sync: browser-local drafts stay on that device and origin; always export JSON backups before switching browsers or devices

## Standards-aware conditional drafting
- Select AIA digital practice (G203-2022 family), NCS V7, ISO 19650-2 and/or BIMForum LOD 2025 in the Standards workspace
- Applicable selections add distinct, source-traceable procedural or requirements provisions to BRD and corporate BEP output, without treating every industry reference as contractually adopted
- Contextual considerations appear alongside relevant discovery questions (naming, CDE, exchanges, responsibilities, Model Element Table and QA/QC)
- ISO 19650 naming requires an explicitly selected national annex or project information standard; no universal filename is fabricated
- AIA G203 file-naming protocols and NCS AIA CAD layer/sheet conventions remain separate, with edition and applicability cautions
- Project types (including healthcare and infrastructure) and civil/MEP disciplines trigger targeted provisions
- Original interpretive clauses and references only; no copyrighted standard text republished or certification of compliance

## What works
- Responsive navigation and organization profile
- Nine discovery sections built from user-supplied BIM frameworks
- Field-by-field recommended starting points and expandable considerations
- Discipline and architecture/project-type profiles that tailor those recommendations
- Choose one, several, or all architecture/project types, with an Other text field for custom building types
- Reset a single discovery field, a section, all discovery responses, profile choices, project-type selections, or the entire local workspace (confirmation before destructive resets)
- Previously saved single-choice project types migrate to the new multi-select format
- Use a single recommendation, fill a section, or populate every unanswered discovery field
- Regenerate all defaults only with explicit confirmation (this replaces existing custom entries)
- Track suggested versus client-authored values; defaults always begin Draft / unapproved
- Draft decision statuses and persistent browser storage
- JSON download and import
- Standards reference registry with edition and licensing cautions
- Separate BIM Requirements and BEP working previews
- Plain text and Markdown working draft export
- Selection of the 14 optional exhibits

## Current limitations
- No accounts, backend, collaboration, DOCX/PDF generation, contractual review, LOD validation or standards compliance certification
- PWA installation and offline support depend on browser, device, and a successful initial online visit; latest online content requires connectivity and may need a reload
- Data is stored in browser localStorage. It is not encrypted or synchronized. Do not enter sensitive client material on a shared device.
- Document previews are structured discovery transcripts, **not finished professional templates**.
- Recommended content represents authored starting practices, not prescriptive standards requirements. Do not assume automatic compliance or contractual incorporation.
- Defaults are snapshot text generated for the current discipline/project-type selection. Change the profile and explicitly regenerate defaults to update them; this overwrites user edits only after confirmation.
- Uploaded source documents are NOT published as repository assets.

## Reference framing
The client-facing BEP template provides 14 foundational sections; the internal consultant playbook provides discovery prompts and decisions. The BIM Requirements document example uses a different, contractual-requirements-oriented structure. The example BEP workbook comprises six sheets (cover, change log, instructions, project information, element responsibility and QC checklist). BIMForum 2025 Part I and Part II require separate license evaluation before any reproduction or transformation.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Next milestone
Implement section-level requirement semantics, conditional discipline discovery, evidence links, a separate project BEP workflow, element author/LOD tables, and document formatting.
