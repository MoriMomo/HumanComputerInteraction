# 🌟 Aura Link ModuSnap

A modular tactical/tech carry system landing page built with React, Three.js, and cutting-edge web technologies.

---

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animation**: GSAP + Lenis (smooth scroll)
- **Icons**: React Icons

---

## 📁 Project Structure

```
src/
├── components/
│   ├── 3D/                      # Three.js components
│   │   └── Loader3D.jsx
│   ├── ErrorBoundary.jsx        # Error handling
│   ├── FeatureCards.jsx
│   ├── Hero3D.jsx               # 3D showcase
│   ├── HeroSection.jsx
│   ├── ModularCustomizer.jsx
│   ├── DesignPhilosophy.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── constants/                   # Centralized constants
│   ├── colors.js               # Color palette
│   └── index.js                # All constants
├── hooks/                      # Custom React hooks
│   ├── useWebGLSupport.js
│   ├── useGsap.js
│   └── index.js
├── utils/                      # Utility functions
│   ├── threeHelpers.js         # 3D utilities
│   └── index.js
├── pages/
│   └── Home.jsx
├── App.jsx
├── main.jsx
└── index.css

.agent/skills/                  # 1000+ AI Assistant Skills
public/models/                  # 3D models
```

---

## 🎯 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Features

- ✅ **Interactive 3D Product Showcase** - WebGL-powered 3D model viewer
- ✅ **Material Customizer** - Real-time material/color selection
- ✅ **Smooth Scrolling** - Lenis-powered scroll experience
- ✅ **Responsive Design** - Mobile-first Tailwind CSS
- ✅ **Tech-Noir Aesthetic** - Cyberpunk-inspired design system
- ✅ **Performance Optimized** - Lazy loading, code splitting ready

---

## 📚 Documentation

- **[IMPROVEMENTS.md](IMPROVEMENTS.md)** - Recent code quality improvements
- **[HERO3D-REFACTOR.md](HERO3D-REFACTOR.md)** - Guide to refactoring 3D components
- **[SKILLS-GUIDE.md](SKILLS-GUIDE.md)** - How to use AI skills for development

---

## 🎨 Design System

### Color Palette
```javascript
Deep Black:     #050505  (background)
Electric Cyan:  #00FAFF  (primary)
Neon Mint:      #39FF14  (accent)
Charcoal:       #1A1A1A  (surface)
```

### Typography
- Font Family: Inter (UI), JetBrains Mono (code)
- Responsive scale with Tailwind

### Components
- Glass morphism effects
- Neon glow accents
- Smooth transitions (0.3s default)

---

## 🛠️ Development

### Code Quality
- Follow React best practices
- Use centralized constants from `src/constants/`
- Custom hooks in `src/hooks/`
- Utilities in `src/utils/`

### Tailwind Best Practices
- Use design tokens from config
- Avoid dynamic class strings
- Prefer constants for color classes

### 3D Development
- Always wrap in Suspense with loader
- Use ErrorBoundary for WebGL failures
- Optimize textures and geometry
- Preload models when possible

---

## 🤖 AI-Assisted Development

This project includes 1000+ AI assistant skills in `.agent/skills/`.

### Quick Commands
```bash
# Update skills
.\update-skills.ps1

# Use with GitHub Copilot
"Use @react-patterns to review my components"
"Use @threejs-skills to optimize 3D rendering"
"Use @clean-code to suggest improvements"
```

See [SKILLS-GUIDE.md](SKILLS-GUIDE.md) for complete usage guide.

---

## 📦 Recommended Next Steps

### Immediate
- [ ] Break down Hero3D.jsx into smaller components
- [ ] Add PropTypes or migrate to TypeScript
- [ ] Install GSAP via npm (instead of CDN)

### Short-term
- [ ] Add unit tests (Vitest + Testing Library)
- [ ] Implement lazy loading for routes
- [ ] Add E2E tests (Playwright)
- [ ] Set up Storybook

### Long-term
- [ ] Migrate to TypeScript
- [ ] Add shopping cart functionality
- [ ] Implement user authentication
- [ ] Add product configurator 3D tool

---

## 🧪 Testing

```bash
# Install testing tools
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Run tests (when added)
npm test
```

---

## 🚀 Deployment

```bash
# Build
npm run build

# Preview
npm run preview

# Output directory
dist/
```

Deploy to:
- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- Any static hosting

---

## 🤝 Contributing

1. Follow the established folder structure
2. Use constants from `src/constants/`
3. Create custom hooks for reusable logic
4. Add JSDoc comments to functions
5. Check IMPROVEMENTS.md for standards

---

## 📄 License

[Your License Here]

---

## 🙏 Acknowledgments

- Built with skills from [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills)
- Powered by React Three Fiber
- Styled with Tailwind CSS

---

**Made with ⚡ for urban tech professionals**
