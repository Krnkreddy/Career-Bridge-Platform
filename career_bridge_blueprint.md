# Career Bridge Platform: End-to-End Blueprint

**Version:** 1.0.0
**Status:** Ready for Engineering
**Author:** Antigravity (Product Architect)

---

## 1. Product Definition & Strategy

### 1.1 Vision & Mission

*   **Vision:** To become the operating system for early-career development, seamlessly connecting academic potential with professional reality.
*   **Mission:** Democratize access to career opportunities by bridging the skills, network, and experience gap between students and employers.
*   **North Star Metric:** **"Weekly Active Career Progress (WACP)"** defined as number of students who applied to a job, attended a mentorship session, or completed a skill assessment in a week.

### 1.2 Value Propositions

| Stakeholder | Value Proposition |
| :--- | :--- |
| **Students** | Gain "work-ready" status through verified projects, direct access to recruiters (skipping ATS black holes), and peer benchmarking. |
| **Professionals** | Give back via micro-mentorship (low commitment, high impact) and build personal brand as industry leaders. |
| **Recruiters** | Access pre-vetted talent pipelines based on *verified skills* and *project portfolios*, not just GPA or university brand. |
| **Universities** | Real-time analytics on student employability and industry alignment; automated placement tracking. |

### 1.3 User Personas

#### 1. "Anxious Achiever" (Student)
*   **Profile:** Junior/Senior CS Undergrad, 3.5 GPA.
*   **Goal:** Land a Tier-1 internship/job.
*   **Pain Point:** "I apply to 100 places and hear nothing. I don't know what skills I'm actually missing."
*   **Success Metric:** Number of interview callbacks per month.

#### 2. "Time-Poor Expert" (Professional/Mentor)
*   **Profile:** Senior Engineer/PM, 5-8 years exp.
*   **Goal:** Mentor efficiently without unstructured drain on time.
*   **Pain Point:** "I want to help, but cold DMs on LinkedIn are overwhelming and often irrelevant."
*   **Success Metric:** Positive mentorship ratings; potential hires referred.

#### 3. "Volume-Buried Recruiter" (Recruiter)
*   **Profile:** Tech Recruiter at Growth Startup.
*   **Goal:** Fill 10 junior roles in 30 days.
*   **Pain Point:** "Resumes all look the same. I have no way to verify if they can actually code/deliver."
*   **Success Metric:** Time-to-fill (days); Candidate quality score (interview pass rate).

### 1.4 Core Features (MVP vs Phase-2)

| Feature Category | MVP (Launch - Month 0-3) | Phase-2 (Scale - Month 4-9) |
| :--- | :--- | :--- |
| **Identity** | Verified Student Profile (Email + Uni ID), Resume Parser, Portfolio Links | Video Introduction, Git/GitHub Code Analysis Integration |
| **Discovery** | Structured Job Board (Internships/Entry-level), Basic Filtering | AI-driven "Smart Match" based on skill gap analysis |
| **Networking** | "Async Mentorship" (Q&A Board), Direct Messaging (Double opt-in) | 1:1 Video Mentorship Booking, Calendar Integration |
| **Upskilling** | Curated Resource Links, Basic Skill Tags | Native Skill Assessment Quizzes, "Project Challenges" curated by companies |
| **Recruiting** | Employer Dashboard, Post Job, Viewer Applicants | ATS Integration (Greenhouse/Lever), Automated Screening Questions |
| **Events** | Simple Event Listing (Webinars) | Virtual Career Fair Hosting, Live Streaming |

### 1.5 Competitive Differentiation

1.  **Verification over Self-Proclamation:** Unlike LinkedIn, skills must be backed by a project link or peer/mentor endorsement.
2.  **Focus on "The Bridge":** We don't just list jobs; we provide the "bridge" activities (mentorship, specific skill acquisition) to get the job.
3.  **Closed Ecosystem Trust:** Verified university emails ensure community safety and high-signal interactions compared to open social networks.

### 1.6 Monetization Model

**Strategy:** Freemium for Students/Mentors; SaaS for Recruiters/Universities.

*   **Pricing Logic:** Lower barrier to entry for supply (students) to build liquidity; monetize demand (recruiters) and institutional value (universities).

| Tier | Audience | Price | Key Features |
| :--- | :--- | :--- | :--- |
| **Student Basic** | Students | Free | Job Search, Q&A, Profile Profile |
| **Student Pro** | Students | $9/mo | Priority Application Status, Unlimited DMs, Resume Review |
| **Recruiter Starter**| Recruiters | Free | 1 Active Job Post, Limited Search |
| **Recruiter Scale** | Recruiters | $199/mo | Unlimited Jobs, Advanced Filters, "Verified Talent" Access |
| **University Ent.** | Universities | Custom | Cohort Analytics, Placement Tracking Dashboard |

