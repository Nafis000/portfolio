---
name: Nafis Islam Nitol · Engineering Portfolio
description: Engineering drawings and datasheets laid on a self-healing cutting mat.
colors:
  mat: "#1c4234"
  mat-deep: "#142f25"
  mat-line: "#2b5745"
  chalk: "#eef0e6"
  chalk-dim: "#b8c7bc"
  copper: "#e39a62"
  copper-deep: "#9a5222"
  sheet: "#f4f6f1"
  sheet-line: "#d5dcd4"
  ink: "#13201a"
  ink-dim: "#46564e"
  paper: "#f2f5f7"
  paper-line: "#c3d3df"
  pencil: "#3d5566"
typography:
  display:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3.6rem, 9vw, 7.25rem)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
    letterSpacing: "0.12em"
  annotation:
    fontFamily: "Kalam, cursive"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.56
  value:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    fontFeature: "\"tnum\""
rounded:
  none: "0px"
  focus: "2px"
  ellipse: "50%"
spacing:
  grid: "24px"
  sheet-pad: "28px"
  sheet-pad-lg: "40px"
  gutter: "24px"
  gutter-md: "40px"
  gutter-lg: "64px"
  section: "96px"
  section-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.ink}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  datasheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sheet-pad}"
  status-stamp:
    backgroundColor: "transparent"
    textColor: "{colors.copper-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  nav-bar:
    backgroundColor: "{colors.mat-deep}"
    textColor: "{colors.chalk-dim}"
    typography: "{typography.label}"
    height: "57px"
  chip-value:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.value}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
---

# Design System: Nafis Islam Nitol · Engineering Portfolio

## Overview

**Creative North Star: "The Engineer's Cutting Mat"**

Every page is laid on a self-healing cutting mat: a deep green surface with a chalk centimetre grid, numbered rulers along the top and left edges, and a protractor fan in the bottom-left corner. Work sits on the mat as objects. Projects are white datasheets with a ruled title block, a bill of materials and a rubber status stamp. The hero is an engineering drawing made with one copper pen line. The mood is precise, quiet and hands-on. Most of the surface is mat green and chalk, and copper is the one warm accent.

The system is shared by several section worlds. Each world changes the surface and keeps the type, the square drafting geometry, the copper accent and the navigation. Two worlds are built: **the mat** (home hero, Projects, Skills, the 404 page) with its **datasheets**, and **the notebook** (graph paper, previewed by the Education section on home). The Experience "studio", the Activities "floating journal" and the Certifications "archive" are **not built yet**. Experience currently renders on plain sheet white and Certifications on mat-deep. Their own tokens will be recorded when they ship, not invented here.

Depth is physical. Sheets cast soft drop shadows onto the mat and rest at slight angles. Motion is a pen drawing once and then standing still: no loops and no ambient animation.

**Key Characteristics:**
- Deep cutting-mat green surface with a chalk 24px/120px grid and edge rulers
- Square corners everywhere. The only curves are hand-drawn (pen rectangles, the grade ellipse)
- Condensed uppercase drafting lettering for headings and labels, a humanist sans for reading
- Kalam handwriting for annotations only, JetBrains Mono for values only
- Projects as datasheets: title block, BOM table, rotated status stamp, soft cast shadow
- One copper accent: a pen line, a primary button, a stamp or a highlighted word

## Colors

A low-chroma mat green and chalk base, a tinted white for sheets, and one warm PCB-copper accent in two strengths.

### Primary
- **PCB Copper** (copper): the pen colour. Used for the hero drawing stroke, the primary button fill, the accented surname, mat-side link text, annotation lead-ins on the mat, skill group labels, certification years and the contact band background. Text set on copper is always ink.
- **Burnt Copper** (copper-deep): copper as it appears on white paper. Used for status stamps, hand-lettered section labels on datasheets, hover colour of titles and links on sheets, and the short rule markers in Experience lists. Use it on sheets and never on the mat, because it disappears on green.

