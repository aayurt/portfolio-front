import React, { Fragment, ReactNode } from "react";
import {
  CodeBlock,
  Heading,
  HeadingLink,
  InlineCode,
  Line,
  List,
  ListItem,
  Media,
  Row,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { slugify as transliterate } from "transliteration";
import { getImageUrl } from "@/utils/payload";

// Payload's Lexical rich text is a JSON tree. Node shapes below are intentionally
// loose (any) because Payload's generated types are verbose and we only need the
// fields we render.
type LexicalNode = {
  type: string;
  text?: string;
  children?: LexicalNode[];
  format?: number;
  style?: string;
  tag?: string;
  listType?: string;
  url?: string;
  newTab?: boolean;
  value?: unknown;
  relationTo?: string;
  fields?: Record<string, any>;
  [key: string]: any;
};

type RichTextProps = {
  content: {
    root: { children?: LexicalNode[] };
  } | null | undefined;
};

const formatBitmask = (format: number | undefined): { bold: boolean; italic: boolean; strike: boolean; underline: boolean; code: boolean } => {
  const f = typeof format === "number" ? format : 0;
  return {
    bold: (f & 1) !== 0,
    italic: (f & 2) !== 0,
    strike: (f & 4) !== 0,
    underline: (f & 8) !== 0,
    code: (f & 16) !== 0,
  };
};

const slugify = (text: string): string => {
  const strWithAnd = text.replace(/&/g, " and ");
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-",
  }).replace(/\-\-+/g, "-");
};

// Payload v3 stores some node payloads under `fields` (link url, block data).
// Read from `fields` first, then fall back to the node itself for older shapes.
const nodeField = (node: LexicalNode, key: string) =>
  node.fields?.[key] ?? node[key];

const renderChildren = (children: LexicalNode[] | undefined): ReactNode =>
  children?.map((child, i) => <NodeRenderer key={i} node={child} />);

