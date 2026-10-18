# Product

<!-- impeccable:product-schema 1 -->

> Source: `website-arcitecture.md` (the owner's build brief), `CV_.pdf`, and the owner's answers on 2026-10-18. Visual direction lives in DESIGN.md, not here.

## Platform

web

## Stack

Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4. Supabase (Postgres, Auth, Storage, RLS) for content and admin. GSAP/ScrollTrigger and Motion for animation. React Three Fiber only where 3D earns it. Hosting on Vercel from GitHub (`Nafis000/portfolio`). The stack is pinned by the brief.

## Users

- **Primary:** recruiters, lab supervisors and engineering teams evaluating Nafis for internships, research or robotics/automation roles. They skim first, then go deep on one or two projects.
- **Secondary:** peers, competition teams and collaborators who come from GitHub or events.
- **Owner as admin:** Nafis edits all content through a private CMS (Operate mode, separate surface).

## Product Purpose

A personal engineering portfolio that tells one story: "From equations on paper to intelligent machines in the real world." It goes from mathematics, through education, projects, experience, certifications and activities. Success means a visitor quickly understands who Nafis is and what he has built, and can open a project's engineering process or contact him.

## Positioning

A bespoke, story-driven lab and notebook experience grounded in real hardware projects, not a template developer portfolio. Each life stage has its own visual world on a shared system. A small grey cat companion follows the visitor between those worlds.

## Operating Context

- Mostly desktop visits from links in applications and CVs. Mobile visits come from social and event links.
- Content is edited by the owner without code changes or redeploys, through the Supabase-backed CMS.
- The hidden admin entry (a tiny green dot at the bottom of the homepage) is a design detail only. Security is real auth plus RLS.

## Capabilities and Constraints

- Sections: Home, Education (notebook), Projects (lab), Experience (studio), Activities (floating journal), Certifications (archive), Skills (capability map), Contact.
- Projects support status values: prototype, experiment, in progress, completed. Never imply a prototype is finished.
- WCAG 2.2 AA, reduced-motion support, native scrolling, no forced waits, no content trapped behind hover or animation.
- Performance: aim for Lighthouse 90+ in every category. Lazy-load 3D, with static fallbacks.

## Brand Commitments

- Owner: **Nafis Islam Nitol**, Electrical Engineering student at the University of Pécs, Hungary.
- Voice: plain, confident, technically precise. No hype words and no invented metrics.
- Illustrative graphics (the cat's `lazy cat` detection box, math annotations) are clearly playful. They are never presented as factual claims.

## Evidence on Hand

- `CV_.pdf`: name, about, education (Pécs BSc EE 09/2025–current; UAP BSc CSE 07/2024–06/2025, CGPA 3.94; HSC 2020–2022, GPA 5.00; SSC 2014–2020, GPA 5.00; IELTS 7.5), projects (QuadoBot autonomous drone, Line Following Robot, Soccer Bot, Smart Dwelling Model), skills, hobbies, and languages (English C1/C2).
- `legacy/portfolio_data.json`, confirmed by the owner: ESP32 Wi-Fi Rover project, Synergy Solutions (Customer Relationship Officer, Feb–Sept 2024), the Stipendium Hungaricum scholarship, and 3 certifications (Advanced IoT System Design from Coursera/UC 2024, C++ Programming for Robotics from Udemy 2023, Arduino Fundamentals 2022). The certifications have no credential URLs yet.
- Images: `pictures/profile*.{jpg,png}` (portraits) and a single project screenshot. Most projects have no real photos yet, and photos are not to be fabricated.
- **Absent, don't invent:** activities, project metrics or results, project dates, LinkedIn URL, credential IDs.
- **Public contact:** email (`nafisislamnitol@gmail.com`), GitHub (`github.com/Nafis000`) and the CV download. Phone and date of birth stay private, so the public CV file needs a redacted version before launch.

## Product Principles

1. **Truth over polish.** Every fact traces to the CV or the owner's confirmation. Gaps show as editable placeholders, not filler.
2. **Process over pictures.** Projects explain problem, approach, trade-offs and status, not just a thumbnail.
3. **Content first, spectacle second.** The introduction reads immediately, and 3D and motion are optional layers.
4. **One system, many worlds.** Sections differ in mood while sharing navigation, type principles and interaction.
5. **Secure by construction.** Admin capability lives in server auth and RLS, never in hidden UI.
