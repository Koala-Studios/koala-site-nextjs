# Workflow Template

This folder is a project-agnostic starting point for the layered workflow used in this repo.

The goal is not to copy CondoFusion-specific filenames, commands, or stack choices into another codebase. The goal is to preserve the workflow shape:

- a small repo-wide `AGENTS.md`
- only a few high-value local `AGENTS.md` files
- compact `.agent/*.yaml` routing and verification state
- a durable scope document, an execution ledger, and an operator-oriented README with non-overlapping roles
- verification rules that are discoverable before a worker claims completion

## Template Tree

```text
workflow_template/
  AGENTS.md
  local_AGENTS.md
  IMPLEMENT_WORKFLOW_FROM_TEMPLATE.md
  .agent/
    project_state.yaml
    module_registry.yaml
    verification_registry.yaml
    known_gaps.yaml
    current_slice.md
```

## How To Use This Template

1. Replace every `<PLACEHOLDER>` with a real value from the target repo.
2. Delete sections that do not apply to the target repo instead of leaving generic filler behind.
3. Keep `AGENTS.md` files short. Put durable repo-wide rules in the root guide and only local routing in directory-level guides.
4. Add local `AGENTS.md` files only for surfaces that clearly benefit from local routing.
5. Populate `.agent/*.yaml` from inspected code and checked commands, not from assumptions or old documentation.
6. Keep the durable scope doc, execution ledger, operator guide, and `.agent` registries aligned whenever the workflow changes.

## Placeholder Rules

- Do not ship the final workflow with unresolved angle-bracket placeholders.
- Do not keep example commands if they were not verified in the target repo.
- Do not keep example modules, paths, or local guide locations if the target repo does not actually use them.
- Do not hardcode a package manager, framework, or runtime command unless the target repo actually uses it.

## Optional Files

- `local_AGENTS.md` is a template for directory-level guides. Copy it only into directories that need local routing help.

## Expected Result

After adoption, a future worker should be able to answer these quickly:

- What repo-wide rules always apply?
- What local rules apply in the area being touched?
- What is the current active slice?
- Which files and commands are authoritative for this task?
- What verification is required before completion can be claimed?
- Which known gaps or unverified claims still matter?
