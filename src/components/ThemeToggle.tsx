"use client";

import React from "react";
import { Row, ToggleButton, useTheme } from "@once-ui-system/core";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  // Derived during render: `theme` is the provider's single source of truth
  // (it drives the data-theme attribute), so no mount effect is needed.
  // Defaults to light pre-hydration to avoid a server/client mismatch.
  const currentTheme = theme === "dark" ? "dark" : "light";

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
