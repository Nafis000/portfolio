# MASTER BUILD PROMPT — CINEMATIC ENGINEERING PORTFOLIO

## 1. Your role

Act as a world-class multidisciplinary team consisting of:

- A senior creative director specializing in award-winning digital experiences.
- A senior frontend architect specializing in Next.js, React, TypeScript and advanced animation.
- A Three.js / React Three Fiber creative developer.
- A senior backend engineer specializing in PostgreSQL, authentication and secure content management.
- A product designer specializing in typography, interaction design, responsive interfaces and accessibility.
- A DevOps engineer responsible for deployment, security, performance and production reliability.

Design and build a complete, production-ready personal engineering portfolio. Do not create a generic developer portfolio template. The result must feel like a bespoke digital experience that tells the story of an electrical engineering student progressing from mathematical theory to electronics, robotics, machine learning, real-world experience and creative exploration.

The experience should be visually ambitious, technically credible, responsive, accessible and maintainable.

Do not stop at a visual mockup. Implement the real application, persistent database, authenticated administration panel, functional content management workflows and deployment-ready architecture.

---

## 2. Creative vision

The central concept is:

**“From equations on paper to intelligent machines in the real world.”**

The portfolio represents different stages of an engineer's journey.

- Mathematics represents curiosity, theory and discovery.
- Education represents learning, experimentation and imperfect ideas.
- Projects represent prototypes, iteration and engineering problem-solving.
- Experience represents professional maturity, practical implementation and reliability.
- Activities represent people, communities, workshops, travel and personal growth.
- Certifications represent structured learning and demonstrated achievements.

Every section should have its own visual language while sharing the same underlying design system.

The overall visual direction should combine:

- Cinematic editorial design.
- Minimalist typography.
- Immersive but restrained 3D environments.
- Technical illustrations and engineering diagrams.
- Custom 2D pixel-art elements.
- Carefully choreographed motion.
- Generous negative space.
- Refined transitions between different visual worlds.

Avoid generic SaaS layouts, excessive gradients, repetitive glassmorphism, unnecessary glowing borders, generic AI-generated-looking dashboards, and walls of identical cards.

The website should feel handcrafted, intelligent, playful and technically sophisticated.

---

## 3. Technology stack

Use the following stack unless an actual technical incompatibility requires a documented alternative.

### Frontend

- Next.js with App Router.
- React and TypeScript in strict mode.
- Tailwind CSS.
- shadcn/ui for accessible foundational components.
- React Three Fiber and Drei for selected 3D scenes.
- Three.js for custom 3D objects and shaders where justified.
- GSAP and ScrollTrigger for complex scroll choreography.
- Motion for lightweight interface transitions.
- Lucide icons for conventional interface icons.

Use CSS, SVG or Canvas for simple illustrations rather than introducing WebGL unnecessarily.

### Backend and data

- Supabase PostgreSQL as the persistent database.
- Supabase Auth for administrator authentication.
- Supabase Storage for project images, certificates, thumbnails and other media.
- Supabase Row Level Security (RLS) for database authorization.
- Next.js Server Actions or Route Handlers for validated server-side mutations.
- Zod for server-side schema validation.
- React Hook Form for admin forms.

### Deployment and operations

- GitHub as the version-controlled source repository.
- Vercel for hosting and automatic deployments.
- Separate development, preview and production configurations.
- Environment variables managed through the deployment platform.
- Database migrations committed to the repository.
- Automated linting, type checking, tests and production builds in CI.

Pin compatible dependency versions and document the required runtime. Avoid deprecated APIs and unmaintained libraries.

---

## 4. Website information architecture

Create the following pages and navigation structure.

### A. Home — cinematic introduction

The homepage is the main storytelling experience.

Create a striking full-screen opening with:

- The owner's name, obtained from the provided CV.
- A professional portrait, if supplied.
- A concise engineering-focused introduction.
- A clear statement of engineering interests.
- A primary action to explore projects.
- A secondary action to view or download the CV.
- A subtle navigation system.
- A visually distinctive interactive 3D or illustrated hero environment.

The opening should feel like entering a carefully designed digital laboratory.

Use slow, deliberate camera movement, subtle parallax, atmospheric depth and refined typography. Keep the main introduction readable immediately.

Do not force visitors to wait through a long animation before accessing the content.