---

## 2. UX / UI Design System

### 2.1 Screen Inventory (Web + Mobile)

*   **Public:** Landing Page, About Us, Pricing, Success Stories.
*   **Auth:** Login, Signup (Role Picker), Email Verification, Forgot Password.
*   **Student App:**
    *   **Dashboard:** "Daily Drop" (Matches), Application Status Tracker, Upcoming Events.
    *   **Jobs:** Job Feed (Search/Filter), Job Detail, Application Modal.
    *   **Mentorship:** Mentor Directory, Q&A Feed, Message Individual.
    *   **Profile:** Edit Profile, Portfolio Upload, Resume View.
*   **Recruiter App:**
    *   **Dashboard:** Active Listings, Candidate Pipeline Summary.
    *   **Post Job:** Multi-step form (Details -> Skills -> Questions).
    *   **Candidates:** List View (Kanban), Candidate Profile Detail (Masked PII options).

### 2.2 Key User Flows

#### A. Student Onboarding
1.  **Signup:** Enter Email (@edu preferred) + Password.
2.  **Verify:** OTP to email.
3.  **Role Selection:** "Function" (Eng, Design, PM) + "Exp Level".
4.  **Profile Kickstart:** Upload Resume (Parser auto-fills education/skills).
5.  **Success:** Land on Dashboard with 3 recommended jobs.

#### B. Job Application (One-Click-ish)
1.  **Discovery:** Student views "Junior React Developer".
2.  **Review:** Checks "Skill Compatibility" score (Green/Yellow/Red).
3.  **Apply:** Clicks Apply -> Confirms Resume version -> Adds optional 140-char pitch.
4.  **Confirmation:** Application moves to "Applied" column in Tracker.

#### C. Recruiter Post & Shortlist
1.  **Create:** "Post New Job" -> Selects "Frontend Engineering".
2.  **Define:** Adds "Must Have: React, TypeScript" (Structured tags).
3.  **Publish:** Job goes live.
4.  **Review:** Notification of new applicant.
5.  **Action:** Views Profile -> Clicks "Shortlist" (Moves to Interview) or "Pass" (Sends polite automated delay email).

### 2.3 Design System & Principles

*   **Design Principle:** **"Clarity over Clutter."** Information density should be high for Recruiters (data tables) but low/focused for Students (feed cards).
*   **Vibe:** Professional, Trustworthy, yet Energetic (Optimistic).

#### Color Palette
*   **Primary:** `Brand Blue (#2563EB)` - Trust, Action (Buttons, Links).
*   **Secondary:** `Growth Teal (#0D9488)` - Success, Verification badges.
*   **Neutral:** `Slate (#0F172A)` - Text, Navbar; `Gray (#F1F5F9)` - Backgrounds.
*   **Alert:** `Rose (#E11D48)` - Errors, "Application Closed".
*   **Warning:** `Amber (#D97706)` - "Profile Incomplete", "Skill Gap".

#### Typography
*   **Font Family:** `Inter` (Google Fonts) - Clean, legible at small sizes, excellent numbers for data.
*   **Weights:**
    *   **Regular (400):** Body Copy.
    *   **Medium (500):** Interactive elements (Buttons, Tabs).
    *   **SemiBold (600):** Headings, Key metrics.
    *   **Bold (700):** Page Titles.

### 2.4 Component Library (Core)

| Component | Description | Usage |
| :--- | :--- | :--- |
| **Job Card** | Company Logo, Title, Salary Tag, Location, "Match Score". | Job Feeds, Search Results. |
| **Status Badge**| Pill-shaped, color-coded (`Applied`, `Interviewing`, `Rejected`). | Application Tracker. |
| **Skill Tag** | Text with background, clear 'x' to remove in edit mode. | Profile, Job Post. |
| **Feed Item** | Avatar, Timestamp, Content body, Action Row (Like/Reply). | Q&A, Community updates. |
| **Filter Sidebar**| Accordion-style checkboxes (Remote, Salary, Tech Stack). | Search pages. |
| **Rich Text Editor**| Markdown support, clean interface. | Job Descriptions, Bio. |

---

## 3. Technical Architecture

### 3.1 High-Level System Architecture

