---
name: Charly's
description: La carta nueva de Charly's que toma pedidos. Flyer cobalto a sangre, carta blanca con cuadrillé y precios en cajas cobalto macizas.
colors:
  cobalt: "#1446A9"
  cobalt-deep: "#0C2F7A"
  cobalt-night: "#081F55"
  yellow: "#FEB905"
  yellow-deep: "#F0A800"
  paper: "#FFFFFF"
  mist: "#EEF3FC"
  soft: "#D6E2F8"
  on-cobalt-soft: "#D3E0F8"
  ink-muted: "#3A5794"
  line: "rgba(20,70,169,.2)"
  line-strong: "rgba(20,70,169,.42)"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.8rem, 13.6vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 78"
  display-desktop:
    fontFamily: "Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(4.6rem, 7.4vw, 6.6rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 64"
  flyer-name:
    fontFamily: "Archivo, ui-sans-serif, sans-serif"
    fontSize: "fitted to panel width by JS (max 0.36 x panel)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 78"
  headline:
    fontFamily: "Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(2rem, 9vw, 3.1rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 115"
  day-name:
    fontFamily: "Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.9rem, 9.4vw, 3rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 118"
  time-bar:
    fontFamily: "Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.3rem, 6vw, 1.7rem)"
    fontWeight: 900
    lineHeight: 1.1
    fontVariation: "'wdth' 75"
  sheet-title:
    fontFamily: "Lilita One, Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(2rem, 9vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "Lilita One, Archivo, ui-sans-serif, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.005em"
  price:
    fontFamily: "Lilita One, Archivo, ui-sans-serif, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.01em"
    fontFeature: "'tnum'"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 800
    letterSpacing: "0.03em"
    fontVariation: "'wdth' 90"
  script:
    fontFamily: "Pacifico, Segoe Script, cursive"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  hairline: "2px"
  tight: "3px"
  box: "4px"
  control: "6px"
  float: "8px"
  sheet: "14px"
  bubble: "16px"
  pill: "999px"
spacing:
  sq-mobile: "9px"
  sq-desktop: "12px"
  gap: "8px"
  gutter: "16px"
  topbar: "64px"
components:
  price-box:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    typography: "{typography.price}"
    rounded: "{rounded.box}"
    padding: "0.3rem 0.8rem 0.2rem"
    height: "48px"
  price-box-hover:
    backgroundColor: "{colors.cobalt-deep}"
  price-box-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.cobalt-night}"
  price-box-yellow-hover:
    backgroundColor: "{colors.paper}"
  button-blue:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem"
    height: "52px"
  button-blue-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.cobalt-night}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem"
    height: "52px"
  button-yellow-hover:
    backgroundColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cobalt}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 1.35rem"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.mist}"
  tab:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.cobalt}"
    rounded: "{rounded.box}"
    padding: "0 1rem"
    height: "44px"
  tab-active:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
  shift-time:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.cobalt-night}"
    typography: "{typography.time-bar}"
    rounded: "{rounded.tight}"
    padding: "0.28em 0.9em 0.2em"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.cobalt}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "48px"
  chip-remove:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.cobalt}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "44px"
  chip-remove-checked:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
---

# Design System: Charly's

## Overview

**Creative North Star: "La carta que toma pedidos"**

The site is two real objects of the local, made to work: the cobalt flyer (product name in giant condensed yellow, the cut-out burger, prices at the foot) and the white printed carta (cobalt checkerboard borders, Lilita One rows, prices in solid cobalt boxes). Everything else, from the cart (a comanda ticket) to the builder (a line-drawn burger that stacks up), is one of those two objects extended. The identity is client-pinned (Oct 2026 rebrand): cobalt, yellow and paper are the only inks, and the brand's own vector assets (logo, wordmark, the 1930s line-drawn cat, the script lettering) carry the personality.

Density is a menu's density: many rows, tight leading, fat prices that are also the buttons. Fields alternate between cobalt flood (status bar, hero, flyers, horarios, footer) and white paper (carta, sheets, comanda), and a checkerboard band or border marks every hand-off between them. Motion is quick and decelerating everywhere, with one bounce reserved for the builder stack.

Copy grounding is literal: "Hamburguesería y sandwichería" is the client's Instagram bio; hours and location come from the Horarios story and bio; prices from the printed carta (Oct 2026). Nothing on a surface is invented brand voice.