Below the hero, introduce a narrative journey through education, projects, experience, certifications and activities. Each transition should preview the visual identity of the next section.

Include selected projects, a short biography, relevant skills, notable activities and a final contact call to action.

The home page should provide clear links to every major section.

### B. Education — the engineer's notebook

Theme: mathematics, physics, handwritten notes and technical schematics.

Create a visual environment inspired by an engineer's notebook.

Use:

- Subtle notebook paper textures.
- Graph paper and coordinate grids.
- Hand-drawn vectors and axes.
- Mathematical annotations.
- Pencil-style physics illustrations.
- Sketched circuit diagrams.
- Matrix transformations.
- Calculus and differential equations.
- Kinematics and mechanics illustrations.
- Handwritten-style annotations paired with highly readable body typography.

Mathematical illustrations may include derivatives, integrals, vectors, matrices, coordinate systems, trajectories and circuit calculations.

Introduce equations as visual annotations that appear to have been drawn or written onto the page. Use SVG, Canvas or lightweight animation where appropriate.

The layout should suggest a collection of evolving notes, with imperfect alignments and scattered annotations, without sacrificing usability.

Display actual educational history using structured data: institution, qualification, field of study, dates, relevant coursework, achievements and optional descriptions.

Treat mathematical illustrations as explanatory visual elements, not as claims about the owner's academic achievements.

### C. Projects — the experimental laboratory

Theme: electronics, robotics, embedded systems and machine learning.

The projects section represents experimentation becoming more sophisticated.

Use a cleaner and more organized visual language than the Education section.

Visual elements may include:

- Arduino and ESP32 development boards.
- Raspberry Pi hardware.
- PCB traces and copper layers.
- Circuit schematics.
- Microcontrollers and electronic components.
- Robotic arms and articulated joints.
- Line-following robots.
- Servo mechanisms.
- Neural network diagrams.
- Computer vision detection boxes.
- Machine learning pipelines.
- Sensors, signal paths and data flows.
- Floating 3D prototypes.

Create individual project presentations that communicate the engineering process rather than simply displaying a picture and a title.

Each project should support structured fields for:

- Project title.
- Short description.
- Problem statement.
- Motivation and objectives.
- Technical approach.
- Hardware components.
- Software and frameworks.
- Architecture or system diagram.
- Images, videos and 3D media where available.
- Challenges and engineering trade-offs.
- Results and verified metrics.
- Lessons learned.
- Project status.
- Start and completion dates.
- Source repository URL.
- Live demo URL.
- Technical documentation URL.
- Featured status.
- Display order.

Project pages should have a polished editorial layout, with diagrams and images arranged around the explanation of the engineering process.

Allow unfinished projects to be marked as prototypes, experiments, in progress or completed. Never imply that a prototype is a finished production system.

### D. Experience — the engineering studio

Theme: professional maturity, applied engineering and industrial precision.

This section should feel more refined and structured than Projects.

Use:

- Clean technical grids.
- Precision-aligned layouts.
- Restrained motion.
- Professional typography.
- Sophisticated engineering diagrams.
- Computer vision overlays.
- Bounding boxes and object labels.
- Industrial interface motifs.
- Carefully placed technical annotations.

One visual concept is a 2D pixel-art dog being detected by a computer vision system. Place a detection box around the dog with a label such as `dog` and a confidence value only when it is generated by an actual detection or explicitly presented as illustrative.

Use a similar concept for the small companion cat described later.

Experience entries should support employer or organization, role, dates, employment type, location, responsibilities, achievements and associated technologies.

Display only verified experience. Do not fabricate employers, job titles, dates, responsibilities or performance metrics.

If formal employment history is limited, the content model should also support relevant technical, research, teaching and volunteer experience without misrepresenting these as paid employment.

### E. Activities — the floating journal

Theme: personal stories, community participation, workshops, volunteering, events and travel.

Create an immersive journal that feels like a collection of memories floating on a calm surface.

Use:

- Independently floating editorial cards.
- Organic vertical movement.
- Gentle water-like motion.
- Alternating left and right card placement.
- A zigzag narrative as visitors scroll.
- Photography and meaningful captions.
- Small date and location annotations.
- Subtle reveals and depth effects.
- Individual activity detail pages or expandable stories.

