# Fieldnotes Newsletter Signup

A polished, responsive newsletter landing page with an accessible signup modal. The project is built with plain HTML, CSS, and JavaScript and is designed to work as a static site on GitHub Pages.

## Features

- Responsive landing page with navigation, editorial-style hero, and newsletter highlights
- Signup modal that appears four seconds after a first visit
- Manual modal launch from the page's subscribe buttons
- Session storage prevents the automatic modal from reappearing after dismissal
- Email validation with clear error feedback and inline correction handling
- Simulated loading and success states; no email is stored or sent
- Close button, backdrop click, Escape key, focus management, and keyboard focus trapping
- Background scrolling is disabled while the dialog is open
- Reduced-motion support and visible keyboard focus styles

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript

## Project structure

```text
newsletter-signup-modal/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

1. Download or clone this project.
2. Open `index.html` in a modern browser.
3. For a local web server, run `python -m http.server 8000` from the project directory and visit `http://localhost:8000`.

The page uses Google Fonts when an internet connection is available and falls back to system fonts otherwise.

## Future improvements

- Connect the form to a newsletter provider or a backend subscription endpoint.
- Add a privacy policy and consent preferences before collecting subscriber data.
- Add automated accessibility and interaction tests.
- Expand the newsletter archive with sample issues.

## Author

Created by **Rutvi Jadav** as a web development internship project. Replace this with your name and preferred profile links.
