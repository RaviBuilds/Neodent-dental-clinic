# Neodent Dental Hospitals Website

A premium, conversion-focused dental clinic website built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server (runs on http://localhost:5173)
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Type Checking

```bash
# Run TypeScript type checking
npm run typecheck
```

## 📁 Project Structure

```
neodent-dental-hospitals/
├── public/
│   ├── attached_assets/     # All clinic images and photos
│   ├── banner.jpg
│   ├── doctor.jpg
│   └── favicon.svg
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Radix UI components
│   │   └── error-boundary.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global CSS and Tailwind imports
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 (beta)
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod

## 🖼️ Assets

All clinic images are stored in `public/attached_assets/` and are served from the root path `/attached_assets/`.

## 📦 Key Features

- Premium editorial design with authentic clinic photography
- Responsive across mobile, tablet, and desktop
- Accessible with semantic HTML and ARIA labels
- Google rating integration (4.3/259 reviews)
- Lead capture modal on scroll
- Appointment booking form
- WhatsApp integration
- Interactive image gallery
- Smooth scroll animations

## 🌐 Deployment

The project is ready for deployment on any static hosting platform:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop the `dist` folder
- **GitHub Pages**: Push `dist` to gh-pages branch

Build output is in the `dist/` directory after running `npm run build`.

## 📄 License

Private - © 2026 Neodent Dental Hospitals
