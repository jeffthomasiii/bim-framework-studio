# BIM Framework Studio | Architecture and evidence model

## Purpose
A discovery-driven AEC application that eventually generates two distinct artifacts: organizational BIM Requirements and a reusable corporate BIM Execution Plan (BEP). A project-specific BEP is a separate adaptation workflow.

## Current working release
Static JavaScript and CSS on GitHub Pages. Browser-local discovery, per-question draft/approval status, JSON backup/import, two plain-text or Markdown working drafts, standards registry, selectable exhibit list. No hosted backend, user accounts, DOCX/PDF generator or standards compliance engine yet.

## Document separation
- BIM Requirements: baseline directives that may become contractual if incorporated into executed agreements. Do not imply that document title alone makes a provision contractual.
- Company-standard BEP: reusable working procedures and project adaptation instructions. Contract precedence and applicable owner requirements must be reconciled per project.
- Project BEP: project parties, responsibilities, schedule, information exchanges, deliverables and approved deviations.

## Supplied sources (do not upload private client data or licensed standards to the public site)
1. Client-facing BEP Template: 14 core sections; recommended language / client decisions / illustrations.
2. Internal BEP Consultant Playbook: discovery prompts, evidence, open decision status and acceptance checks.
3. Optional BEP Exhibit Library: 14 optional supporting exhibits, not automatic scope.
4. BEP Table of Contents: 18 additional project-level chapter concepts.
5. BIM Requirements Document Example: seven chapters, including Introduction, General, Deliverables, Submittals, Modeling, Additional Tasks and References.
6. BIM Project Execution Plan Example: Cover, Change Log, Instructions, Project Information, Element Responsibility, QC Checklist.
7. BIMForum 2025 LOD Specification Part I: reference descriptions and licensing; does not prescribe phase-specific LOD or model authorship.
8. BIMForum 2025 Part II: Model Element Table, Keynotes, Uniclass to Omniclass/Uniformat crosswalk.

## Planned data model
Organization > organizational archetype / discipline profiles > discovery sessions > questions > responses > decision records > evidence references > rule evaluation > document section instances > revisions / approvals.
Every recommendation should include source, source edition, applicability, evidence, confidence/verification status, responsible reviewer, and an exception/override pathway.

## Governance
- Never invent empty answers or mark unanswered decisions approved.
- Approval and legal incorporation require human review.
- Keep standards references distinct from user-specific rules.
- Edition must be explicitly selected for normative or contractual requirements.
- Do not reproduce copyrighted or licensed standards without permission.
- Browser localStorage is NOT a secure store: avoid confidential inputs in the public prototype.

## Priority follow-ons
1. Add evidence capture and structured decisions (owner, date, source, approval).
2. Map fields/sections to both source frameworks, avoid duplicate questions.
3. Introduce project/organization type conditional discovery.
4. Add Model Element Table editor: classification, system, phase/milestone, LOD reference, geometry, non-graphic data, author, reliance, reviewer.
5. Introduce rule catalog with applicability and edition checks, no automatic compliance claims.
6. Add branded DOCX outputs, approval workflow, and eventually authenticated secure storage.