```ascii
      +-----------------+       +-----------------+
      |  Student Web    |       | Recruiter Web   |
      | (Next.js/React) |       | (Next.js/React) |
      +--------+--------+       +--------+--------+
               |                         |
               v                         v
      +-------------------------------------------+
      |             Load Balancer / CDN           |
      |          (Vercel Edge Network)            |
      +----------------------+--------------------+
                             |
                             v
                  +-----------------------+
                  |      API Gateway      |
                  |   (NestJS Monolith)   |
                  +-----------+-----------+
                              |
        +-------------+-------+-------+-------------+
        |             |               |             |
        v             v               v             v
 +------------+ +------------+ +-------------+ +-------------+
 |  Auth Svc  | |  Core Svc  | | Search Svc  | | Realtime Svc|
 |  (Clerk)   | | (Business) | |(MeiliSearch)| |(Socket.io)  |
 +------------+ +-----+------+ +-------------+ +------+------+
                      |               |               |
        +-------------+               |               |
        |             |               v               v
        v             v        +-------------+ +-------------+
 +------------+ +------------+ | Elastic /   | | Redis Cache |
 | PostgreSQL | |  S3 Bucket | | Meili Index | |  (PubSub)   |
 | (Primary)  | |  (Assets)  | +-------------+ +-------------+
 +------------+ +------------+
```

### 3.2 Core Data Flows

1.  **Authentication:**
    *   Client SDK (Clerk) -> Auth Provider -> JWT Token.
    *   Client -> API (Bearer Token) -> NestJS Guard (Validate JWT) -> User Context.
2.  **Job Search:**
    *   Recruiter Posts Job -> DB (Postgres) -> Event (JobCreated) -> Search Service -> Index (Meili).
    *   Student Search -> API -> MeiliSearch -> Return IDs -> Enrich from DB (if needed) -> Client.
3.  **Real-time Chat:**
    *   User A sends message -> API -> DB (Save) -> Redis Pub/Sub (Publish event).
    *   Socket Server subscribes to Redis -> Pushes to User B's socket connection.

### 3.3 Database Schema (Key Entities)

**Core Tables (PostgreSQL)**

| Table Name | Key Columns | Relationships |
| :--- | :--- | :--- |
| `users` | `id` (uuid), `clerk_id`, `email`, `role`, `created_at` | One-to-One with `profiles`. |
| `profiles` | `user_id` (PK), `full_name`, `bio`, `resume_url`, `skills` (jsonb), `experience` (jsonb) | Belongs to `users`. |
| `jobs` | `id` (uuid), `recruiter_id`, `company_name`, `title`, `description` (text), `location`, `salary_min`, `salary_max`, `status` | Belongs to `users` (as recruiter). |
| `applications`| `id`, `job_id`, `student_id`, `status` (enum), `applied_at` | Links `jobs` and `users`. |
| `skills` | `id`, `name`, `category` | Many-to-Many with `profiles` & `jobs`. |
| `conversations`| `id`, `created_at` | One-to-Many `messages`. |
| `conversation_participants` | `conversation_id`, `user_id` | Links users to chats. |

**Indexing Strategy:**
*   `jobs`: B-Tree on `recruiter_id`, `created_at`. GIN index on `title` (trigram) if Meilisearch fails, but generally rely on Meilisearch.
*   `applications`: Compound index on `(job_id, student_id)` to prevent duplicates.

### 3.4 API Endpoints (Versioned)

**Base URL:** `/api/v1`

*   **Auth:** `POST /auth/webhook` (Clerk sync).
*   **Jobs:**
    *   `GET /jobs` (Public/Student - Search).
    *   `POST /jobs` (Recruiter).
    *   `GET /jobs/:id` (Details).
*   **Applications:**
    *   `POST /jobs/:id/apply` (Student).
    *   `GET /applications` (Student - My Apps).
    *   `GET /jobs/:id/applications` (Recruiter - Candidates).
    *   `PATCH /applications/:id/status` (Recruiter - Move stage).
*   **Profile:**
    *   `GET /users/me`.
    *   `PUT /users/me/profile`.

### 3.5 Role-Based Access Control (RBAC)

*   **Implementation:** NestJS Guards + Decorators.
*   **Roles:** `STUDENT`, `RECRUITER`, `ADMIN`.
*   **Example:**
    ```typescript
    @Post(':id/apply')
    @Roles(Role.STUDENT)
    async apply(@Param('id') jobId: string, @User() user: UserEntity) { ... }
    ```

---

## 4. Engineering Execution Plan

### 4.1 Monorepo Structure (Turborepo)

```text
/
├── apps/
│   ├── web/             # Next.js (Student Platform)
│   ├── recruiter/       # Next.js (Recruiter Dashboard)
│   ├── mobile/          # React Native (Expo)
│   └── docs/            # Storybook / Docusaurus
├── packages/
│   ├── db/              # Prisma schema & client
│   ├── ui/              # Shared UI components (Tailwind)
│   ├── config/          # Shared ESLint/TSConfig
│   └── api-client/      # Type-safe Axios client (autogenerated)
├── services/
│   └── api/             # NestJS Backend Monolith
└── infra/
    └── terraform/       # AWS Infrastructure code
```

### 4.2 CI/CD Pipeline (GitHub Actions)

