"use client";

import { useEffect, useRef, useState } from "react";

export default function ServiceWorker() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const swRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" });
        swRef.current = reg;

        reg.addEventListener("updatefound", () => {
          const newSW = reg.installing;
          if (!newSW) return;

          newSW.addEventListener("statechange", () => {
            if (newSW.state === "installed" && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          });
        });
      } catch {
        // SW registration failed
      }
    };

    window.addEventListener("load", register);

    return () => {
      window.removeEventListener("load", register);
    };
  }, []);

  const handleRefresh = () => {
    setUpdateAvailable(false);
    if (swRef.current?.waiting) {
      swRef.current.waiting.postMessage("skip-waiting");
    }
    window.location.reload();
  };

  return updateAvailable ? (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        background: "var(--neutral-background-strong)",
        border: "1px solid var(--neutral-alpha-weak)",
        borderRadius: "12px",
        padding: "12px 20px",
        boxShadow: "var(--shadow-m)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "14px",
        color: "var(--neutral-strong)",
      }}
    >
      <span>New version available</span>
      <button
        onClick={handleRefresh}
        style={{
          background: "var(--accent-brand-weak)",
          border: "none",
          borderRadius: "8px",
          padding: "6px 14px",
          color: "#fff",
          fontSize: "13px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Refresh
      </button>
    </div>
  ) : null;
}
