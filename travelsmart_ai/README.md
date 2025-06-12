# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Important Note: Babel Configuration

This project’s `package.json` includes a `babel` section with a plugin:

```json
"babel": {
"plugins": ["./.ve/babel-plugin-jsx-editor-id.js"]
}
```

This plugin enables **visual editing functionality** in supported tools.

**Warning for AI code agents and contributors:**
**DO NOT** remove or modify this section - it is ESSENTIAL for proper operation.
Removing it will break editor integration and visual editing features.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Environment Variables & API Keys

**How to use API keys securely:**
- Add all API keys, service secrets, and configuration to `.env` in the project root.
- Prefix all such variables with `REACT_APP_` to expose them to the React frontend bundle (required by create-react-app and similar setups).
- Access these in your React code using `process.env.REACT_APP_YOUR_KEY`.
- **Never commit real credentials to git.** This project includes `.env` in `.gitignore`.
- After any change to `.env`, restart the development server for updates to take effect.

**Example `.env`:**
```env
REACT_APP_WEATHER_KEY=your_openweathermap_key
REACT_APP_AMADEUS_API_KEY=your_amadeus_key
REACT_APP_AMADEUS_API_SECRET=your_secret
```

**Example usage in JS:**
```js
const apiKey = process.env.REACT_APP_WEATHER_KEY;
```

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
