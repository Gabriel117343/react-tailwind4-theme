[![React](https://img.shields.io/badge/React-18.2.0+-blue.svg?style=flat-square)](https://reactjs.org/)  
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-blue.svg?style=flat-square)](https://tailwindcss.com/)  
[![Version](https://img.shields.io/badge/Version-1.8-orange.svg?style=flat-square)](https://github.com/your-repo/react-tailwind-theme)  
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

# React Tailwind4 Theme 🚀

## Installation 💻

```bash
npm install react-tailwind4-theme
```

**React Tailwind4 Theme** is a small library (or hook) designed for projects using **Tailwind CSS v4** and **React 18+**. This hook, `useHandleTheme`, facilitates managing dark and light modes in your application by detecting system preferences and persistently storing the user’s choice. 🎨

## Features ✨

- **System Theme Detection:**  
  Checks the user’s preference using `window.matchMedia("(prefers-color-scheme: dark)")`. 🔍

- **Theme Persistence:**  
  Stores the user’s choice in `localStorage` to maintain consistency during the session and future visits. 💾

- **Separation of Concerns:**  
  The hook updates two attributes on the `<html>` element:
  - **`data-theme`**: Indicates the applied theme, either `"light"` or `"dark"`.🌒
  - **`origin-theme`**: Specifies the source of the theme (`"user-defined"` or `"system"`). 🛠️

- **Dynamic Update:**  
  Subscribes to changes in the system preference, updating the theme in real time (if the user has not manually set one). ⚡

## Setting Up the Entry File
For the hook to work correctly and for you to observe the theme origin right from the start, add the attributes `data-theme` and `origin-theme` to the `<html>` element of your entry file (for example, in `index.html`). Here’s an example:

```html
<!doctype html>
<html lang="en" data-theme="light" origin-theme="system">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Your description here" />
    <title>React Tailwind4 Theme Example</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- Scripts and other resources -->
  </body>
</html>
```

>[!NOTE]  
>With this initial configuration, the useHandleTheme hook will dynamically update the attributes on the `<html>` element according to the user or system preference. ✅

## Usage Example
Below is an example of how to integrate useHandleTheme in a React component:

```jsx
import { useHandleTheme } from 'react-tailwind4-theme';

export const Header = () => {
  const { onChangeTheme, origin, theme } = useHandleTheme();
  console.log({ origin }); // user-defined - system
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900">
      {/* ... */}
      <div className="flex items-center gap-4">
        <button
          onClick={onChangeTheme}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {theme === 'dark' ? (
            <DarkSvg className="dark:text-gray-200 w-6 md:w-8" />
          ) : (
            <LightSvg className="dark:text-gray-200 w-6 md:w-8" />
          )}
        </button>
      </div>
    </header>
  );
};
```

### In this example, the hook:

- Detects and persists the applied theme. 🔄
- Updates the **data-theme** and **origin-theme** attributes on the `<html>` element. 🌐
- Allows switching the theme manually via onChangeTheme. 🔧

### How to Debug and Test Dark Mode 🐞

To facilitate debugging and testing related to `prefers-color-scheme`, Chrome DevTools allows you to emulate the user's color scheme preference without affecting the system-wide configuration. This is especially useful for validating the behavior of the `useHandleTheme` hook. 👍
