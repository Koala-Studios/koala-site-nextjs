# <PROJECT_NAME> Agent Guide

## Start Here

1. Run `git status --short --branch`.
2. Read `.agent/project_state.yaml` and `.agent/current_slice.md`.
3. Read the closest relevant `AGENTS.md`.
4. Use `<DURABLE_SCOPE_DOC>` for durable product and architecture rules, `<EXECUTION_LEDGER_DOC>` for the execution ledger and verification history, and `<OPERATOR_GUIDE_DOC>` for runtime or operator orientation.
5. If `.agent/project_state.yaml` points to `<ORDERING_PLAN_DOC>`, use that plan for slice ordering.

## Repo-Wide Rules

- `<DURABLE_SCOPE_DOC>` is target-state truth. `<EXECUTION_LEDGER_DOC>` is current execution truth. `.agent/*.yaml` files are fast routing, verification, and gap registries. `<OPERATOR_GUIDE_DOC>` is operator and runtime orientation.
- When code and docs disagree, trust inspected code for what exists now and update the docs in the same slice.
- Do not mark anything complete without verification evidence. If a command was not run, say so.
- Preserve the locked stack, architecture boundaries, and non-negotiable constraints documented in `<DURABLE_SCOPE_DOC>`.
- Preserve the repo's critical correctness boundaries, including `<ACCESS_CONTROL_OR_PERMISSION_RULE>`, `<DATA_ISOLATION_OR_CORRECTNESS_RULE>`, `<AUDIT_OR_TRACEABILITY_RULE>`, and `<STORAGE_OR_SENSITIVE_DATA_RULE>` if they apply.
- Keep top-level registrars, index files, and orchestration modules thin when the repo already uses feature folders or leaf modules.
- Create local `AGENTS.md` files only where they materially reduce worker mistakes.
- Keep `<EXECUTION_LEDGER_DOC>`, `<DURABLE_SCOPE_DOC>`, and `.agent/*` aligned when workflow, verification, or source-of-truth expectations change.

## Verification

- Start with `<ENVIRONMENT_HEALTHCHECK_COMMAND>` unless the slice is truly independent of runtime assumptions or the target repo has no equivalent check.
- Use `.agent/verification_registry.yaml` to choose the required verification profile for the change.
- Run focused checks for the touched surface before broader workspace or repository checks.
- If the repo has manual smoke steps or environment-dependent validation, record exactly what was or was not run.

## Routing

- `<LOCAL_GUIDE_PATH_ONE>/AGENTS.md`: <what this local guide routes workers toward>
- `<LOCAL_GUIDE_PATH_TWO>/AGENTS.md`: <what this local guide routes workers toward>
- `<LOCAL_GUIDE_PATH_THREE>/AGENTS.md`: <what this local guide routes workers toward>
- Remove unused examples and add only the local guides that matter in the target repo.
