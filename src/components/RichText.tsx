import React, { Fragment } from "react";
import {
    Heading,
    Text,
    SmartLink,
    List,
    ListItem,
    InlineCode,
} from "@once-ui-system/core";
import { slugify } from "transliteration";

// Types based on Payload's Lexical structure (simplified)
type Node = {
    type: string;
    children?: Node[];
    text?: string;
    tag?: string; // for headings h1-h6
    url?: string; // for links
    fields?: any; // for custom blocks
    format?: number | string; // Payload uses string for alignment on blocks, Lexical uses number for text format
    [key: string]: any;
};

type RichTextProps = {
    content: {
        root: any; // Use any to bypass strict check against Payload's specific generated structure, as we just need it to be a Node-like tree
    } | null | undefined;
};

export const RichText: React.FC<RichTextProps> = ({ content }) => {
    if (!content || !content.root || !content.root.children) {
        return null;
    }

    return <>{content.root.children.map((node: Node, i: number) => <NodeRenderer key={i} node={node} />)}</>;
};

const NodeRenderer: React.FC<{ node: Node }> = ({ node }) => {
    if (node.type === "text") {
        let text = <>{node.text}</>;

        // Handle formatting (bold, italic, etc.) based on bitmask if needed
        // Simplified: check simple properties if present or assume clean text for now
        // In Lexical, format is a bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code
        // In Lexical, format is a bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code
        if (typeof node.format === 'number') {
            const format = node.format as number;
            if (format & 1) text = <strong>{text}</strong>;
            if (format & 2) text = <em>{text}</em>;
            if (format & 8) text = <u>{text}</u>;
            if (format & 16) text = <InlineCode>{text}</InlineCode>;
        }

        return text;
    }

    if (!node) return null;

    switch (node.type) {
        case "paragraph":
            return (
                <Text
                    style={{ lineHeight: "175%" }}
                    variant="body-default-m"
                    onBackground="neutral-medium"
                    marginTop="8"
                    marginBottom="12"
                    as="p"
                >
                    {node.children?.map((child, i) => <NodeRenderer key={i} node={child} />)}
                </Text>
            );

        case "heading":
            const Tag = node.tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
            const slug = slugify(
                node.children?.map((c) => c.text).join(" ") || ""
            );
            return (
                <Heading
                    marginTop="24"
                    marginBottom="12"
                    as={Tag}
                    id={slug}
                // Map heading levels to variants if needed, or rely on default
                >
                    {node.children?.map((child, i) => <NodeRenderer key={i} node={child} />)}
                </Heading>
            );

        case "list":
            return (
                <List as={node.tag === "ol" ? "ol" : "ul"}>
                    {node.children?.map((child, i) => <NodeRenderer key={i} node={child} />)}
                </List>
            );

        case "listitem":
            return (
                <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
                    {node.children?.map((child, i) => <NodeRenderer key={i} node={child} />)}
                </ListItem>
            );

        case "link":
            return (
                <SmartLink href={node.url || "#"}>
                    {node.children?.map((child, i) => <NodeRenderer key={i} node={child} />)}
                </SmartLink>
            );

        default:
            console.warn("Unknown node type:", node.type);
            return (
                <Fragment>
                    {node.children?.map((child, i) => <NodeRenderer key={i} node={child} />)}
                </Fragment>
            );
    }
};
