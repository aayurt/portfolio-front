import { getTenantBySlug } from "@/utils/payload";
import { IconButton, Row, SmartLink, Text } from "@once-ui-system/core";
import styles from "./Footer.module.scss";

export const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const tenant = await getTenantBySlug();

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
          {
            tenant?.socialMedia?.facebook && (
              <IconButton
                href={tenant.socialMedia.facebook}
                icon="facebook"
                tooltip="Facebook"
                size="s"
                variant="ghost"
              />
            )
          }
          {
            tenant?.socialMedia?.instagram && (
              <IconButton
                href={tenant.socialMedia.instagram}
                icon="instagram"
                tooltip="Instagram"
                size="s"
                variant="ghost"
              />
            )
          }
          {
            tenant?.socialMedia?.twitter && (
              <IconButton
                href={tenant.socialMedia.twitter}
                icon="twitter"
                tooltip="Twitter"
                size="s"
                variant="ghost"
              />
            )
          }
          {
            tenant?.socialMedia?.linkedin && (
              <IconButton
                href={tenant.socialMedia.linkedin}
                icon="linkedin"
                tooltip="LinkedIn"
                size="s"
                variant="ghost"
              />
            )
          }
          {
            tenant?.socialMedia?.github && (
              <IconButton
                href={tenant.socialMedia.github}
                icon="github"
                tooltip="GitHub"
                size="s"
                variant="ghost"
              />
            )
          }
          {/* {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )} */}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
