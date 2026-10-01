import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    extends: [nextVitals],
    plugins: { "react-hooks": reactHooks },
    rules: {
      // React Compiler-era rules (new in eslint-config-next 16): warn-only
      // until existing fetch-on-mount / reset-on-prop-change patterns are
      // migrated (they work correctly today — see ThemeToggle cleanup).
      // Do not add new violations; promote back to error after migration.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"]),
]);