**Key Characteristics:**
- Three inks only: cobalt, yellow, paper; mist and soft are cobalt tints of paper, not new hues.
- Flyer panels bleed edge to edge like the Instagram grid, 3px gutters, 4:5 ratio.
- Every price box is a button that opens the builder at that size.
- Brand lettering ("Nuestra carta", "Nuestros horarios", "Todo sale con papas") is vector SVG, never set in a font.
- The cat hosts: full body in the hero and empty cart; face in a circle on the carta, horarios, chat avatar, builder.
- Line drawing in cobalt (3px stroke, round joins) for the builder stack, matching the mascot and logo burger.

## Colors

Three inks from the client's flyers and carta, with cobalt tints standing in for every neutral.

### Primary
- **Flyer Cobalt** (cobalt): the flood behind hero, flyers and horarios; the ink of all text on paper; the fill of price boxes, active tabs, checked options and primary buttons. Also `theme-color`.
- **Back-Room Cobalt** (cobalt-deep): status bar, footer, mobile dock, page overscroll, and the hover state of every cobalt fill.
- **Night Cobalt** (cobalt-night): text on yellow, text selection, and the base of every shadow (rgba of #081F55).

### Secondary
- **Flyer Yellow** (yellow): product names on flyers, the hero H1, the hero primary action, horario time bars, flyer price boxes, the open-status dot, the dock counter, WhatsApp reply. Yellow lives on cobalt; on paper it appears only as a small fill (highlight in the comanda head, builder price tag, cheddar and mustard layers).
- **Toasted Yellow** (yellow-deep): hover of the yellow WhatsApp reply only.

### Neutral
- **Carta Paper** (paper): carta sheet, sheets, comanda, cards on cobalt, ghost-on-cobalt text.
- **Cobalt Mist** (mist): cart sheet and chat backgrounds, builder stage, hover wash on paper controls, checked option rows.
- **Cobalt Soft** (soft): empty cart count, pressed reply, focus halo on fields, pale layer fills (ham, tomato, pickles) in the drawn stack.
- **On-Cobalt Soft** (on-cobalt-soft): secondary text on cobalt fields (lead, footer, chat subtitle).
- **Muted Ink** (ink-muted): descriptions, notes, secondary text on paper.
- **Rule** (line) and **Strong Rule** (line-strong): hairlines under sticky bars; dotted row dividers, ghost borders, unchecked control borders.

### Named Rules
**The Three Inks Rule.** Cobalt, yellow, paper. Any other value must be a tint or shade of these; no reds, no greens, no gray neutrals.

**The Yellow-On-Cobalt Rule.** Yellow is set on cobalt fields; on paper it is only a fill behind cobalt-night text, never yellow text on white.

## Typography

**Display Font:** Archivo 900, condensed (64-78% width) and extended (115-118% width), variable from one family (`font-stretch` 62-125%)
**Body Font:** Archivo (400-800)
**Carta Font:** Lilita One (with Archivo fallback)
**Script:** Pacifico (with Segoe Script, cursive)

**Character:** Archivo does all structural work in two voices: squeezed tall like the flyer letters, or stretched wide like the carta section heads. Lilita One is the carta's heavy rounded row letter and the voice of every number a customer pays. Pacifico is a hand note, a few words at most.

### Hierarchy
- **Display** (900, 78% width, clamp(2.8rem, 13.6vw, 6rem) mobile / 64% width, clamp(4.6rem, 7.4vw, 6.6rem) desktop, 0.9, uppercase, yellow): the hero H1 only. 6.6rem desktop is a deliberate flyer-poster ceiling.
- **Flyer name** (900, 78% width, 0.86, uppercase, yellow, nowrap): QUESO / BBQ / CRUNCHY, sized by JS to fill the panel edge to edge (capped at 36% of panel width).
- **Headline** (900, 115% width, clamp(2rem, 9vw, 3.1rem), 0.95, sentence case with colon: "Hamburguesas:"): carta section heads, "Cómo pedir" (2rem), over a 3px cobalt rule.
- **Day name** (900, 118% width, clamp(1.9rem, 9.4vw, 3rem), 0.92, uppercase): horario days.
- **Time bar** (900, 75% width, clamp(1.3rem, 6vw, 1.7rem), uppercase, tabular): hours inside yellow bars.
- **Sheet title** (Lilita One, clamp(2rem, 9vw, 2.6rem), 1): builder product name, "Tu pedido".
- **Title** (Lilita One, 1.6rem; 1.75rem at 900px+; 1.35rem compact rows): carta item names; also comanda items (1.3rem), option legends (1.45rem), info rows, tabs.
- **Price** (Lilita One, 1.4rem, tabular): price boxes, counters, steppers, totals (1.6rem grand total), dock total.
- **Body** (400, 1rem, 1.55): descriptions in ink-muted at 0.95rem / 1.4, capped 42-46ch.
- **Label** (800, 90% width, 1.05rem, 0.03em, uppercase): buttons, nav links, cart button, dock; size labels inside price boxes at 0.72rem.
- **Script** (Pacifico, ~1.15rem): "¿lo de siempre?", "así va quedando", "¡gracias por pedir!".

### Named Rules
**The Lettering Is Art Rule.** "Nuestra carta", "Nuestros horarios" and "Todo sale con papas" are the brand's vector lettering (img/brand). Never retype them in Pacifico or any font, and never invent new lettering phrases.

**The Money Is Lilita Rule.** Every price, count and total is Lilita One with tabular figures; Archivo never sets a price.

**The Short Script Rule.** Pacifico is limited to notes of a few words, rotated slightly, never a heading or a sentence of body.

## Layout

Mobile-first single column at 390px; content width `max-width: 1200px` with 16px gutters (safe-area aware). Breakpoints: 460px (chat head compaction), 760px (carta rows go two-column, sheets become centered dialogs, chat becomes a 460px right drawer), 900px (topnav, two-column hero, 3-up flyers, horarios grid, checker module 12px), 1100px (carta follows the printed carta: burgers and lomitos left at 1.35fr, agregados and papas right at 1fr, 64px column gap).

The flyer rail is the one full-bleed layout: on mobile a snap-scrolling rail of 88vw 4:5 panels, on desktop three equal panels, always 3px apart with no outer padding. The carta sheet carries checkerboard columns on both edges (2 checker modules wide) and pads its content inward to clear them. Sticky stack: topbar (64px) then carta tabs. A fixed bottom dock replaces the header CTA below 900px.

Spacing is a working rhythm rather than a scale: 8px between sibling controls, 10-18px inside rows, section padding by clamp (carta 40-88px, horarios 64-120px). The checker module (`--sq`, 9px mobile / 12px desktop) sizes every checker band.

## Elevation & Depth

Mostly flat color fields; depth comes from cobalt-night soft shadows used sparingly on things that lift off the page, plus drop-shadows under cut-out photos and the cat so they sit on the cobalt like the printed flyer. No hard offset shadows.

### Shadow Vocabulary
- **Soft lift** (`box-shadow: 0 10px 26px -14px rgba(8,31,85,.45)`): hover on buttons and price boxes, together with `translateY(-2px)`.
- **Lift** (`box-shadow: 0 18px 40px -18px rgba(8,31,85,.55)`): toast.
- **Floating panel** (`box-shadow: 0 -20px 60px -20px rgba(8,31,85,.6)` / dock `0 18px 40px -14px rgba(8,31,85,.7)`): bottom sheets, chat drawer, mobile dock.
- **Cut-out drop** (`filter: drop-shadow(0 18px 14px rgba(8,31,85,.55))`): flyer photos, hero cat (`0 14px 14px rgba(8,31,85,.45)`).
- **Ticket** (`filter: drop-shadow(0 12px 16px rgba(8,31,85,.18))`): the comanda.

### Named Rules
**The Night-Shadow Rule.** Every shadow is a tint of cobalt-night, never black or gray.

**The Pressed Rule.** On `:active`, lift resets to `translateY(0) scale(.97)` with no shadow.

## Shapes

Square-shouldered like printed boxes: 4px on price boxes, tabs, options and inputs-in-sheet, 6px on buttons, cards and the chat field, 8px on floating controls (dock, icon buttons), 3px on time bars and inline highlights, 2px on the horarios board. Sheets round 14px at the top on mobile (12px when centered). Two pill forms exist where they read as conversational tokens: removal chips in the builder and chat quick replies (999px), and chat bubbles (16px with a 4px tail corner).

Recurring geometry from the brand: the checkerboard (`repeating-conic-gradient` of cobalt and white) as bands, sheet edges and the chat-head fringe; the horarios double border (3px border plus 3px outline at 6px offset); dotted 2px row dividers like a printed menu; the comanda's zigzag torn top and bottom with punched side notches and dashed internal rules.

## Components

### Price Box (signature)
The carta's solid cobalt price box is the order button.
- **Shape:** 4px corners, min-height 48px, Lilita One 1.4rem white tabular figures, size label in Archivo 800 uppercase 0.72rem above or beside (hidden on 760px+ where column heads "Simple / Doble" appear).
- **Behavior:** tapping opens the builder preset to that size; non-customizable items add directly.
- **Yellow variant:** on flyers and the builder stage, yellow fill with cobalt-night figures; hover goes to paper.
- **Hover / Press:** cobalt-deep, lift 2px with soft shadow; press scales to .97.

### Buttons
- **Shape:** 6px corners, 52px tall (44px small), 2px border matching fill.
- **Primary on paper:** cobalt fill, white Archivo 800 90%-width uppercase label; hover cobalt-deep.
- **Primary on cobalt:** yellow fill, cobalt-night label; hover to paper.
- **Ghost:** transparent with line-strong border on paper (hover mist), or 70% white border on cobalt (hover 10% white wash).
- **Focus:** 3px cobalt outline at 3px offset; white outline on cobalt fields.

### Chips
- **Removal chip:** pill, 2px line-strong border; checked fills cobalt with white text struck through (the ingredient being removed).
- **Quick reply:** pill, 2px cobalt border on paper; primary reply cobalt fill; WhatsApp reply yellow fill.

### Cards / Containers
- **Carta row:** no card; a row with dotted 2px line-strong divider, name, muted description, price boxes right.
- **Info card:** paper on cobalt, 6px corners, Headline over 3px cobalt rule, info rows with dotted dividers.
- **Comanda:** paper ticket with zigzag edges, wordmark head, dashed rules, Lilita totals, Pacifico sign-off; also rendered to a 540px canvas image for WhatsApp in the same inks and faces.

### Inputs / Fields
- **Style:** paper, 2px line-strong border, 4px (note) or 6px (chat) corners, cobalt text.
- **Focus:** border goes cobalt with a 3px soft halo; option rows and size cards take a 3px cobalt outline at 2px offset.
- **Options:** size cards (68px, Lilita name, checked = cobalt fill with yellow sub-price) and check rows (54px, checked = cobalt border on mist with a filled cobalt box).

### Navigation
- **Status bar:** cobalt-deep, 0.85rem 700 white, live hours with a yellow ring dot that fills and pulses when open.
- **Topbar:** sticky paper at 96% with blur, wordmark left; uppercase Archivo 800 links at 900px+ with a 3px yellow underline on hover; outlined cart button with Lilita counter that bumps yellow on add.
- **Carta tabs:** sticky under the topbar, Lilita One, 4px outlined; active is solid cobalt.
- **Dock (mobile):** fixed cobalt-deep bar with yellow count, label and Lilita total.

### Builder Stack (signature)
The burger drawn in cobalt line (3px stroke, round joins) with fills from the three inks and their tints, stacked bottom-up on a mist stage edged by a checker band, the cat face at the lower left and a yellow price tag tilted 3deg at the upper right. Each added layer drops in with `cubic-bezier(.34,1.5,.64,1)` over .6s, the only overshoot easing in the system.

### Hero Flyer and Burger
Cobalt field, yellow condensed H1, the 3D burger (model-viewer, auto-rotating, poster image first) masked to fade at its foot, the full-body cat peeking at the lower left tilted -4deg, and a checker band closing the field.

## Do's and Don'ts

### Do:
- **Do** keep to cobalt (#1446A9), yellow (#FEB905) and paper; derive anything else as a cobalt tint or shade.
- **Do** set product names on cobalt in Archivo 900 condensed yellow, fitted to the panel width.
- **Do** make every price a Lilita One price box, and make it the action for that item and size.
- **Do** close every cobalt-to-paper hand-off with the checkerboard, sized from the 9px/12px module.
- **Do** use the brand's SVG lettering and cat assets as-is; cat face in a circle for hosts, full body only in hero and empty cart.
- **Do** use decelerating easing (`cubic-bezier(.16,1,.3,1)`) for state changes and honor reduced motion.
- **Do** keep touch targets at 44px minimum.

### Don't:
- **Don't** add a fourth hue or gray neutrals; no black shadows.
- **Don't** set yellow text on paper.
- **Don't** typeset "Nuestra carta", "Nuestros horarios" or "Todo sale con papas" in a font, or invent new script lettering.
- **Don't** grow the hero H1 beyond 6.6rem.
- **Don't** use the builder's bounce easing anywhere else.
- **Don't** put products in equal rounded cards with photos; flyers are full-bleed panels and the carta is rows.
- **Don't** use a floating WhatsApp bubble; the order goes to WhatsApp through the assistant and comanda.
- **Don't** use Pacifico for headings or sentences.