Each card should contain a title, date, short description, cover image and activity category.

An activity can optionally include a longer story, gallery, event organizer, location, external link and associated achievements.

Motion should remain subtle enough for users to read the content comfortably.

Make the cards keyboard accessible and ensure that their contents are available without requiring animation.

### F. Certifications — learning and achievement archive

Theme: a bridge between experimentation and professional development.

Create a structured certification archive with visually distinct categories, such as:

- Electronics and embedded systems.
- Robotics and automation.
- Programming and software development.
- Artificial intelligence and machine learning.
- Engineering tools and CAD.
- Professional development.
- Other verified learning achievements.

Each certification should support title, issuer, issue date, expiration date if applicable, credential identifier, credential URL, optional image or PDF, category and display order.

Use a combination of precise credential layouts and subtle technical illustrations.

Provide filtering and sorting, and distinguish verified credentials from informal learning or unfinished courses.

Never invent certifications, issuers or credential IDs.

### G. Skills — engineering capability map

Create a visually interesting but understandable skills section.

Organize skills into categories such as:

- Electrical engineering.
- Embedded systems.
- Robotics.
- PCB design and electronic schematics.
- Programming languages.
- Computer vision.
- Machine learning.
- Software engineering tools.
- Collaboration and communication.

Represent skills using compact technical labels, categorized clusters, interactive diagrams or restrained proficiency indicators.

Do not assign arbitrary numerical proficiency scores unless the owner explicitly provides them.

Allow technologies to be linked to relevant projects and experience entries.

### H. Contact

Create a refined contact section with:

- A concise invitation to collaborate.
- A validated contact form.
- Professional email and social links from verified data.
- GitHub and LinkedIn links where supplied.
- Appropriate success, loading and error states.
- Spam protection and server-side validation.

Never expose private administrator details or secret configuration in the public interface.

---

## 5. Persistent floating cat companion

Create a distinctive half-fluffy, grey cat that follows the visitor through the website.

The cat should feel like a small character in the portfolio, not a conventional chat widget.

### Default behavior

- Use a custom animated sprite or lightweight illustration.
- Give it subtle idle animations.
- Let it move smoothly between positions.
- Allow it to react to scroll position and section changes.
- Avoid covering headings, links, form fields or important content.
- Respect reduced-motion preferences.

### Education behavior

The cat becomes curious and explores the notebook.

It may walk along page edges, pause beside equations, investigate diagrams or sit near an illustration.

### Projects behavior

The cat transforms into a 2D pixel-art sprite.

When the relevant animation is active, display a computer vision-style bounding box around it with the label `lazy cat`.

The bounding box is a playful visual effect, not a claim that a real machine learning model is running.

Use crisp pixel rendering and a small set of expressive animations.

### Experience behavior

The cat becomes calmer and more polished.

Let it sit near experience cards and gently wave its tail. Keep the movement restrained and avoid blocking text.

### Activities behavior

The cat may interact with the floating journal by sitting near a card, peeking around an image or following the visual flow of the page.

### Technical requirements

Implement the cat as a reusable component with a clear state model.

Its state should respond to the current section, scroll position and viewport.

Use animation throttling, requestAnimationFrame only when needed, visibility-aware suspension and appropriate cleanup.

Do not run expensive animation loops continuously when the cat is off-screen or the page is inactive.

On mobile devices, reduce its size, movement and visual complexity. Provide an option to hide it.

The cat must never interfere with keyboard navigation, screen readers or essential interactions.

---

## 6. Design system and visual consistency

Create a documented design system containing:

- Primary and secondary color tokens.
- Semantic color tokens.
- Typography scales.
- Spacing and layout rules.
- Border radii and surface styles.
- Shadow and depth conventions.
- Motion durations and easing curves.
- Responsive breakpoints.
- Focus and interaction states.
- Illustration conventions.
- Component variants for each visual theme.

The sections should have distinct accents but share consistent navigation, typography principles, interaction behavior and component architecture.

Create a reusable theme configuration for Education, Projects, Experience, Activities, Certifications and the other sections.

Section themes must not become isolated websites. The transition between sections should feel intentional and coherent.

Prefer custom, carefully art-directed illustrations over large quantities of generic stock imagery.

Use original assets when available. Do not reproduce another portfolio's exact design or use copyrighted imagery without appropriate rights.

