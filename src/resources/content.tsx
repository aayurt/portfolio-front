import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Aayurt",
  lastName: "Shrestha",
  name: `Aayurt Shrestha`,
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "aayurtshrestha@gmail.com",
  location: "Asia/Kathmandu",
  languages: ["English", "Nepali"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/aayurt",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/aayurt-shrestha/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/aayurts/",
    essential: false,
  },
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/@once_ui",
  //   essential: true,
  // },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/preview.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
      }}>
        <img
          src={"/images/og/preview.png"}
          style={{
            width: "12rem",
            height: "12rem",
            objectFit: "cover",
            borderRadius: "100%",
            animation: "upDown 3s ease-in-out infinite",
          }}
        />
      </div>
      <Text>I build things that matter</Text>
    </div>
  </>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      Full-Stack Engineer & Product Builder. I specialize in crafting seamless user experiences and robust architectures. Currently freelancing and developing independent projects.
    </>
  ),
};

const about: About = {
  path: "/",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Full-stack software engineer with a curious mindset and a passion for building thoughtful, high-quality products. I combine technical depth with an entrepreneurial approach — taking ownership, driving initiatives forward, and delivering real, measurable results. Known for my energy, adaptability, and bias toward action, I focus on creating meaningful impact rather than just shipping features.
      </>
    ),
  },
  skills: {
    display: true,
    title: "Skills",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Flutter", "Python", "AWS", "Docker", "Git", "Figma", "Tailwind CSS", "Shadcn UI", "Once UI", "Payload CMS", "Others..."]
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Pageup People",
        timeframe: "Oct 2023 - Jun 2025",
        role: "Software Engineer",
        achievements: [
          <>
            Led architecture and delivery of scalable features within a multi-tenant recruitment
            marketing platform.
          </>,
          <>
            Built a real-time, Slack-style chat system supporting thousands of concurrent users
            during live events.
          </>,
          <>
            Designed batch and streaming pipelines powering workflows, automation, and search
            infrastructure.
          </>,
          <>
            Integrated AI/LLM-powered features to enhance personalisation and user experience.
          </>,
          <>
            Led frontend modernisation using Next.js, improving performance, SEO, and accessibility
            compliance.
          </>,
          <>
            Delivered secure public APIs enabling third-party integrations and faster onboarding.
          </>,
          <>
            Mentored engineers and improved team standards, testing, and processes.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Once UI Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        company: "MobileKraft",
        timeframe: "Sep 2022 - Jul 2023",
        role: "Software Engineer",
        achievements: [
          <>
            Designed and developed bespoke full-stack web and Flutter mobile applications supporting
            bookings, asset tracking, and operational workflows.
          </>,
          <>
            Owned features end-to-end from requirements through deployment, working directly with
            stakeholders.
          </>,
          <>
            Built a visual API query editor enabling dynamic, schema-driven queries without
            engineering support.
          </>,
          <>
            Implemented Redis caching and backend optimisations to improve performance and reduce
            response times.
          </>,
          <>
            Contributed to system architecture, API design, and shared service foundations used
            across products.
          </>,
          <>
            Supported releases, bug fixes, and production monitoring to ensure reliability.
          </>,
        ],
        images: [],
      },
      {
        company: "Himalayan Techies",
        timeframe: "Dec 2019 - Jul 2022",
        role: "Software Engineer",
        achievements: [
          <>
            Delivered full-stack features across multiple government and client applications from UI
            design to backend and database implementation.
          </>,
          <>
            Built offline-first and low-bandwidth solutions for rural environments with limited
            internet connectivity.
          </>,
          <>
            Developed transaction tracking, reporting, and admin tools for cooperative market
            management systems.
          </>,
          <>
            Translated wireframes into responsive, accessible frontend interfaces.
          </>,
          <>
            Mentored junior developers and improved documentation and team knowledge sharing.
          </>,
          <>
            Managed deployments and Apache server configuration across company domains.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Kingston University | London",
        description: <>Studied masters in Software engineering with management studies.</>,
      },
      {
        name: "Patan Campus | Lalitpur, Nepal",
        description: <>Studied bachelors in Computer Science and Information Technology.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Frontend Engineering",
        description: (
          <>Building modern, performant, and accessible UIs with React ecosystems and rich editing experiences.</>
        ),
        tags: [
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript", icon: "typescript" },
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Flutter", icon: "flutter" },
          { name: "Lexical", icon: "lexical" },
        ],
        images: [],
      },

      {
        title: "Backend & APIs",
        description: (
          <>Designing scalable APIs, modular services, and multi-tenant systems with clean architecture.</>
        ),
        tags: [
          { name: "Node.js", icon: "nodejs" },
          { name: "Knex.js", icon: "knex" },
          { name: "Supabase", icon: "supabase" },
          { name: "Payload CMS", icon: "payload" },
          { name: "CakePHP", icon: "cakephp" },
          { name: "Laravel", icon: "laravel" },
        ],
        images: [],
      },

      {
        title: "Authentication & Security",
        description: (
          <>Implementing secure login systems including SSO, OAuth, OTP flows, MFA, and role-based access control.</>
        ),
        tags: [
          { name: "NextAuth", icon: "auth" },
          { name: "OAuth / SSO", icon: "oauth" },
          { name: "OTP", icon: "security" },
          { name: "MFA", icon: "shield" },
          { name: "RBAC", icon: "lock" },
        ],
        images: [],
      },

      {
        title: "Realtime & Collaboration",
        description: (
          <>Building live chat, presence tracking, and event-driven features for collaborative experiences.</>
        ),
        tags: [
          { name: "Ably", icon: "ably" },
          { name: "WebSockets", icon: "websocket" },
          { name: "Realtime Events", icon: "realtime" },
        ],
        images: [],
      },

      {
        title: "DevOps & Tooling",
        description: (
          <>Shipping reliable software with containerization, testing, and modern developer workflows.</>
        ),
        tags: [
          { name: "Docker", icon: "docker" },
          { name: "Git", icon: "git" },
          { name: "Testing", icon: "testing" },
          { name: "CI/CD", icon: "pipeline" },
        ],
        images: [],
      },
      {
        title: "Automation & AI Integration",
        description: (
          <>Designing intelligent workflows and AI-powered features using automation tools, LLMs, and third-party integrations to streamline processes and enhance user experiences.</>
        ),
        tags: [
          { name: "n8n", icon: "n8n" },
          { name: "AI Integration", icon: "ai" },
          { name: "OpenAI API", icon: "openai" },
          { name: "Workflow Automation", icon: "workflow" },
          { name: "Webhooks", icon: "webhook" },
          { name: "REST APIs", icon: "api" },
        ],
        images: [],
      },
    ],
  },
  certifications: {
    display: true,
    title: "Certifications",
    certificates: [
      {
        name: "Advanced Node.js",
        description: "Node.js - August 2023",
        link: "https://www.linkedin.com/learning/certificates/bc85364e0c38f81ccfaa9ee76a68311ebbf8bdf58471cee04bd8fb44d78746a2",
      },
      {
        name: "Learning Kubernetes",
        description: "Kubernetes - August 2023",
        link: "https://www.linkedin.com/learning/certificates/0bc67f085bf5151d312f667753c38b4c9b4bd26b9961f73397ece96dd27d9c38",
      },
      {
        name: "React: State Management (2019)",
        description: "React.js - August 2023",
        link: "https://www.linkedin.com/learning/certificates/110ac08de7cdafdde6936102c9861310418f7cd1e7fe4f4a2f80a35e9978c4a7",
      },
      {
        name: "Scrum Master",
        description: "Scrum - April 2023",
        link: "https://www.linkedin.com/learning/certificates/daf19887512f51407198676a3acf904b808cfae531e7ecb56e17333b2fedab24",
      },
      {
        name: "Flutter Essential Training: Build for multiple platforms",
        description: "Flutter - April 2023",
        link: "https://www.linkedin.com/learning/certificates/a81a948904a550793e91e8cb085a1347fd13b84a1806e2e541db9f302f053a3d",
      },
      {
        name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 1 Cloud Concepts",
        description: "Azure - April 2023",
        link: "https://www.linkedin.com/learning/certificates/21cd5ed5d8ac38cff4b2309534140d7ce68d20a7314e8207d7c8c068722c3dea",
      },
      {
        name: "React.js Essential Training",
        description: "Azure - April 2023",
        link: "https://www.linkedin.com/learning/certificates/2618122c08b2a7b60ad236320629957f705bc1de1956079340a693d0da195b59",
      },
      {
        name: "Advanced GitHub Actions",
        description: "GitHub - March 2023",
        link: "https://www.linkedin.com/learning/certificates/0ca07b53c506e26c1052b5e3553b7f316f9bfa182b4e37e9f48a8c662043f34b",
      },
      {
        name: "TypeScript for Node.js Developers",
        description: "Node.js - March 2023",
        link: "https://www.linkedin.com/learning/certificates/84ddb30c96820194f7d2730a2c7c52090bf6ab33c90fe63a282bf07d3a65703a",
      },
    ]
  },

};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};



export { about, blog, home, newsletter, person, social, work };

