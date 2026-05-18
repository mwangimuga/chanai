# ChanAI Tech — Claude Skills

This folder contains two **skills** that guide how the AI assistant should design, animate, and build the ChanAI Tech website. Think of them as on-demand instruction sets the AI loads before working on specific kinds of tasks.

> Location: every skill lives inside `claude.md/` at the project root.
> Format: each skill is a single Markdown file with a YAML frontmatter (`name`, `description`) followed by the rules.

---

## 📁 Skills in this folder

| File | Skill | When to use it |
|------|-------|----------------|
| `SKILLfrooo.md` | **frontend-design** | Building or refining UI components, pages, layouts, typography, color, and overall visual polish. |
| `SKILL_GSAP_2.md` | **video-to-website / GSAP scroll** | Adding scroll-driven animations, pinned sections, frame-by-frame video scroll, marquees, parallax, and cinematic transitions. |

---

## 🎨 1. `SKILLfrooo.md` — Frontend Design

**Purpose:** Produce distinctive, production-grade interfaces that avoid generic "AI slop" aesthetics. It enforces a strong design point of view — bold typography, intentional color zones, varied layouts, and refined motion.

### How to invoke it
In a prompt to the AI, say things like:
- *"Use the frontend-design skill to redesign the Services section."*
- *"Apply the scroll-driven website rules from SKILLfrooo to the About page."*
- *"Following the frontend-design skill, rebuild the hero with editorial typography."*

### What it gives you
- Typography rules (hero ≥ 6rem, section labels in small caps, etc.)
- Strict **no-card / no-glassmorphism** rule for scroll-driven sections
- Color-zone guidance (background shifts between sections)
- Layout variety requirements (centered, split, full-width, etc.)
- Animation choreography (staggered entrances, pinned sections, count-up stats)

### Best for
The premium ChanAI sections: Hero, About, Services, Community, Training, Contact — anywhere we want the page to feel **elite and editorial**.

---

## 🎬 2. `SKILL_GSAP_2.md` — GSAP Scroll & Video-to-Website

**Purpose:** Build cinematic, scroll-controlled experiences using **GSAP** + **ScrollTrigger** — including frame-by-frame video scrubbing, pinned reveal sections, horizontal scroll, and orchestrated motion timelines.

### How to invoke it
- *"Use the GSAP skill to add a pinned scroll reveal to the AI Agents section."*
- *"Following SKILL_GSAP_2, scrub a background video on scroll in the Hero."*
- *"Add a horizontal marquee section as described in the GSAP skill."*

### What it gives you
- Setup pattern for GSAP + ScrollTrigger in React/Vite
- Recipes for: video scrub, pinned sections, staggered text reveals, parallax, horizontal scroll, count-up numbers
- Performance guidance (will-change, lazy registration, cleanup in `useEffect` return)

### Dependencies (install before first use)
```bash
bun add gsap
```
GSAP's `ScrollTrigger` plugin ships inside the `gsap` package — no separate install needed.

### Best for
Hero entrance, transitions between Services, About-page storytelling, Stats counters, and any "wow moment" we want users to remember.

---

## 🧩 Using both skills together

For most ChanAI sections you'll want **both**:

1. **SKILLfrooo** decides *what it looks like* — type scale, color zone, layout, hierarchy.
2. **SKILL_GSAP_2** decides *how it moves* — entrance, pin, scrub, stagger.

Example prompt:
> *"Rebuild the Services section. Use the frontend-design skill for layout and typography (no cards, oversized headings, label "002 / Services"), and the GSAP skill to pin the section while each service slides in with a staggered reveal."*

---

## ✅ Quick checklist before shipping a section

- [ ] Section follows a clear color zone (light / dark / accent)
- [ ] Typography hierarchy uses size + weight, not boxes
- [ ] No glassmorphism cards on scroll-driven content
- [ ] Each section uses a different entrance animation
- [ ] At least one pinned or horizontally-scrolling moment per page
- [ ] Stats count up with GSAP (never appear statically)
- [ ] Animations are cleaned up on unmount (`ScrollTrigger.kill()`)

---

_Maintained for the ChanAI Tech Consulting website. Update this README whenever a new skill is added to `claude.md/`._
