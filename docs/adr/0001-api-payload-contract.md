---
id: "0001"
title: "API routes fetch Payload CMS, degrade to empty on failure"
status: accepted
date: 2026-10-01
---

# ADR-0001: API routes fetch Payload CMS, degrade to empty on failure

## Context

`portfolio-front` renders content owned by `portfolio-admin` (Payload).
The front must stay up even when the CMS is unreachable (deploys, cold
boots, network blips). `src/app/api/**` is the boundary where this
contract is enforced.

## Decision

All CMS reads go through `NEXT_PUBLIC_API` with graceful degradation:
fetch failure yields empty data, never a thrown render error. Search,
track, publications, and password-gate routes follow the same rule.

## Consequences

- Front deploys never block on CMS availability.
- API changes must keep the degrade-to-empty behavior; breaking it
  requires superseding this ADR.
- `mcp-rules.json` (`api-contract-governed`) enforces an ADR reference
  for every `src/app/api/**` change.
