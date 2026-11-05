# BIM Framework Studio

**Standards-informed BIM discovery and document drafting for AEC organizations.**

This is the initial working application. It turns an organization's answers into **two separate, unapproved working drafts**: a BIM Requirements Document and a corporate BIM Execution Plan template. Both drafts display unanswered decisions rather than inventing policies.

## Live deployment
After GitHub Pages is set to **GitHub Actions** under Settings > Pages, merge the feature PR into main. The site will deploy to:

https://jeffthomasiii.github.io/bim-framework-studio/

## Development
No package manager or build step is required for the initial prototype. Open using any local static HTTP server, for example:

```bash
python -m http.server 8000
```

Visit http://localhost:8000. Opening `index.html` directly from disk may not load the JavaScript module, so use a local server.

## What works
- Responsive navigation and organization profile
- Nine discovery sections built from user-supplied BIM frameworks
- Field-by-field recommended starting points and expandable considerations
- Discipline and primary project-type profiles that tailor those recommendations
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
