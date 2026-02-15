import { baseURL, person } from "@/resources";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  Meta,
  Row,
  Schema,
  Tag,
  Text
} from "@once-ui-system/core";
// import TableOfContents from "@/components/about/TableOfContents"; // Commenting out TOC for now as structure changes
import styles from "@/components/about/about.module.scss";
import { RichText } from "@/components/RichText";
import { getAbout, getImageUrl, getTenantBySlug } from "@/utils/payload";

export async function generateMetadata() {
  const tenant = await getTenantBySlug('aayurt');
  const title = `About – ${tenant?.name || person.name}`;
  const description = `Meet ${tenant?.name || person.name}`;

  return Meta.generate({
    title,
    description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: "/about",
  });
}

export default async function About() {
  const aboutData = await getAbout();
  // Fetch tenant data directly from /tenants API
  const tenant = await getTenantBySlug('aayurt');

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={`About – ${tenant?.name || person.name}`}
        description={`Meet ${tenant?.name || person.name}`}
        path={"/about"}
        image={`/api/og/generate?title=${encodeURIComponent(`About – ${tenant?.name || person.name}`)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* TableOfContents commented out for migration simplicity */}
      {/* 
      <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column> 
      */}

      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        <Column
          className={styles.avatar}
          top="64"
          fitHeight
          position="sticky"
          s={{
            position: "relative"
            , style: { top: "auto" }
          }}
          xs={{ style: { top: "auto" } }}
          minWidth="160"
          paddingX="l"
          paddingBottom="xl"
          gap="m"
          flex={3}
          horizontal="center"
        >
          {/* Use tenant avatar if available, else static person avatar */}
          <Avatar src={getImageUrl(tenant?.avatar) || person.avatar} size="xl" />
          <Row gap="8" vertical="center">
            <Icon onBackground="accent-weak" name="globe" />
            {tenant?.location || person.location}
          </Row>
          {/* Languages from tenant or static */}
          {(tenant?.languages?.length || 0) > 0 && (
            <Row wrap gap="8">
              {tenant?.languages?.map((lang, index) => (
                <Tag key={index} size="l">
                  {lang.language}
                </Tag>
              ))}
            </Row>
          )}
        </Column>

        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id="intro"
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {tenant?.name || person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {tenant?.intro?.intro || ''}
            </Text>
            {tenant?.intro?.introDescription && (
              <Text
                className={styles.textAlign}
                variant="body-default-m"
                onBackground="neutral-weak"
                marginTop="s"
              >
                {tenant?.intro?.introDescription}
              </Text>
            )}

            {/* Social links from API if available? using static social for now as API response for tenant bad social data */}
            {tenant?.socialMedia && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {tenant?.socialMedia.facebook && (
                  <Button
                    key="facebook"
                    href={tenant?.socialMedia.facebook}
                    prefixIcon="facebook"
                    label="Facebook"
                    size="s"
                    weight="default"
                    variant="secondary"
                  />
                )}
                {tenant?.socialMedia.twitter && (
                  <Button
                    key="twitter"
                    href={tenant?.socialMedia.twitter}
                    prefixIcon="twitter"
                    label="Twitter"
                    size="s"
                    weight="default"
                    variant="secondary"
                  />
                )}
                {tenant?.socialMedia.instagram && (
                  <Button
                    key="instagram"
                    href={tenant?.socialMedia.instagram}
                    prefixIcon="instagram"
                    label="Instagram"
                    size="s"
                    weight="default"
                    variant="secondary"
                  />
                )}
                {tenant?.socialMedia.linkedin && (
                  <Button
                    key="linkedin"
                    href={tenant?.socialMedia.linkedin}
                    prefixIcon="linkedin"
                    label="LinkedIn"
                    size="s"
                    weight="default"
                    variant="secondary"
                  />
                )}
                {tenant?.socialMedia.github && (
                  <Button
                    key="github"
                    href={tenant?.socialMedia.github}
                    prefixIcon="github"
                    label="GitHub"
                    size="s"
                    weight="default"
                    variant="secondary"
                  />
                )}
                {/* {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <React.Fragment key={item.name}>
                          <Row s={{ hide: true }}>
                            <Button
                              key={item.name}
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>
                          <Row hide s={{ hide: false }}>
                            <IconButton
                              size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                        </React.Fragment>
                      ),
                  )} */}
              </Row>
            )}
          </Column>

          {aboutData.intro && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="m">
              <RichText content={aboutData.intro} />
            </Column>
          )}

          {aboutData.skills && aboutData.skills.length > 0 && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="l">
              <Row wrap gap="8">
                {aboutData.skills.map((skillItem, index) => (
                  <Tag key={index} size="l" variant="secondary">
                    {skillItem.skill}
                  </Tag>
                ))}
              </Row>
            </Column>
          )}

          {aboutData.workExperience && aboutData.workExperience.length > 0 && (
            <>
              <Heading as="h2" id="work" variant="display-strong-s" marginBottom="m">
                Work Experience
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {aboutData.workExperience.map((experience, index) => (
                  <Column key={`${experience.company}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.period}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Text variant="body-default-m">
                      {experience.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {aboutData.education && aboutData.education.length > 0 && (
            <>
              <Heading as="h2" id="studies" variant="display-strong-s" marginBottom="m">
                Studies
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {aboutData.education.map((institution, index) => (
                  <Column key={`${institution.institution}-${index}`} fillWidth gap="4">
                    <Text variant="heading-strong-l">
                      {institution.institution}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.degree}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}