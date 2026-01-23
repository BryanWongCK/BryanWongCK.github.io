# BryanWongCK.github.io

A portfolio website showcasing projects through screenshots and GIFs.

## Features

- **Project Showcase**: Display your work with images and animated GIFs
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth scrolling, hover effects, and image lightbox
- **Easy to Update**: Simply add your media files to the `projects/` folder

## Quick Start

1. Add your project screenshots and GIFs to the `projects/` folder
2. Edit `index.html` to update project information
3. Customize colors and styling in `styles.css`
4. Commit and push your changes

Your portfolio will be live at: https://bryanwongck.github.io

## Project Structure

```
.
├── index.html        # Main HTML file
├── styles.css        # Styling and layout
├── script.js         # Interactive features
├── projects/         # Folder for screenshots and GIFs
│   ├── README.md     # Instructions for adding media
│   └── .gitkeep      # Ensures folder is tracked
└── README.md         # This file
```

## Adding New Projects

1. Add your media file to the `projects/` folder:
   - Screenshots: `project-name-screenshot.png`
   - GIFs: `project-name-demo.gif`

2. Edit `index.html` and add a new project card:
```html
<div class="project-card">
    <div class="project-media">
        <img src="projects/your-file.png" alt="Project Name">
    </div>
    <div class="project-info">
        <h3>Project Name</h3>
        <p>Project description goes here.</p>
        <div class="project-tags">
            <span class="tag">Technology</span>
        </div>
    </div>
</div>
```

3. Commit and push your changes

## Customization

- **Colors**: Edit the color variables in `styles.css`
- **Layout**: Modify the grid settings in `.projects-grid`
- **Content**: Update text in `index.html`

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+)
- GitHub Pages

## License

This project is open source and available for personal use.