# @audilink/ui

Framework-neutral AudiLink semantic tokens, motion constants, interface principles, and small UI data contracts. Product pages remain in their respective surfaces; this package intentionally contains no React runtime components.

The package expresses the shared quiet-interface contract without forcing identical composition across Studio, Books, and Admin. New components should prefer semantic roles such as `canvas`, `surface`, `separator`, and `focus`; compatibility aliases exist only for the initial foundation slice.

Interactive components are source-owned inside each product until their behavior is stable enough to share. Generated shadcn or Canvas UI source must be adapted to AudiLink tokens, accessibility states, reduced-motion behavior, and the review rules in [`docs/08-interface-design-system.md`](../../docs/08-interface-design-system.md).
