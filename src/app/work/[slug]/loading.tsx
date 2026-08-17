import { Column } from "@once-ui-system/core";

export default function Loading() {
  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <div
          style={{
            width: "60px",
            height: "16px",
            borderRadius: "var(--radius-m)",
            background: "var(--neutral-alpha-weak)",
          }}
        />
        <div
          style={{
            width: "70%",
            height: "36px",
            borderRadius: "var(--radius-m)",
            marginTop: "12px",
            background: "var(--neutral-alpha-weak)",
          }}
        />
        <div
          style={{
            width: "85%",
            height: "36px",
            borderRadius: "var(--radius-m)",
            marginTop: "4px",
            background: "var(--neutral-alpha-weak)",
          }}
        />
        <div
          style={{
            width: "60%",
            height: "14px",
            borderRadius: "var(--radius-m)",
            marginTop: "8px",
            background: "var(--neutral-alpha-weak)",
          }}
        />
      </Column>
      <div
        style={{
          width: "100%",
          maxWidth: "40rem",
          aspectRatio: "16 / 9",
          borderRadius: "var(--radius-l)",
          background: "var(--neutral-alpha-weak)",
          margin: "0 auto",
        }}
      />
      <Column maxWidth="xs" gap="12" fillWidth style={{ margin: "auto" }}>
        {[85, 70, 92, 78, 88, 65].map((w, i) => (
          <div
            key={i}
            style={{
              width: `${w}%`,
              height: "14px",
              borderRadius: "var(--radius-m)",
              background: "var(--neutral-alpha-weak)",
              opacity: 1 - i * 0.1,
            }}
          />
        ))}
      </Column>
    </Column>
  );
}