*   **Triggers:** Push to `main`, Pull Request.
*   **Workflow Steps:**
    1.  **Lint & Typecheck:** Parallel execution for all workspaces.
    2.  **Test:** Unit tests (Jest).
    3.  **Build:** Build Next.js apps and NestJS API.
    4.  **Deploy (Preview):** Vercel (Frontend), Railway/Render (Backend - ephemeral).
    5.  **Deploy (Prod):** On release tag.

### 4.3 Testing Strategy

*   **Unit Tests:** Jest for util functions, algorithm logic (Matching).
*   **Integration Tests:** Supertest for API endpoints (with Test DB).
*   **E2E Tests:** Playwright for critical flows (Signup, Apply, Post Job).

### 4.4 Infrastructure Plan

*   **Frontend:** Vercel (Zero-config globally distributed edge).
*   **Backend:** AWS ECS (Docker) or Railway (Simpler for MVP).
*   **Database:** Supabase or AWS RDS (Postgres).
*   **Storage:** AWS S3 (Resumes, Avatars).
*   **Search:** MeiliSearch Cloud (managed).

### 4.5 Milestone Execution Plan

| Milestone | Timeframe | Goals | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **M1: Foundation** | Wk 1-2 | Repo setup, Auth, DB Schema. | Working Auth, Profile CRUD, DB Live. |
| **M2: Discovery** | Wk 3-4 | Job Posting, Feed, Search. | Recruiter Post Job, Student Search. |
| **M3: Connection** | Wk 5-6 | Applications, Chat, Application Tracker. | Apply Flow, Real-time Msg, Notifications. |
| **M4: Polish & Launch**| Wk 7-8 | Responsive fixes, E2E tests, Production Env. | Load Testing, P1 Bug Fixes, Launch. |

---

## 5. Risk Assessment & AI Expansion

### 5.1 Technical & Business Risks

| Risk Area | Risk Description | Mitigation Strategy |
| :--- | :--- | :--- |
| **Marketplace Liquidity** | "Chicken & Egg": Recruiters won't join without students, and vice versa. | **Concierge MVP:** Manually scrape/curate jobs initially. Partner with 1-2 universities for student supply. |
| **Search Latency** | Complex matching queries slow down database. | **MeiliSearch:** Offload search to dedicated engine. Index denormalized data. |
| **Data Privacy** | Leaking student PII to unauthorized recruiters. | **Masking:** Default visibility is "Masked" until Recruiter requests full profile or Student applies. |
| **Real-time Scale** | Chat connections overwhelming server. | **Redis Adapter:** Socket.io with Redis Pub/Sub to scale horizontally across nodes. |

### 5.2 AI Roadmap (Post-MVP)

1.  **Resume Scoring (Week 12):**
    *   Use OpenAI API/LLM to extract keywords from Resume and compare against Job Description.
    *   Output: "Match Score" + "Missing Key Skills".
2.  **Smart Matching (Week 16):**
    *   Vector Embeddings for Job Descriptions and Student Profiles.
    *   Semantic Search: "Find me a frontend dev who knows animations" -> matches "React Motion" even if exact keyword differs.
3.  **AI Interview Prep (Week 20):**
    *   Generative mock interview questions based on the specific JD.

### 5.3 Ethics & Privacy
*   **Bias:** Regularly audit matching algorithms for gender/racial bias. Ensure training data (if any) is diverse.
*   **Consent:** Explicit opt-in for AI analysis of resumes.

---

## 6. Final Deliverables

### 6.1 One-Page Architecture Summary
*   **Frontend:** Next.js + React Native.
*   **Backend:** NestJS (REST + Socket.io).
*   **Database:** PostgreSQL + Redis.
*   **Search:** MeiliSearch.
*   **Infra:** Vercel + AWS/Railway.

### 6.2 Recruiter/Founder Execution Plan
*   **Lead Founder (CEO):**
    *   Secure 1st University Partner.
    *   Manually curry 50 High-Quality Job Openings (Concierge).
    *   Outreach to 20 potential mentors.
*   **Tech Lead (CTO):**
    *   Setup Monorepo & CI/CD (Day 1).
    *   Implement Auth & Profile Schema (Week 1).
    *   Ship MVP to Staging (Month 2).

### 6.3 MVP Launch Checklist
- [ ] Domain configured & SSL active.
- [ ] Transactional Emails verified (SendGrid/Resend).
- [ ] Database backups automated (Daily).
- [ ] Analytics installed (PostHog/Google Analytics).
- [ ] Legal Terms & Privacy Policy linked in footer.
- [ ] "Report User" mechanism functional (Trust & Safety).
- [ ] Load test performed (100 concurrent users).

**READY FOR LIFTOFF.** 🚀
