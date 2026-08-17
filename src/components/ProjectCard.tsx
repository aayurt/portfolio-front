"use client";

import { getImageUrl } from "@/utils/payload";
import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content?: any;
  description: string;
  avatars: { src: string }[];
  link: string;
  techStack?: { tech?: string | null; id?: string | null }[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  techStack = [],
}) => {
  return (
    <Column fillWidth gap="m" className="rounded bg-red">
      <Carousel
        items={images.map((image) => ({
          slide: <div style={{
            maxHeight: "30rem",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            height: "100%",
            justifyContent: "center"
          }}>
            <img
              src={image}
              style={{
                maxHeight: "30rem",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
                height: "100%",
                justifyContent: "center"
              }}
            />
          </div>,
          alt: title,
        }))}
      />
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            {techStack.length > 0 && (
              <Flex gap="8" wrap>
                {techStack.map((t) => (
                  <Tag key={t.id} variant="tertiary">
                    <Text variant="label-strong-s" onBackground="neutral-weak">
                      {t.tech}
                    </Text>
                  </Tag>
                ))}
              </Flex>
            )}
            <Flex gap="24" wrap>
              {content && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