### Neutral
- **Cutting-Mat Green** (mat): the default page surface and the grid background.
- **Mat Underside** (mat-deep): the navigation, footer, About and Certifications bands. Gives the mat a second, darker layer without adding a new hue.
- **Mat Rule** (mat-line): scrollbar thumb and structural lines on the mat.
- **Chalk** (chalk): headings, body text and grid lines on the mat (grid at 13% and 5% opacity, ruler ticks at 55% and 30%). Hairline borders on the mat use chalk at 20–30% opacity.
- **Dusty Chalk** (chalk-dim): secondary text and annotations on the mat.
- **Datasheet White** (sheet): project sheets and the Experience band.
- **Sheet Rule** (sheet-line): row dividers inside BOM tables and lists on sheets.
- **Drafting Ink** (ink): text and the 2px structural rules on sheets. Also the text colour on copper.
- **Faded Ink** (ink-dim): categories, item numbers, table headings and secondary text on sheets.

### Notebook world (Education)
- **Graph Paper** (paper): notebook surface (20px minor and 100px major grid in pencil at 7% and 18%).
- **Paper Rule** (paper-line): reserved for notebook rules.
- **Pencil** (pencil): secondary text and hand-drawn ellipses in the notebook. Headings there stay ink.

### Named Rules
**The One Pen Rule.** Copper is the only chromatic accent. A new section does not add a new hue. It changes the surface (mat, sheet, paper) and keeps copper.

**The Paper Swaps the Copper Rule.** Use copper on the mat and copper-deep on sheets and paper. Never use bright copper as text on white, and never use copper-deep on green.

## Typography

**Display Font:** Barlow Semi Condensed (with Arial Narrow, sans-serif), weights 500/600/700
**Body Font:** Source Sans 3 (with system-ui)
**Annotation Font:** Kalam (with cursive)
**Value Font:** JetBrains Mono (with ui-monospace)

**Character:** DIN-style drafting lettering does the talking and a humanist sans does the reading. The handwriting and the monospace are tools with one job each, not a style layer.

### Hierarchy
- **Display** (700, clamp(3.6rem, 9vw, 7.25rem), line-height 0.86, uppercase): the hero name only. Page titles use the same treatment one step down: clamp(3–3.5rem … 5.5–6rem), line-height 0.9.
- **Headline** (700, 3rem rising to 3.75rem at ≥640px, uppercase): section titles such as "Education", "On the bench" and "Parts bin". The About title is one step smaller (2.25 rising to 3rem).
- **Title** (700, 1.5–1.875rem, line-height 1, uppercase, +0.02em on sheet title blocks): datasheet titles, roles, qualifications and certification names.
- **Body** (400, 1.125rem, line-height 1.625): prose capped at 52–68ch. Lead statements use 1.25–1.5rem at a snug line height, capped at 34–58ch.
- **Label** (600, 0.75–1.125rem, +0.08–0.14em, uppercase): navigation, buttons, categories, table headings and stamps. Buttons and nav use +0.08em, small labels +0.12em, stamps +0.14em.
- **Annotation** (Kalam 400, 1.125–1.5rem): hand notes such as "interested in", "the problem:", figure captions, drawing callouts and the datasheet section labels ("The problem", "How it works").
- **Value** (JetBrains Mono 400, 0.6875–0.875rem, tabular numbers): dates, years, BOM item numbers, ruler numbers and drawing signal names.

### Named Rules
**The Drafting Caps Rule.** Every heading and label is Barlow set in uppercase. Prose is never uppercase.

**The One Job Rule.** Kalam is for things a person would write by hand on the drawing. Mono is for values a person would read off a meter or a datasheet. Neither is used for running text or decoration.

## Layout