---

## 7. Motion and 3D direction

The visual quality should come from composition, lighting, depth, pacing and intentional movement rather than animation quantity.

### Motion principles

- Cinematic opening animation.
- Subtle scroll-linked transitions.
- Selective parallax.
- Smooth section transitions.
- Small interactive details.
- Carefully choreographed text reveals.
- Natural floating movement for selected objects.
- Meaningful state transitions for the cat.
- Responsive animations that adapt to available screen space.

Avoid excessive scroll hijacking, forced waiting, endless spinning objects, motion that competes with text and animation that causes layout shifts.

Use native scrolling.

### 3D principles

Use React Three Fiber for carefully selected elements such as:

- Floating electronic components.
- A robotic arm or mechanical assembly.
- A PCB with subtle depth.
- An abstract neural network.
- A technical hero environment.

Use optimized models, compressed textures, appropriate lighting and limited draw calls.

Lazy-load heavy 3D scenes. Provide a static or simplified fallback when WebGL is unavailable or performance is limited.

Do not render the entire portfolio as a 3D canvas.

---

## 8. Database architecture

Use Supabase PostgreSQL as the source of truth for all editable portfolio content.

Do not store production content exclusively in hardcoded component arrays, local storage or static JSON files.

Create normalized tables or appropriately structured relational models for:

- `profiles`
- `education`
- `experience`
- `projects`
- `project_media`
- `skills`
- `project_skills`
- `certifications`
- `activities`
- `activity_media`
- `social_links`
- `navigation_items`
- `site_settings`
- `media_assets`

Add supporting tables only when they solve a genuine requirement.

Use a consistent primary key strategy, foreign keys, timestamps, appropriate indexes, constraints and predictable ordering fields.

Each editable section should support:

- Creation.
- Reading.
- Updating.
- Deletion.
- Reordering.
- Publishing and unpublishing where appropriate.
- Draft and published states where useful.

Use `sort_order` or an equivalent ordering field so content can be rearranged without recreating records.

Use a reliable ordering update mechanism that prevents collisions or inconsistent ordering during reorganization.

Implement sensible deletion behavior. For example, prevent accidental removal of media still referenced by published content.

Store image files in Supabase Storage and store their metadata and storage paths in the database.

Do not store large image files or binary documents directly in ordinary database columns without a justified requirement.

### Public synchronization

The public website must retrieve its content from the database.

When an administrator saves or publishes changes:

1. Validate the submitted data.
2. Authenticate and authorize the administrator.
3. Persist the change transactionally where needed.
4. Refresh affected cached content.
5. Update the relevant public page.
6. Display an accurate success or error state.

Use targeted cache invalidation and appropriate Next.js revalidation mechanisms.

Use Supabase Realtime only where live updates provide meaningful value. Do not require every public visitor to maintain a permanent database connection.

Changes should appear promptly without requiring a new Git commit or redeployment.

The website should remain resilient if a database request fails. Use graceful loading, empty, error and retry states, and avoid exposing raw database errors.

---

## 9. Hidden administrator access and CMS

Create a discreet administrator entry point at the bottom of the homepage.

It should appear as a tiny green dot centered near the bottom edge.

On activation, reveal an elegant login interface with username or email and password fields.

The interaction may be subtle, but it must not be the only security mechanism.

Do not implement a hardcoded password, client-side password comparison, hidden JavaScript credentials or security based on an obscure URL.

### Authentication

Use Supabase Auth with a dedicated administrator account.

Prefer a password-based login with appropriate password policies and optional multi-factor authentication.

The hidden entry point is a design detail, not an authorization boundary.

All privileged database mutations, storage operations and server-side administrative actions must independently verify the authenticated user's authorization.

The administrator role must be established through trusted server-side configuration or protected database records. Never trust a role supplied by a browser request.

Do not expose Supabase service-role credentials, database passwords or private API keys in client-side bundles.

### Admin dashboard

After authentication, show a dedicated CMS dashboard.

Organize it into modules for:

- Overview.
- Profile and homepage.
- Education.
- Projects.
- Experience.
- Skills.
- Certifications.
- Activities.
- Media library.
- Navigation and section order.
- SEO and site settings.
- Account and security settings.

Every editable module should provide:

