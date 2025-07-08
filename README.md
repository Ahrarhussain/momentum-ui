# momentum-ui

# 🚀 React + Vite + Tailwind CSS Setup Guide

This guide will help you set up a modern React project using **Vite** and **Tailwind CSS** (v4+) with the official Vite plugin.

---

## 1. **Create a New React Project with Vite**

Open your terminal and run:

npm create vite@latest my-react-app -- --template react


- Replace `my-react-app` with your desired project name.
- Follow the prompts to select the React template.

Navigate into your project folder:

cd my-react-app


Install the project dependencies:

npm install

---

## 2. **Install Tailwind CSS and the Vite Plugin**

Install both `tailwindcss` and the official Vite plugin:

npm install tailwindcss @tailwindcss/vite

---

## 3. **Configure Vite to Use the Tailwind Plugin**

Edit your `vite.config.js` (or `vite.config.ts`) and add the plugin:

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
plugins: [
react(),
tailwindcss(),
],
});

---

## 4. **Add Tailwind to Your CSS**

In your main CSS file (commonly `src/index.css` or `src/style.css`), add:

@import "tailwindcss";

Or, if you prefer the classic directives (also supported):

@tailwind base;
@tailwind components;
@tailwind utilities;

---

## 5. **(Optional) Tailwind Config File**

For most projects, you do **not** need to manually run `npx tailwindcss init -p` unless you want to customize the default configuration.

If you want to customize Tailwind (themes, plugins, etc.), you can still run:

npx tailwindcss init

Then edit `tailwind.config.js` as needed. For example, to specify which files Tailwind should scan:

module.exports = {
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}"
],
theme: {
extend: {},
},
plugins: [],
}

---

## 6. **Import Your CSS in Your Entry File**

Make sure your CSS file is imported in your main entry file (`main.jsx` or `main.tsx`):

import './index.css';

---

## 7. **Start the Development Server**

Run the following command to start your app:

npm run dev

---

## 📝 **Notes**

- **No need for manual PostCSS or Autoprefixer setup:** The Vite plugin handles this automatically.
- **Test your setup:** Add Tailwind classes (e.g., `className="text-3xl font-bold underline"`) in your components to verify everything is working.

---

You now have a fully functional React + Vite + Tailwind CSS project!
