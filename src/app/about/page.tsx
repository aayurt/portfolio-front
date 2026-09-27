import React from "react";
import Link from "next/link";
import { baseURL, person, research } from "@/resources";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  Meta,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";
import styles from "@/components/about/about.module.scss";
import { getAbout, getImageUrl, getTenantBySlug } from "@/utils/payload";

export async function generateMetadata() {
  const tenant = await getTenantBySlug();
  const title = `About – ${tenant?.name || person.name}`;
  const description = `Full-Stack Software Architect & Systems Engineer. Specializing in autonomous multi-agent pipelines, offline-first architectures, and high-throughput web systems.`;

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
  const tenant = await getTenantBySlug();
  const cvUrl = tenant?.cv ? getImageUrl(tenant.cv) : (person.resume || "mailto:aayurtshrestha@gmail.com?subject=CV%20Request");

  const name = tenant?.name || person.name;
  const avatarUrl = getImageUrl(tenant?.avatar) || person.avatar;

  return (
    <Column fillWidth maxWidth="l" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={`About – ${name}`}
        description={`Meet ${name} — Full-Stack Software Architect & Systems Engineer`}
        path={"/about"}
        image={`/api/og/generate?title=${encodeURIComponent(`About – ${name}`)}`}
        author={{
          name: name,
          url: `${baseURL}/about`,
          image: avatarUrl,
        }}
      />

      <div className={styles.container}>
        {/* LEFT STICKY SIDEBAR */}
        <aside className={styles.sidebar}>
          {/* Identity & Profile Card */}
          <div className={styles.profileCard}>
            <Avatar
              src={avatarUrl}
              size="xl"
              style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            />

            <Column fillWidth gap="4" horizontal="center">
              <Heading as="h2" variant="heading-strong-l">
                {name}
              </Heading>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Full-Stack & Systems Engineer
              </Text>
            </Column>

            <div className={styles.statusPill}>
              <span className={styles.statusDot}></span>
              <span>Open to Staff & PhD Roles</span>
            </div>

            <div className={styles.sidebarActions}>
              <Button
                href={cvUrl}
                target={cvUrl.startsWith("http") || cvUrl.endsWith(".pdf") ? "_blank" : undefined}
                variant="primary"
                prefixIcon="document"
                label="Download CV (PDF)"
                size="m"
                fillWidth
              />
              <Button
                href="mailto:aayurtshrestha@gmail.com"
                variant="secondary"
                prefixIcon="arrowRight"
                label="Get in Touch"
                size="m"
                fillWidth
              />
            </div>

            <div className={styles.sidebarMetaList}>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Location</span>
                <span className={styles.metaVal}>Kathmandu, Nepal</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Timezone</span>
                <span className={styles.metaVal}>UTC+5:45 (Asia/KTM)</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Experience</span>
                <span className={styles.metaVal}>6+ Years</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Languages</span>
                <span className={styles.metaVal}>English, Nepali, Newar</span>
              </div>
            </div>

            {/* Social Links Row */}
            <Row gap="8" wrap horizontal="center" fillWidth paddingTop="8">
              {tenant?.socialMedia?.linkedin && (
                <Button
                  href={tenant.socialMedia.linkedin}
                  target="_blank"
                  prefixIcon="linkedin"
                  size="s"
                  variant="tertiary"
                />
              )}
              {tenant?.socialMedia?.github && (
                <Button
                  href={tenant.socialMedia.github}
                  target="_blank"
                  prefixIcon="github"
                  size="s"
                  variant="tertiary"
                />
              )}
              {tenant?.socialMedia?.instagram && (
                <Button
                  href={tenant.socialMedia.instagram}
                  target="_blank"
                  prefixIcon="instagram"
                  size="s"
                  variant="tertiary"
                />
              )}
            </Row>
          </div>

          {/* Sticky Table of Contents Card */}
          <nav className={styles.tocCard}>
            <span className={styles.tocTitle}>Page Navigation</span>
            <a href="#overview" className={styles.tocLink}>
              <Text variant="label-default-s">01. Overview & Philosophy</Text>
            </a>
            <a href="#competencies" className={styles.tocLink}>
              <Text variant="label-default-s">02. Systems Competencies</Text>
            </a>
            <a href="#experience" className={styles.tocLink}>
              <Text variant="label-default-s">03. Work Experience</Text>
            </a>
            <a href="#education" className={styles.tocLink}>
              <Text variant="label-default-s">04. Academic Degrees</Text>
            </a>
            <a href="#research" className={styles.tocLink}>
              <Text variant="label-default-s">05. Doctoral Agenda</Text>
            </a>
          </nav>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <main className={styles.mainContent}>
          {/* 01. Overview */}
          <Column id="overview" fillWidth gap="m">
            <Heading as="h1" variant="display-strong-m">
              Architecting autonomous AI engines, offline-first systems, and scalable full-stack products.
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: "1.65" }}>
              I am a software engineer and systems builder with technical depth in distributed architectures, multi-agent code execution, and high-performance web systems. Over the past 6+ years, I have architected and shipped multi-tenant cloud platforms, offline-resilient civic software for Newar communities in Lalitpur, automated quantitative financial ingestion daemons, and autonomous multi-agent developer CLI harnesses.
            </Text>
            <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: "1.65" }}>
              My work bridges empirical engineering with academic rigor — pairing deterministic evaluation gates, AST static analysis, and isolated Docker runtimes to enforce boundary safety on generative AI and distributed systems.
            </Text>
          </Column>

          {/* 02. Systems Competencies */}
          <Column id="competencies" fillWidth gap="s">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Technical Architecture</span>
              <Heading as="h2" variant="heading-strong-xl">
                Systems Competencies
              </Heading>
            </div>

            <div className={styles.skillsQuad}>
              {/* Pillar 1: AI & Agents */}
              <div className={styles.skillCard}>
                <div className={styles.skillCardHeader}>
                  <span>01 / AI & AGENTS</span>
                  <span className={styles.skillSubBadge}>MLOps</span>
                </div>
                <div className={styles.skillPills}>
                  <span className={styles.skillPill}>Hermes Agent CLI</span>
                  <span className={styles.skillPill}>Ollama (Local LLM)</span>
                  <span className={styles.skillPill}>Gemini 1.5 API</span>
                  <span className={styles.skillPill}>AST Verification Gates</span>
                  <span className={styles.skillPill}>n8n Automation</span>
                  <span className={styles.skillPill}>MCP Protocol</span>
                </div>
              </div>

              {/* Pillar 2: Backend & Storage */}
              <div className={styles.skillCard}>
                <div className={styles.skillCardHeader}>
                  <span>02 / BACKEND & STORAGE</span>
                  <span className={styles.skillSubBadge}>Core Infra</span>
                </div>
                <div className={styles.skillPills}>
                  <span className={styles.skillPill}>Node.js 22</span>
                  <span className={styles.skillPill}>Python 3</span>
                  <span className={styles.skillPill}>PostgreSQL</span>
                  <span className={styles.skillPill}>Payload CMS 3.75</span>
                  <span className={styles.skillPill}>TimescaleDB</span>
                  <span className={styles.skillPill}>Redis Cache</span>
                </div>
              </div>

              {/* Pillar 3: Frontend & Mobile */}
              <div className={styles.skillCard}>
                <div className={styles.skillCardHeader}>
                  <span>03 / FRONTEND & MOBILE</span>
                  <span className={styles.skillSubBadge}>Client Apps</span>
                </div>
                <div className={styles.skillPills}>
                  <span className={styles.skillPill}>Next.js 15/16</span>
                  <span className={styles.skillPill}>React 19</span>
                  <span className={styles.skillPill}>TypeScript</span>
                  <span className={styles.skillPill}>Flutter 3 & Dart</span>
                  <span className={styles.skillPill}>IndexedDB Offline PWA</span>
                  <span className={styles.skillPill}>Once UI</span>
                </div>
              </div>

              {/* Pillar 4: DevOps & Systems */}
              <div className={styles.skillCard}>
                <div className={styles.skillCardHeader}>
                  <span>04 / DEVOPS & SYSTEMS</span>
                  <span className={styles.skillSubBadge}>Deployment</span>
                </div>
                <div className={styles.skillPills}>
                  <span className={styles.skillPill}>Docker Containers</span>
                  <span className={styles.skillPill}>Nginx Reverse Proxy</span>
                  <span className={styles.skillPill}>PM2 Process Cluster</span>
                  <span className={styles.skillPill}>Linux VPS Hosting</span>
                  <span className={styles.skillPill}>Git Hooks & CI/CD</span>
                  <span className={styles.skillPill}>AWS S3 Storage</span>
                </div>
              </div>
            </div>
          </Column>

          {/* 03. Work Experience */}
          <Column id="experience" fillWidth gap="s">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Production History</span>
              <Heading as="h2" variant="heading-strong-xl">
                Work Experience
              </Heading>
            </div>

            <div className={styles.timeline}>
              {/* Role 1: Pageup People */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineHeader}>
                  <h3 className={styles.timelineCompany}>Pageup People</h3>
                  <span className={styles.timelinePeriod}>Oct 2023 – Jun 2025</span>
                </div>
                <div className={styles.timelineRole}>
                  Software Engineer · Multi-Tenant Recruitment Platform
                </div>
                <p className={styles.timelineDesc}>
                  Led architecture and delivery of scalable enterprise features within a multi-tenant recruitment marketing platform serving international corporate clients.
                </p>
                <ul className={styles.timelineBullets}>
                  <li>
                    Architected real-time WebSocket chat infrastructure handling thousands of concurrent candidate interactions with instant deliverability guarantees.
                  </li>
                  <li>
                    Designed automated batch and streaming timeseries ETL pipelines and integrated LLM-powered candidate screening features.
                  </li>
                  <li>
                    Led frontend modernization using Next.js, reducing production bundle sizes by 38% and significantly improving Largest Contentful Paint (LCP).
                  </li>
                </ul>
              </div>

              {/* Role 2: MobileKraft */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineHeader}>
                  <h3 className={styles.timelineCompany}>MobileKraft</h3>
                  <span className={styles.timelinePeriod}>Sep 2022 – Jul 2023</span>
                </div>
                <div className={styles.timelineRole}>
                  Software Engineer · Mobile & Full-Stack Systems
                </div>
                <p className={styles.timelineDesc}>
                  Designed and developed bespoke full-stack web and Flutter mobile applications for commercial clients. Owned features end-to-end from specification to release.
                </p>
                <ul className={styles.timelineBullets}>
                  <li>
                    Engineered cross-platform mobile apps with offline SQLite caches, biometric login, and sub-second push notifications.
                  </li>
                  <li>
                    Built an interactive visual API query editor and implemented high-throughput Redis caching layers for mission-critical endpoints.
                  </li>
                </ul>
              </div>

              {/* Role 3: Himalayan Techies */}
              <div className={styles.timelineItem}>
                <div className={styles.timelineHeader}>
                  <h3 className={styles.timelineCompany}>Himalayan Techies</h3>
                  <span className={styles.timelinePeriod}>Dec 2019 – Jul 2022</span>
                </div>
                <div className={styles.timelineRole}>
                  Software Engineer · Public Sector & Municipal Systems
                </div>
                <p className={styles.timelineDesc}>
                  Delivered full-stack features across multiple municipal, government, and community applications operating under intermittent network connectivity.
                </p>
                <ul className={styles.timelineBullets}>
                  <li>
                    Pioneered offline-first PWA architecture with client-side synchronization and conflict resolution for field workers.
                  </li>
                  <li>
                    Developed financial transaction tracking tools and administrative auditing ledgers managing community civic records.
                  </li>
                </ul>
              </div>
            </div>
          </Column>

          {/* 04. Academic Degrees */}
          <Column id="education" fillWidth gap="s">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Academic Preparation</span>
              <Heading as="h2" variant="heading-strong-xl">
                Education & Studies
              </Heading>
            </div>

            <div className={styles.studiesGrid}>
              <div className={styles.studyCard}>
                <h3 className={styles.studyInst}>Kingston University | London</h3>
                <div className={styles.studyDegree}>
                  MSc in Software Engineering with Management Studies
                </div>
                <div className={styles.studyTime}>
                  Postgraduate Degree · London, United Kingdom
                </div>
                <Text variant="body-default-xs" onBackground="neutral-weak" style={{ marginTop: "6px" }}>
                  Focus on distributed system architecture, formal verification, enterprise governance, and scalable engineering management.
                </Text>
              </div>

              <div className={styles.studyCard}>
                <h3 className={styles.studyInst}>Patan Campus | Tribhuvan University</h3>
                <div className={styles.studyDegree}>
                  BSc in Computer Science and Information Technology (BSc CSIT)
                </div>
                <div className={styles.studyTime}>
                  Undergraduate Degree · Lalitpur, Nepal
                </div>
                <Text variant="body-default-xs" onBackground="neutral-weak" style={{ marginTop: "6px" }}>
                  Rigorous foundational studies in data structures, algorithms, operating systems, compiler design, and automata theory.
                </Text>
              </div>
            </div>
          </Column>

          {/* 05. Research Agenda & Publications */}
          <Column id="research" fillWidth gap="s">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Research & Doctoral Inquiries</span>
              <Heading as="h2" variant="heading-strong-xl">
                Doctoral Agenda & Publications
              </Heading>
            </div>

            <div className={styles.researchBox}>
              <Column fillWidth gap="8">
                <Row horizontal="between" vertical="center" fillWidth wrap gap="8">
                  <Heading as="h3" variant="heading-strong-l">
                    Autonomy in the Clinic: The Research Frontier of Agentic AI
                  </Heading>
                  <Tag variant="brand" size="s">
                    Flagship Working Paper
                  </Tag>
                </Row>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  Investigating closed-loop autonomous agent architectures, deterministic verification gates, AST static analysis, and multi-turn feedback loops to bound agent reasoning in safety-critical clinical and enterprise environments.
                </Text>
              </Column>

              <Row gap="8" wrap>
                <span className={styles.skillPill}>Deterministic Agent Gates</span>
                <span className={styles.skillPill}>AST Verification</span>
                <span className={styles.skillPill}>Offline State Machines</span>
                <span className={styles.skillPill}>Human-in-the-Loop</span>
                <span className={styles.skillPill}>Hermes Agent DAG</span>
              </Row>

              <Row horizontal="between" vertical="center" fillWidth wrap gap="8" style={{ borderTop: "1px dashed var(--neutral-border-weak)", paddingTop: "12px" }}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Author: Aayurt Shrestha · Working Monograph 2026
                </Text>
                <SmartLink
                  href="/blog/autonomy-in-the-clinic-the-research-frontier-of-agentic-ai"
                  suffixIcon="arrowRight"
                >
                  <Text variant="label-strong-m">Read Paper & Research Abstract</Text>
                </SmartLink>
              </Row>
            </div>
          </Column>
        </main>
      </div>
    </Column>
  );
}