- A searchable and sortable list.
- Create and edit forms.
- Delete confirmation.
- Drag-and-drop or accessible controls for reordering.
- Draft and published states where relevant.
- Image upload and preview.
- Form validation.
- Save, cancel and unsaved-change handling.
- Loading, success and failure feedback.

Add a preview mode for unpublished content.

Use clear status labels and prevent accidental destructive actions.

Provide pagination or sensible list virtualization if content grows.

The admin dashboard should have its own layout, routes and authorization checks. It should not rely on the public homepage being hidden to remain secure.

Use an administrator-only route structure, but do not consider middleware or client-side route guards sufficient on their own.

---

## 10. Security requirements

Implement security as part of the architecture rather than adding it at the end.

### Database and access control

- Enable Row Level Security on every table exposed through the Supabase Data API.
- Allow public users to read only intentionally public and published content.
- Restrict content creation, updates, deletion and reordering to authorized administrators.
- Keep administrator-only tables private.
- Deny access by default and grant only the permissions required.
- Test unauthorized access using direct API requests, not only the user interface.
- Apply equivalent protection to Supabase Storage buckets and file operations.
- Never rely on the hidden green dot or obscure admin URLs for security.

### Authentication and sessions

- Use Supabase's supported authentication and session-management mechanisms.
- Protect server-side operations against unauthenticated and unauthorized requests.
- Implement safe logout and session-expiration behavior.
- Add login throttling or an appropriate rate-limiting solution.
- Consider MFA for the administrator.
- Do not log passwords, access tokens, session cookies or secrets.
- Avoid creating a custom authentication implementation when a maintained provider already solves the requirement.

### Input validation

- Validate all submitted data on the server.
- Validate URLs, text fields, identifiers, dates, file sizes and file types.
- Sanitize or safely render rich text.
- Prevent stored and reflected cross-site scripting.
- Avoid unsafe HTML injection.
- Use parameterized database operations and avoid dynamic SQL built from untrusted strings.
- Apply file upload limits and restrict uploads to allowed formats.
- Treat all browser-supplied data as untrusted.

### Web application protections

- Configure a suitable Content Security Policy.
- Use HTTPS in production.
- Apply appropriate security headers, including frame restrictions, MIME-sniffing protection and a suitable referrer policy.
- Use secure, HTTP-only cookies where custom cookies are necessary.
- Protect state-changing operations against CSRF where applicable to the chosen session architecture.
- Apply rate limiting to login, contact and other abuse-prone endpoints.
- Add bot protection to the public contact form if needed.
- Keep dependencies updated and scan for known vulnerabilities.
- Ensure production error messages do not reveal secrets or internal stack traces.
- Use separate secrets and credentials for development, preview and production.

Never place private secrets in `NEXT_PUBLIC_*` environment variables.

Use only public client configuration in the browser.

Do not claim that security controls are implemented until the corresponding configuration and tests exist.

---

## 11. Performance requirements

Treat performance as a core design constraint.

Optimize toward excellent Core Web Vitals and a strong Lighthouse score, aiming for approximately 90 or higher in Performance, Accessibility, Best Practices and SEO on representative production pages when feasible.

Do not sacrifice content accessibility or stability to achieve a numerical score.

Implement:

- Server rendering for important public content where appropriate.
- Static generation or caching for suitable public pages.
- Targeted revalidation after content changes.
- Dynamic imports for heavy visual components.
- Lazy loading for below-the-fold media and 3D scenes.
- Responsive image sizes and modern image formats.
- Explicit image dimensions to prevent layout shifts.
- Compressed and optimized 3D models and textures.
- Efficient animation loops and event listeners.
- Reduced motion and low-power fallbacks.
- Bundle analysis and removal of unnecessary dependencies.
- Appropriate font loading and font-display behavior.
- Sensible database queries and indexes.

Do not send administrator dashboard code or unnecessary privileged logic to public visitors.

Test on mobile devices, mid-range hardware and slower network connections.

Avoid autoplaying large videos or downloading every project's media during the initial page load.

---

## 12. Accessibility and responsive behavior

Target WCAG 2.2 AA where applicable.

Implement:

