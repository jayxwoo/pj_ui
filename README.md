# 5. Parallax - full width
## Screenshots
![screenshot-01](./screenshots/screenshot-01.png)
![screen-recording-01](./screenshots/screen-recording-01.gif)

## Features
- Full width parallax (but not full height)
- Sandwiched between sections
- Parallax images scroll at a different speed
- Parallax scrolls only when it is visible on browser window

## Skills
- HTML
- CSS
- JS

## Notes
- Calculate scroll ratio and part scroll ratio to play parallax within a specific scroll ratio section.
- Scroll for parallax is controlled by `parallax.style.backgroundPositionY = ${partScrollRatio * 100}%;`