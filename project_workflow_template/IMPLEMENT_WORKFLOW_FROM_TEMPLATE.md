# Workflow Implementation Worker Guide

This file is a strict fill-in template for the worker who will implement the workflow in another repo.

Do not send this guide to a worker until every `<PLACEHOLDER>` has been replaced with real repo data and every required file path or command has been checked in the target repo.

## Prompt Author Rules

1. Replace every placeholder with exact repo-specific files, directories, commands, and constraints.
2. Remove any section that does not apply to the target repo instead of leaving example text behind.
3. Verify every path and command before handing the prompt to a worker.
4. If the target repo does not have a durable scope doc, execution ledger, operator guide, environment healthcheck, or local guide candidate, identify the closest real equivalents first.
5. Do not keep this template generic when you hand it to the worker. The worker should receive a repo-specific prompt, not a blank framework.

## Copyable Worker Prompt

```text
# Workflow Refactor Worker Prompt

You are the implementation worker for a documentation-and-agent-workflow refactor in `<REPO_NAME>`.

This is not a product-feature slice. Your job is to inspect the actual repository, understand how the project currently works, and refactor the worker/file workflow so future coding agents operate with less wasted context, better routing, better consistency, and higher verification discipline.

You must work from the real codebase, not from assumptions, old docs alone, or placeholder workflow text.

---

## Mission

Refactor the current worker-doc workflow away from a single large prose-first handoff model toward a layered agent-guidance system plus structured machine-readable state, while preserving the existing strengths of the project:

- clear source-of-truth separation
- strict verification before status promotion
- locked architecture and stack constraints that the repo already depends on
- correctness, access-control, and data-handling invariants that must not be weakened
- explicit handoff quality

You are expected to inspect the real repo and produce workflow/documentation changes grounded in the codebase as it exists today.

---

## Current Context You Must Respect

The repo currently has:

- `<TOP_LEVEL_SURFACE_ONE>`
- `<TOP_LEVEL_SURFACE_TWO>`
- `<TOP_LEVEL_SURFACE_THREE>`
- `<SHARED_OR_SUPPORTING_SURFACES>`
- verification or local infra tooling under `<VERIFICATION_OR_INFRA_PATHS>`

Current source-of-truth pattern:

- `<DURABLE_SCOPE_DOC>` is target-state truth
- `<EXECUTION_LEDGER_DOC>` is current execution truth
- `<OPERATOR_GUIDE_DOC>` is runtime or operator orientation

The current system may already be useful, but it is too prose-heavy or too expensive in context. Your assignment is to improve the workflow files and agent-routing structure, not to add product features.

---

## Non-Negotiable Outcome

When you finish, the repo should have a clearer agent workflow that makes it easier for future workers to answer:

1. What permanent repo rules always apply?
2. What directory-specific or surface-specific rules apply here?
3. What is the current active slice?
4. Which files and commands are authoritative for this task?
5. What verification is required before claiming completion?
6. What known gaps and unverified claims still exist?

The workflow must require less repeated reading while preserving or improving correctness.

---

## Primary Deliverables

You must inspect the repo and implement the best version of the following structure that fits the actual codebase:

### 1. Layered agent guidance

Create or refactor to a layered `AGENTS.md` system, including at minimum:

- `AGENTS.md` at repo root
- local `AGENTS.md` files for the highest-value surfaces listed below:
  - `<LOCAL_GUIDE_TARGET_ONE>`
  - `<LOCAL_GUIDE_TARGET_TWO>`
  - `<LOCAL_GUIDE_TARGET_THREE>`

Add more directory-level `AGENTS.md` files only where the codebase clearly benefits from them. Do not create noisy or redundant files.

These files must be short, high-signal, and scoped. Do not dump large narrative content into them.

### 2. Structured workflow state

Introduce a small machine-readable workflow state directory, such as `.agent/`, containing at minimum:

- `project_state.yaml`
- `module_registry.yaml`
- `verification_registry.yaml`
- `known_gaps.yaml`

You may add one small human-readable summary file if useful, such as `current_slice.md`, but do not recreate the old giant prose pattern.

### 3. Refactor the existing prose docs without destroying their value

Update the current workflow docs so they have clearer roles and less overlap:

- `<DURABLE_SCOPE_DOC>` should remain the durable product or architecture contract
- `<EXECUTION_LEDGER_DOC>` should remain the operational execution ledger, but should no longer be the only efficient entry point for workers
- `<OPERATOR_GUIDE_DOC>` should remain human or operator oriented

Do not blindly keep duplicated sections if the new workflow structure makes them unnecessary.

### 4. Ground the new workflow in real code

The structured files must be built from the repository as it exists now. At minimum, inspect these areas before deciding the file structure:

- `<REQUIRED_INSPECTION_PATH_ONE>`
- `<REQUIRED_INSPECTION_PATH_TWO>`
- `<REQUIRED_INSPECTION_PATH_THREE>`
- `<REQUIRED_INSPECTION_PATH_FOUR>`
- `<REQUIRED_INSPECTION_PATH_FIVE>`
- current test locations
- current smoke or verification commands
- current route, module, package, or feature organization

Do not create abstract documentation that is not tied to actual repo structure.

---

## Hard Constraints

### You must do all of the following

1. Run `git status --short --branch` first.
2. Read:
   - `<DURABLE_SCOPE_DOC>`
   - `<EXECUTION_LEDGER_DOC>`
   - `<OPERATOR_GUIDE_DOC>`
3. Inspect the real code layout before changing workflow docs.
4. Compare docs against code and fix drift where necessary.
5. Preserve the current architecture, stack, and correctness assumptions unless you find a real contradiction and document it.
6. Preserve the rule that nothing gets marked complete without verification evidence.
7. Update docs and structured workflow files together so they do not disagree.
8. Leave a clean handoff for the next worker.

### You must not do any of the following

1. Do not turn this into a product-feature slice.
2. Do not introduce retrieval infrastructure, embeddings pipelines, vector stores, or workflow services in this slice.
3. Do not create redundant giant instruction files in every folder.
4. Do not leave speculative file inventories that were not checked against the repo.
5. Do not claim commands, tests, routes, ownership, or module boundaries without inspecting them.
6. Do not rewrite the architecture or stack unless you find a real contradiction and document it.
7. Do not delete useful operational history from `<EXECUTION_LEDGER_DOC>`; refactor responsibly.
8. Do not mark the new workflow complete unless at least one realistic worker path is improved and validated.

---

## Design Requirements For The New Workflow

### Root `AGENTS.md`

The root file should be durable and small. It should contain only repo-wide rules that should apply to almost every task, such as:

- source-of-truth hierarchy
- required initial checks
- when to consult `<DURABLE_SCOPE_DOC>` versus `<EXECUTION_LEDGER_DOC>` versus structured workflow files
- verification expectations
- documentation update expectations
- architectural or correctness constraints that must not be violated
- guidance to prefer the closest relevant `AGENTS.md` file for local conventions

### Directory-Level `AGENTS.md`

Directory files should contain only local guidance, such as:

- which files in that area are authoritative
- important local conventions
- local verification commands
- dangerous assumptions to avoid
- common routing hints for that surface

### Structured State Files

These should be compact and practical.

#### `project_state.yaml`

Include only the minimum operational context workers need:

- active phase
- current priority slice
- current blocker(s)
- current documentation or workflow objective
- critical repo-wide invariants
- likely touch paths for the current slice

#### `module_registry.yaml`

Map modules or repo surfaces to:

- owner area(s)
- primary paths
- current maturity or status
- key authoritative files
- key verification profiles

Do not pretend to maintain a perfect enterprise CMDB. Keep it usable.

#### `verification_registry.yaml`

Map common change types or repo areas to required checks. Examples:

- docs-only changes
- interface or service changes
- data model or repository changes
- client or UI changes
- background job or scheduler changes
- auth or access-control changes
- storage or file-handling changes
- infra or setup-script changes
- shared library or contract changes

This file should make it easy for future workers to know what they must run before claiming completion.

#### `known_gaps.yaml`

Capture:

- known unverified claims
- recurring smoke gaps
- important warnings
- high-risk unfinished areas
- evidence gaps explicitly called out in current docs

Do not bury these only in prose.

---

## Required Inspection Workflow

Follow this sequence:

1. Run `git status --short --branch`.
2. Read:
   - `<DURABLE_SCOPE_DOC>`
   - `<EXECUTION_LEDGER_DOC>`
   - `<OPERATOR_GUIDE_DOC>`
3. Inspect the actual repo structure.
4. Inspect the major code ownership boundaries in:
   - `<REQUIRED_INSPECTION_PATH_ONE>`
   - `<REQUIRED_INSPECTION_PATH_TWO>`
   - `<REQUIRED_INSPECTION_PATH_THREE>`
   - `<REQUIRED_INSPECTION_PATH_FOUR>`
   - `<REQUIRED_INSPECTION_PATH_FIVE>`
5. Identify:
   - repeated worker mistakes the current files encourage
   - duplicated guidance
   - high-cost required reading that can be replaced by routing
   - current verification sources
   - the most natural directory boundaries for layered guidance
6. Implement the new workflow files.
7. Refactor existing docs to align with the new workflow.
8. Verify that the new workflow is internally consistent.
9. Update handoff docs.
10. Leave a final summary for the next worker.

---

## Specific Questions You Must Answer Through Code Or Doc Changes

Your changes should make it easier for a future worker to answer each of these without rereading the entire repo history:

- Which files should I read first for this task?
- Which area owns the change I am making?
- Which commands verify this type of change?
- Which claims in the docs are still unverified?
- Which current blockers matter most?
- Which paths are risky for access control, data isolation, storage, background work, or other high-risk invariants in this repo?
- Which instructions are repo-global and which are directory-local?

If your changes do not materially improve this, the slice is not done.

---

## Verification Requirements

You must verify the workflow refactor, not just edit docs.

At minimum, do the following as applicable:

- run `<ENVIRONMENT_HEALTHCHECK_COMMAND>` unless it is truly unnecessary and explain if skipped
- run any docs, lint, typecheck, or validation commands needed for touched files
- run targeted checks that confirm the commands and file paths you documented are real
- verify that the new `AGENTS.md` files do not contradict each other
- verify that structured workflow files align with the repo and current docs
- verify that `<EXECUTION_LEDGER_DOC>` and `<DURABLE_SCOPE_DOC>` still correctly express current-state versus target-state roles after your refactor

If you add file paths, commands, or verification mappings that were not actually checked, say so explicitly.

---

## Quality Bar

The new workflow should be judged by these standards:

- future workers can get started with less repeated reading
- instructions are more local and less bloated
- repo-specific routing is clearer
- verification requirements are easier to discover
- unverified claims are easier to locate
- the docs remain truthful to the actual codebase
- no important architectural guardrails were lost

Do not optimize for elegance alone. Optimize for future worker correctness.

---

## Suggested Implementation Direction

Unless the repository strongly suggests a better structure, aim for this shape:

- `AGENTS.md`
- `<LOCAL_GUIDE_TARGET_ONE>/AGENTS.md`
- `<LOCAL_GUIDE_TARGET_TWO>/AGENTS.md`
- `<LOCAL_GUIDE_TARGET_THREE>/AGENTS.md`
- `.agent/project_state.yaml`
- `.agent/module_registry.yaml`
- `.agent/verification_registry.yaml`
- `.agent/known_gaps.yaml`
- `.agent/current_slice.md`

Only add more files if inspection shows clear value.

---

## Required Final Handoff Format

When you finish, provide a handoff with these exact sections:

1. **What changed**
2. **Why this improves worker efficiency**
3. **Files added**
4. **Files updated**
5. **How the source-of-truth workflow now works**
6. **Verification run**
7. **Known limitations**
8. **Recommended next refinement**

In the handoff, be explicit about any remaining ambiguity or unverified assumptions.

---

## Success Condition

This slice is complete only if all of the following are true:

- the repo now has a layered worker-guidance structure
- there is machine-readable workflow state
- the old prose docs have clearer, less-overlapping roles
- the new workflow is grounded in inspected code paths and commands
- verification was performed and documented
- the next worker can start faster and with less ambiguity than before
```