- Semantic HTML.
- Correct heading hierarchy.
- Keyboard-accessible navigation and interactions.
- Visible focus indicators.
- Accessible form labels and error messages.
- Appropriate color contrast.
- Screen-reader-friendly descriptions for meaningful images.
- Accessible dialogs and focus management.
- A skip-to-content link.
- Reduced-motion support.
- Keyboard-accessible content reordering in the admin panel.
- Accessible alternatives for animated and 3D content.

The website must work well on desktop, tablet and mobile.

On mobile, simplify complex 3D scenes, adapt the cat's behavior, reduce unnecessary motion and preserve the essential content.

Never hide critical information exclusively inside hover effects.

---

## 13. SEO and discoverability

Implement:

- Appropriate page titles and meta descriptions.
- Canonical URLs.
- Open Graph and social sharing metadata.
- Sitemap generation.
- Robots directives.
- A custom not-found page.
- Clean, stable URLs.
- Descriptive image alternative text.
- Structured data only when it accurately describes the content.
- Semantic project and profile pages.
- Correct handling of unpublished content.

Keep admin routes and private previews out of search indexes, while relying on real authentication and authorization rather than robots directives for security.

Use descriptive project slugs and ensure published pages can be indexed appropriately.

---

## 14. Contact form and integrations

Implement a working contact form with:

- Name.
- Email.
- Subject or category.
- Message.
- Consent or privacy information where applicable.
- Server-side validation.
- Rate limiting and spam prevention.
- Accessible feedback.
- A configured email delivery integration if credentials are provided.

Never pretend an email was sent if no email provider is configured.

Provide useful error handling when an integration is unavailable.

External profile links and downloadable CV files must be managed through the CMS where appropriate.

---

## 15. Testing and quality assurance

Create automated tests for important behavior.

### Unit tests

Test content validation, ordering utilities, reusable components and relevant business logic.

### Integration tests

Test database access policies, published versus unpublished content, administrative mutations and media authorization.

### End-to-end tests

Verify that:

1. A public visitor can navigate all published sections.
2. Project details display correctly.
3. Filters and sorting work.
4. The cat changes behavior across sections.
5. The administrator can log in and log out.
6. The administrator can create, edit and delete content.
7. Reordering persists after refreshing.
8. Uploaded media appears correctly.
9. Published changes become visible on the public site.
10. Draft content remains private.
11. Unauthenticated users cannot access privileged actions.
12. Direct unauthorized database requests are rejected.
13. Forms provide appropriate validation and error states.
14. Mobile navigation and essential interactions work.
15. Reduced-motion mode works as intended.

Include linting, TypeScript checks, production builds and tests in the CI pipeline.

Do not declare the project production-ready solely because it compiles.

---

## 16. Content integrity

Use the provided CV as the primary reference for personal facts.

Extract and organize:

- Name and professional introduction.
- Education.
- Experience.
- Projects.
- Technical skills.
- Certifications.
- Activities.
- Relevant awards and achievements.
- Public professional links.

Do not invent missing facts, dates, qualifications, certifications, employers, awards or project outcomes.

If information is missing, create an editable placeholder or ask for clarification.

Keep the owner’s factual biography separate from illustrative graphics and fictional visual elements.

Use placeholder content only during development, clearly mark it as placeholder, and remove it from the production seed data unless explicitly approved.

Never publish private information simply because it appears in an uploaded CV. Confirm what is appropriate for public display, particularly personal contact details.

---

## 17. Maintainable architecture

Use a clear, modular project structure. A possible organization is:

- `app/` — public pages, admin routes and route handlers.
- `components/ui/` — reusable interface primitives.
- `components/layout/` — navigation, footer and shared page layout.
- `components/sections/` — section-specific visual components.
- `components/three/` — isolated 3D scenes.
- `components/cat/` — cat sprite, behavior and animation states.
- `features/admin/` — CMS modules and editing workflows.
- `lib/supabase/` — server and browser client configuration.
- `lib/validation/` — shared schemas and validation utilities.
- `lib/security/` — authorization and related server-side protections.
- `lib/content/` — public content queries and cache invalidation.
- `types/` — shared TypeScript types.
- `supabase/migrations/` — version-controlled database migrations.
- `tests/` — unit, integration and end-to-end tests.
- `public/` — optimized static assets.

Adapt the structure when needed, but keep responsibilities clear.

Use reusable components and data-driven rendering. Avoid giant components, duplicated page implementations, uncontrolled global state and direct database access scattered throughout the UI.

