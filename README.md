# 6. Parallax - partial width
## Screenshots
![screenshot-01](./screenshots/screenshot-01.png)
![screen-recording-01](./screenshots/screen-recording-01.gif)

## Features
- Partial width parallax
- Scrolls at a different speed than other elements
- Parallax scroll starts as it appears on the screen and ends as it disappears from the screen
- Parallax-1 moving from top to bottom
- Parallax-2 moving from bottom to top

## Skills
- HTML
- CSS
- JS

## Notes
- Manipulate `position: absolute;`, `top` value to control parallax.
- Which CSS property to manipulate really depends on the design of the UI
- The key is to
    - find the suitable CSS property to manipulate
    - calculate scrollRatio and partScrollRatio to play parallax only within its section
    - parallax element should be positioned correctly on load, on scroll and on resize