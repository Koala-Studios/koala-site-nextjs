# Current Slice

## Fast Start

1. `AGENTS.md`
2. `.agent/project_state.yaml`
3. the closest relevant `AGENTS.md`
4. the relevant sections of `<DURABLE_SCOPE_DOC>`
5. `<EXECUTION_LEDGER_DOC>` for detailed evidence, blockers, and handoff history

## Current Lane

- Phase: `<ACTIVE_PHASE_LABEL>`
- Default implementation slice: `<DEFAULT_SLICE_NAME_OR_REMOVE_IF_NOT_NEEDED>`
- Goal: `<What the next worker should accomplish>`
- Likely touch paths:
  - `<path/one>`
  - `<path/two>`
  - `<path/three>`

## Current Verification State

- Latest verified slice: `<LATEST_VERIFIED_SLICE>`
- Latest verified commands: `<COMMAND_ONE>`, `<COMMAND_TWO>`, `<COMMAND_THREE>`
- Remaining caution: `<Important caution that still applies to the next worker>`
- Next recommended slice: `<NEXT_SLICE_OR_PRIORITY>`

## Evidence Still Missing

- `<UNVERIFIED_CLAIM_OR_SMOKE_GAP_ONE>`
- `<UNVERIFIED_CLAIM_OR_SMOKE_GAP_TWO>`

## Workflow Reminder

`<DURABLE_SCOPE_DOC>` is the durable contract, `<EXECUTION_LEDGER_DOC>` is the detailed execution ledger, and `.agent/*.yaml` files are the quick routing layer. Update them together when the workflow or verification rules change.
