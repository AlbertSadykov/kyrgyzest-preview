# Kyrgyzest — header fix v4

Only the header and the unwanted white fade at the bottom of the hero were changed.

- Header overlays the hero without a white background, white gradient, pill/card or border.
- A subtle dark vignette with light blur fades downward BEHIND the transparent navigation.
- When scrolling, the header remains transparent; dark atmospheric gradient becomes a little deeper.
- Navigation links use white text.
- Removed the `hero::after` CSS effect responsible for the white fading effect near the hero bottom.

Changes are contained in the final `HEADER v4` section in `src/experience.css`.
CSS precedence: `styles.css` -> `refinement.css` -> `experience.css`.

To run:
`npm install`
`npm run dev`
