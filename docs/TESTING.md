# Testing — portfolio-front

Testing policy enforced (advisory) through `mcp-rules.json`.

## Requirements

1. **Shared logic ships tests.** Changes to `src/lib/**` and
   `src/utils/**` must add/update `*.test.ts(x)` (severity: warning).
2. **UI routes need manual verification.** No jsdom suite exists yet;
   verify with `pnpm build` + `pnpm start` and curl the touched routes.
3. **No skipped tests.** `describe.skip` / `it.skip` forbidden in landed code.
4. **Behavior over implementation.** Assert outputs and side effects.

## Running

```bash
pnpm lint          # next lint — must pass
pnpm build         # next build (standalone) — must pass
# manual smoke:
pnpm start &
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s "http://localhost:3000/api/search?q=test" | head -c 500
```

## Coverage

No numeric gate. Each new behavior in `lib`/`utils` needs at least one
test that would fail without it. When adding a test runner, update this
file and `mcp-rules.json` (`requireTest` severity → `error`).
