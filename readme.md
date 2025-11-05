# Starlit Stories Interactive Book Framework

This project delivers a ready-to-publish web framework for a children's book with a cover plus ten fully outlined chapters. Each chapter is paired with a vibrant SVG illustration so you can plug in final artwork later without rewriting code.

## Features

- **Eleven story beats**: one cover spread and ten sequential chapters, all navigable through a built-in table of contents.
- **Dynamic illustrations**: lightweight SVG placeholders are generated in JavaScript to visualize every chapter until production art is ready.
- **Responsive layout**: the layout adapts across desktop, tablet, and mobile with a persistent navigation rail and polished reading surface.
- **Progress tracking**: a progress bar and previous/next buttons make it easy for caregivers and kids to resume where they left off.

## Getting Started

Open `index.html` in your browser to explore the demo storybook. Use the **Open the Book** button or click any chapter in the table of contents to jump directly to that section.

## Customizing the Story

1. Update the `story` array in `script.js` with your manuscript copy. Each entry accepts a `title`, `subtitle`, and an array of paragraph strings in `description`.
2. Replace the generated SVG placeholders with your final art by swapping the `illustration` property after the `story` array is declared.
3. Adjust typography, colors, and layout in `styles.css` to match your brand or the aesthetic of your book.

## License

This project is provided for prototyping and demonstration purposes. Adapt and extend it to bring your own children's book to life.