const NodeRenderer: React.FC<{ node: LexicalNode }> = ({ node }) => {
  if (!node) return null;

  // ---- Text nodes ----------------------------------------------------------
  if (node.type === "text") {
    const text = node.text ?? "";
    if (!text) return null;

    const { bold, italic, strike, underline, code } = formatBitmask(node.format);

    let content: ReactNode = text;
    if (node.style === "superscript") content = <sup>{content}</sup>;
    if (node.style === "subscript") content = <sub>{content}</sub>;
    if (bold) content = <strong>{content}</strong>;
    if (italic) content = <em>{content}</em>;
    if (strike) content = <s>{content}</s>;
    if (underline) content = <u>{content}</u>;
    if (code) content = <InlineCode>{content}</InlineCode>;

    return <>{content}</>;
  }

  // ---- Line breaks ---------------------------------------------------------
  if (node.type === "linebreak") return <br />;

  // ---- Paragraphs ----------------------------------------------------------
  if (node.type === "paragraph") {
    return (
      <Text
        style={{ lineHeight: "175%" }}
        variant="body-default-m"
        onBackground="neutral-medium"
        marginTop="8"
        marginBottom="12"
        as="p"
      >
        {renderChildren(node.children)}
      </Text>
    );
  }

  // ---- Headings ------------------------------------------------------------
  if (node.type === "heading") {
    const tag = (node.tag || "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    const slug = slugify(node.children?.map((c) => c.text).join(" ") || "");
    return (
      <HeadingLink marginTop="24" marginBottom="12" as={tag} id={slug}>
        {renderChildren(node.children)}
      </HeadingLink>
    );
  }

  // ---- Lists ---------------------------------------------------------------
  if (node.type === "list") {
    const tag = node.tag === "ol" || node.listType === "number" ? "ol" : "ul";
    return <List as={tag}>{renderChildren(node.children)}</List>;
  }

  if (node.type === "listitem") {
    return (
      <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
        {renderChildren(node.children)}
      </ListItem>
    );
  }

  // ---- Links (explicit and auto-detected URLs) ------------------------------
  if (node.type === "link" || node.type === "autolink") {
    const href = nodeField(node, "url") || "#";
    const newTab = Boolean(nodeField(node, "newTab"));
    const children = renderChildren(node.children);

    if (href.startsWith("/")) {
      return <SmartLink href={href}>{children}</SmartLink>;
    }

    return (
      <a href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }

  // ---- Blockquote ----------------------------------------------------------
  if (node.type === "quote") {
    return (
      <Text
        as="blockquote"
        variant="body-default-l"
        style={{
          lineHeight: "175%",
          borderLeft: "3px solid currentColor",
          paddingLeft: "16px",
          opacity: 0.85,
        }}
        marginTop="16"
        marginBottom="16"
      >
        {renderChildren(node.children)}
      </Text>
    );
  }

  // ---- Code blocks ---------------------------------------------------------
  if (node.type === "code") {
    const code = node.children
      ?.map((c) => (c.type === "linebreak" ? "\n" : c.text || ""))
      .join("");
    if (!code) return null;

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[{ code, language: "text", label: "Code" }]}
        copyButton
      />
    );
  }

  // ---- Horizontal rule -----------------------------------------------------
  if (node.type === "horizontalrule") {
    return (
      <Row fillWidth horizontal="center" marginTop="24" marginBottom="24">
        <Line maxWidth="40" />
      </Row>
    );
  }

  // ---- Uploads (media) -----------------------------------------------------
  if (node.type === "upload") {
    const media = node.value as any;
    const src = getImageUrl(media);
    if (!src) return null;

    return (
      <Media
        marginTop="8"
        marginBottom="16"
        enlarge
        radius="m"
        border="neutral-alpha-medium"
        sizes="(max-width: 960px) 100vw, 960px"
        alt={media?.alt || ""}
        src={src}
      />
    );
  }

  // ---- Blocks (Banner, Code, MediaBlock) -----------------------------------
  if (node.type === "block") {
    const blockType = node.fields?.blockType;
    return <BlockRenderer blockType={blockType} fields={node.fields || {}} />;
  }

  // ---- Fallback: render children if present ---------------------------------
  if (node.children?.length) {
    return <>{renderChildren(node.children)}</>;
  }

  console.warn("Unknown rich text node type:", node.type);
  return null;
};

const BlockRenderer: React.FC<{ blockType: string; fields: Record<string, any> }> = ({ blockType, fields }) => {
  switch (blockType) {
    case "banner": {
      const style = fields.style || "info";
      const accent: Record<string, string> = {
        info: "#3b82f6",
        warning: "#f59e0b",
        error: "#ef4444",
        success: "#22c55e",
      };
      return (
        <div
          style={{
            borderLeft: `4px solid ${accent[style] || accent.info}`,
            background: "rgba(128, 128, 128, 0.08)",
            borderRadius: "8px",
            padding: "16px 20px",
            marginTop: "16px",
            marginBottom: "16px",
          }}
        >
          <RichText content={fields.content} />
        </div>
      );
    }

    case "code": {
      const language = fields.language || "typescript";
      return (
        <CodeBlock
          marginTop="8"
          marginBottom="16"
          codes={[
            {
              code: fields.code || "",
              language,
              label: language.charAt(0).toUpperCase() + language.slice(1),
            },
          ]}
          copyButton
        />
      );
    }

    case "mediaBlock": {
      const media = fields.media as any;
      const src = getImageUrl(media);
      if (!src) return null;

      return (
        <Media
          marginTop="8"
          marginBottom="16"
          enlarge
          radius="m"
          border="neutral-alpha-medium"
          sizes="(max-width: 960px) 100vw, 960px"
          alt={media?.alt || ""}
          src={src}
        />
      );
    }

    default:
      console.warn("Unknown rich text block type:", blockType);
      return null;
  }
};

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  return (
    <>
      {content.root.children.map((node, i) => (
        <NodeRenderer key={i} node={node} />
      ))}
    </>
  );

};
