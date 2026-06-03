import { Column, Flex, Row } from "@once-ui-system/core";

export default function Loading() {
  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Flex fillWidth horizontal="center" vertical="start" gap="xl" paddingX="l">
        <Column as="section" maxWidth="s" flex={1} horizontal="center" gap="l" paddingTop="24">
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <div
              style={{
                width: "40px",
                height: "16px",
                borderRadius: "var(--radius-m)",
                background: "var(--neutral-alpha-weak)",
              }}
            />
            <div
              style={{
                width: "100px",
                height: "12px",
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
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--neutral-alpha-weak)",
                }}
              />
              <div
                style={{
                  width: "120px",
                  height: "14px",
                  borderRadius: "var(--radius-m)",
                  background: "var(--neutral-alpha-weak)",
                }}
              />
            </Row>
          </Row>
          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: "var(--radius-l)",
              background: "var(--neutral-alpha-weak)",
              marginTop: "12px",
              marginBottom: "8px",
            }}
          />
          <Column as="article" maxWidth="s" gap="12" fillWidth>
            {[85, 70, 92, 78, 88, 65, 80, 75].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}%`,
                  height: "14px",
                  borderRadius: "var(--radius-m)",
                  background: "var(--neutral-alpha-weak)",
                  opacity: 1 - i * 0.08,
                }}
              />
            ))}
          </Column>
        </Column>
      </Flex>
    </Row>
  );
}
