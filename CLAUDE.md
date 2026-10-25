# Clean Shopper

## Who I am

I work as a senior product designer, and I am not an engineer. When you make a technical choice, explain it in plain language so I can judge whether it fits the design.

## What this project is

Clean Shopper helps people find clean, non-toxic home, personal care, and pantry products, compare them, and save their preferences. The format is my choice: [web app, mobile app, conversational assistant, or a mix]. The full brief is imported below and is the source of truth for audience, goals, and scope.

@docs/brief.md

## Design context

Before any UI work, read docs/design-notes.md. It holds design decisions I have already made, so follow them unless I say otherwise.

## Where things go

- The real app is a React project in src/. Build app features there.
- Quick concepts go in prototypes/ as single HTML files that open with a double click. Keep them out of src/ so experiments never affect the app.
- Design context lives in docs/.

## How to work here

- Never edit docs/brief.md unless I ask. The brief is mine, and silent changes would make me lose track of decisions.
- When the brief or design notes do not answer a question, ask me before building instead of choosing a default.
- After building or changing a page, check it in a browser at 375px and 1440px wide if a browser tool is connected. Fix layout problems you find, then tell me what you changed.
- Use readable text contrast (WCAG AA), headings in order, and controls that work with a keyboard, because these can be checked in the browser.
- End each task with a short summary in this format:
  - **Made:** what you built or changed
  - **Saved:** file paths
  - **Open questions:** anything you were unsure about