The page is a stack of full-bleed bands, each one a surface (mat, mat-deep, paper, sheet, copper). Content is centred in a 1440px container with 24px gutters, 40px from 640px and 64px from 1024px. Bands are padded 96px vertically, increasing to 112–128px from 1024px. The mat grid is built on a 24px "centimetre" with a major line every 120px, and the notebook uses 20px and 100px. Two-column compositions switch on at 1024px with a 12-column split (7/5 for featured sheets, 4/8 for title plus list, 8/4 for the hero). Below 768px the navigation collapses into a single "Menu" disclosure. Sticky navigation is 57px tall, and in-page anchors offset with a 64px scroll margin. Alternate items may step out of line (notebook entries drop by 40px in the second column, featured sheets carry their own tilt), but reading order always stays top to bottom, left to right.

## Elevation & Depth

Depth is physical and comes only from sheets resting on the mat. The mat, bands and navigation are flat. Sheets cast a soft, tinted drop shadow (mat-black rgb(5 20 14)) with a long negative-spread blur and a tight contact shadow. A sheet that lifts on hover deepens its shadow. The navigation uses a 92% mat-deep fill with a light backdrop blur instead of a shadow. Hairline rules (chalk at 20–30% on the mat, 2px ink on sheets) separate everything else.

### Shadow Vocabulary
- **Sheet at rest** (`box-shadow: 0 18px 40px -18px rgb(5 20 14 / 0.7), 0 2px 6px rgb(5 20 14 / 0.25)`): featured datasheet cards.
- **Sheet lifted** (`box-shadow: 0 28px 50px -20px rgb(5 20 14 / 0.75), 0 2px 6px rgb(5 20 14 / 0.25)`): datasheet card on hover.
- **Sheet in list** (`box-shadow: 0 24px 50px -24px rgb(5 20 14 / 0.8), 0 2px 6px rgb(5 20 14 / 0.25)`): full-width sheets on the Projects page.
- **Sheet page** (`box-shadow: 0 30px 60px -28px rgb(5 20 14 / 0.85), 0 2px 6px rgb(5 20 14 / 0.25)`): the single sheet of a project detail page.

### Named Rules
**The Only Paper Casts Rule.** Shadows belong to sheets lying on the mat. Buttons, chips, stamps and bands stay flat.

## Shapes

Square drafting geometry throughout. Cards, buttons, chips, images and tables have 0 radius. The only rounding is the 2px focus outline and shapes that are clearly hand-drawn: 3px corners on the pen-drawn block diagram, and the 50% ellipse drawn round a grade in the notebook (rotated −2°). Borders carry the structure: 2px ink rules form the title blocks and section splits on sheets, 1px ink and sheet-line rules divide table rows, and 1px chalk hairlines divide cells on the mat (grids built from a 1px gap over a chalk-tinted background). Rotation is a material property. Sheets rest between −1.2° and +1.1° and straighten on hover or focus, stamps sit at −6°, and hand ellipses at −2°.

## Components

### Buttons
Flat, square, lettered like a drawing label.
- **Shape:** square corners (0px).
- **Primary:** copper fill, ink text, Barlow 600 uppercase at 1.125rem with +0.08em tracking, padding 14px 24px. Reserved for the single most important action in a view ("Explore projects", "Back to the start").
- **Hover / Focus:** the fill changes to chalk (colour transition only). Focus shows the global 2px copper outline offset by 3px.
- **Outline:** transparent, with a 1px chalk border at 60% and chalk text. On hover the border is full chalk and the fill is chalk at 10%. Secondary actions on the mat ("View CV").
- **Text link with arrow:** Barlow label in copper on the mat or ink on sheets, followed by the pen-drawn arrow. On sheets it carries a 2px ink underline rule that turns copper-deep on hover.

### Chips
- **Style:** 1px ink border at 40%, no fill, JetBrains Mono 0.875rem, padding 4px 12px, square. Lists software on a datasheet.

