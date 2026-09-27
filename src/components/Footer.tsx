import { IconButton, Row, SmartLink, Text } from "@once-ui-system/core";
import styles from "./Footer.module.scss";
import { Tenant } from "../../payload-types";
import { social } from "@/resources/content";

export const Footer = async ({ tenant }: { tenant: Tenant | null }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: "github",
      link: tenant?.socialMedia?.github || social.find((s) => s.name.toLowerCase() === "github")?.link,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: tenant?.socialMedia?.linkedin || social.find((s) => s.name.toLowerCase() === "linkedin")?.link,
    },
    {
      name: "Instagram",
      icon: "instagram",
      link: tenant?.socialMedia?.instagram || social.find((s) => s.name.toLowerCase() === "instagram")?.link,
    },
    {
      name: "Twitter / X",
      icon: "twitter",
      link: tenant?.socialMedia?.twitter || social.find((s) => s.name.toLowerCase() === "twitter" || s.name.toLowerCase() === "x")?.link,
    },
  ].filter((item): item is { name: string; icon: string; link: string } => Boolean(item.link));

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          // align: "center",
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{tenant?.name}</Text>
          <Text onBackground="neutral-weak">
            {/* Usage of this template requires attribution. Please don't remove the link to Once UI unless you have a Pro license. */}
            /
            <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
          </Text>
        </Text>
        <Row gap="16">
          {socialLinks.map((item) => (
            <IconButton
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              icon={item.icon}
              tooltip={item.name}
              size="s"
              variant="ghost"
            />
          ))}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