Document important architectural decisions and keep configuration separate from content.

---

## 18. Deployment and production operations

Prepare the project for deployment to Vercel with GitHub as the source repository.

Implement:

- A reproducible dependency lockfile.
- Documented environment variables.
- Database migrations.
- A safe initial administrator setup process.
- Development and production environment separation.
- CI checks on pull requests.
- Preview deployments for reviewing changes.
- Production deployment on approved merges or configured pushes to the production branch.
- A documented rollback procedure.
- Database backup and restoration guidance.
- Error monitoring and useful operational logging.
- A basic incident and recovery checklist.

Do not assume that a Vercel deployment automatically applies database migrations. Document a deliberate, safe migration process.

Do not use production data in development unnecessarily.

Ensure that redeploying the application does not erase CMS content.

Database content and media must persist independently of application deployments.

Document how to configure a custom domain, environment variables, authentication URLs, redirect URLs, storage policies and production security settings.

---

## 19. Development workflow

Work in the following stages.

### Stage 1 — Discovery

Inspect the existing repository before modifying it.

Read the supplied CV and available project assets.

Identify existing technologies, deployment settings, dependencies and reusable code.

Summarize the proposed architecture, visual direction, database schema and key risks.

Do not destroy working code or overwrite existing configuration without understanding it.

### Stage 2 — Design foundation

Define the design tokens, typography, navigation, responsive grid, section themes and animation conventions.

Build a coherent visual prototype for the homepage and one representative section.

Verify that the visual direction is distinctive and consistent before expanding the full website.

### Stage 3 — Database and security

Create the schema, migrations, authentication configuration, storage policies and RLS rules.

Test public read permissions and administrator write permissions.

Establish the initial administrator securely without committing credentials to Git.

### Stage 4 — Core implementation

Build the shared layout and all public sections.

Implement database-backed content retrieval, media handling, loading states and SEO.

Create the interactive cat as a reusable system.

### Stage 5 — CMS implementation

Build the admin dashboard and all required content operations.

Verify create, read, update, delete, publishing, media upload and reordering against the real database.

### Stage 6 — Visual refinement

Add the 3D scenes, mathematics illustrations, pixel-art elements, section transitions and detailed animation.

Profile performance and simplify effects where they cause unnecessary loading or poor responsiveness.

### Stage 7 — Testing and deployment

Run automated tests, accessibility checks, security checks, production builds and performance audits.

Fix errors rather than documenting them as acceptable.

Deploy a preview, verify the production configuration, then prepare the release.

### Stage 8 — Handover

Provide:

- A summary of implemented features.
- The final project structure.
- Database schema and migration instructions.
- Required environment variables, with descriptions but no secret values.
- Supabase setup instructions.
- Secure administrator creation instructions.
- Vercel and GitHub deployment steps.
- Instructions for adding, editing, deleting and reordering content.
- Testing commands.
- Known limitations and any remaining manual setup.
- A production-readiness checklist.

---

## 20. Acceptance criteria

The work is complete only when:

- The website tells a cohesive story across distinct visual themes.
- Every required public section exists and is responsive.
- The cat behaves differently across Education, Projects, Experience and Activities.
- Real content is loaded from the database.
- Changes made in the CMS persist after refresh and deployment.
- All required content types support create, read, update, delete and reordering.
- Public users cannot read drafts or access private administration data.
- Authentication and authorization are enforced on the server and database.
- The 3D experience has accessible fallbacks.
- Essential interactions work without animation.
- Personal facts are based on verified information.
- Production builds, tests and security checks pass.
- Deployment and database maintenance are documented.
- No critical functionality is simulated with hardcoded success messages.
- No secrets or credentials are committed to the repository.

## Final instruction

Begin by inspecting the repository and the supplied CV.

Then create a concise implementation plan and proceed through the stages in order. Make sensible design decisions independently, but ask only when an essential personal fact, external credential or irreversible decision is missing.

Prioritize a remarkable visual identity, excellent usability, secure data management and reliable production behavior.

The final result should feel like an engineer's evolving universe: mathematics drawn in a notebook, electronics assembled on a workbench, intelligent systems emerging from prototypes, professional engineering expressed with precision, and personal experiences floating through the story.

It must be a real, maintainable application — not merely an impressive screenshot.