### Cards / Containers: the Datasheet
- **Corner Style:** square (0px).
- **Background:** sheet, with ink text.
- **Shadow Strategy:** see the Sheet shadows in Elevation & Depth.
- **Border:** none outside. Inside, 2px ink rules divide the summary, the title block and the BOM column.
- **Internal Padding:** 24–28px on cards, 28–40px on full sheets.
- **Title block:** a two-cell strip along the bottom edge (title and category on the left, status stamp on the right) separated by a 1px ink rule.
- **Behaviour:** every card rests at its own tilt. On hover it straightens, rises 4px and deepens its shadow over 500ms with ease-out-expo. The title turns copper-deep.

### Status Stamp
A rubber stamp, not a badge: 2px copper-deep border, copper-deep Barlow 700 uppercase at +0.14em, rotated −6°, no fill. An unknown status shows "Status TBC" with a dashed ink-dim border. It never claims a state the content doesn't support.

### Parts List (BOM table)
Full-width table with no cell borders. The header row has ink rules above and below at 70% and uses an ink-dim Barlow label at 0.75rem. Body rows have a sheet-line bottom rule, two-digit mono item numbers (01, 02…) in ink-dim, and part names in ink. Truncated lists end with "+N more" in ink-dim.

### Navigation
A drawing title block across the top: a sticky mat-deep strip (92% fill, light backdrop blur) with a chalk 25% bottom rule, divided into ruled cells by 1px chalk 25% verticals. The name cell is Barlow 600 in chalk and turns copper on hover. Section cells use the uppercase Barlow label at 0.95rem with +0.08em tracking in chalk-dim. On hover the text turns chalk and the cell takes a 5% chalk fill. Below 768px a single "Menu"/"Close" cell opens a ruled mat-deep dropdown.

### Mat Markings (signature)
Decorative and aria-hidden. Ruler ticks run along the top and left edges (long tick every 120px, short every 24px) with mono centimetre numbers every 5cm at 55% chalk. A 30°/45°/60° protractor fan rises from the bottom-left corner in chalk at 15%. They appear on mat-grid hero surfaces only and stay clear of content.

### The Pen Line (signature motion)
Illustrations on the mat are single copper strokes (2.2px, round caps and joins) that draw themselves once on load with ease-out-expo over 0.4–1.6s and staggered delays. Handwritten text reveals left to right, and labels settle in (fade plus 6px rise, 0.6s). Content is readable before the drawing finishes. The hero robot may travel its track with scroll (scroll-driven where supported). Reduced motion removes all of this, and smooth scrolling as well.

## Do's and Don'ts

### Do:
- **Do** put every new surface on the mat, a sheet or graph paper, and keep copper as the only accent (The One Pen Rule).
- **Do** use copper on green and copper-deep on white (The Paper Swaps the Copper Rule).
- **Do** set headings and labels in uppercase Barlow Semi Condensed, and prose in Source Sans 3 capped at 52–68ch.
- **Do** keep Kalam for genuine hand notes and JetBrains Mono for values (dates, item numbers, measurements) with tabular numbers.
- **Do** give sheets the soft tinted cast shadow and a resting tilt within ±1.2°, straightening on hover and focus.
- **Do** keep corners square, except for shapes that are visibly hand-drawn.
- **Do** keep the 2px copper focus outline (3px offset) on every interactive element.

### Don't:
- **Don't** add rounded cards, pill badges or hard offset shadows. Those belonged to the retired "Playful Geometric" site, and sheets on a mat cast soft shadows.
- **Don't** add neon, glow or gradients. Light on the mat is matte.
- **Don't** set body text in Kalam or mono, or use either one as decoration.
- **Don't** put an annotation above a heading as a kicker or eyebrow. Hand notes run inline, caption a figure, or label a sheet section.
- **Don't** loop animation or make content wait for it. The pen draws once.
- **Don't** invent tokens for the Experience studio, Activities journal or Certifications archive before those worlds are built.
