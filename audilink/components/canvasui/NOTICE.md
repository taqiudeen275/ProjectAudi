# Canvas UI source notice

`Ripple.tsx` is a source-owned adaptation of the React Ripple component from Canvas UI:

- Documentation and source: <https://canvasui.dev/docs/components/ripple>
- Registry entry: <https://canvasui.dev/r/ripple-react.json>
- Project: <https://canvasui.dev/>

Canvas UI publishes its components under the MIT License with the Commons Clause. The component may be used and modified in personal or commercial applications, but the component source itself may not be resold or redistributed as a competing component, bundle, or port. Retain this notice when copying the adapted source elsewhere.

AudiLink-specific changes keep the effect subtle and nonessential, prevent WebGL initialization when `prefers-reduced-motion: reduce` is active, pause work while the element is off-screen, and preserve the regular interactive HTML fallback when enhanced canvas rendering is unavailable.
