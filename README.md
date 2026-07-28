# 🚀 SEOpenSEO - Free & Open AI-Powered SEO Intelligence Platform

**SEOpenSEO** is an open-source, AI-driven SEO analysis and web diagnostic platform designed to replace expensive subscription tools with actionable, real-time search engine optimization insights.

Powered by **Google Gemini AI**, **Express**, and **React 19**, SEOpenSEO inspects target web pages live, performs technical SEO audits, analyzes keywords, detects content gaps, generates schema markup, and delivers competitive SERP intelligence.

---

## ✨ Features & Capabilities

- 🔍 **AI Technical Site Audit**: Scrapes live page HTML structure (meta tags, headings, canonicals, robots, OpenGraph, structured data) and synthesizes AI recommendations.
- 🔑 **Keyword Research & Search Intent**: Discovers high-volume keyword opportunities, search intent classification (Informational, Transactional, Navigational, Commercial), and long-tail suggestions.
- 📊 **SERP Competitive Analysis**: Evaluates organic competitors, ranking factors, title/meta optimizations, and ranking difficulty scores.
- 🔗 **Backlink Discovery & Matrix**: Pinpoints high-authority link acquisition targets and internal linking opportunities.
- 📝 **Content Gap & Optimization Tool**: Identifies missing topics, semantic entity coverage, and readability metrics for on-page content.
- ⚙️ **JSON-LD Schema Markup Builder**: Automatically generates structured data (Article, Product, Organization, FAQ, LocalBusiness) compliant with Google standards.
- ⚡ **Core Web Vitals & Speed Diagnostics**: Evaluates performance bottlenecks, mobile responsiveness, and render-blocking resources.
- 💰 **Google AdSense Ready**: Configured with publisher entry (`ca-pub-3493593869359820`), auto-ads scripts, and built-in ad placement slots.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Motion](https://motion.dev/), [Lucide React](https://lucide.dev/)
- **Backend**: [Node.js](https://nodejs.org/), [Express 4](https://expressjs.com/), [Cheerio](https://cheerio.js.org/)
- **AI Engine**: [Google Gen AI SDK (`@google/genai`)](https://www.npmjs.com/package/@google/genai)
- **Bundler & Runtime**: [Vite](https://vitejs.dev/), [esbuild](https://esbuild.github.io/), [tsx](https://github.com/privatenumber/tsx)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js**: v18 or later
- **npm** or **bun** / **yarn**
- **Google Gemini API Key**: Obtainable from [Google AI Studio](https://aistudio.google.com/)

---

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/SEOpenSEO.git
   cd SEOpenSEO
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and add your Gemini API Key:
   ```bash
   cp .env.example .env
   ```

   Update `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

---

## 💻 Development & Building

### Run in Development Mode
Starts the Express server with live TypeScript compilation and Vite middleware:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Production Build
Bundles client static assets using Vite and builds the server entry into `dist/server.cjs` via esbuild:
```bash
npm run build
```

### Start Production Server
Runs the standalone compiled server:
```bash
npm run start
```

---

## 🐳 Deployment (Cloud Run / Docker)

SEOpenSEO includes built-in container health check endpoints for Cloud Run, Kubernetes, or Docker orchestration:

- `GET /health` -> Returns `200 OK`
- `GET /api/health` -> Returns `{ "status": "ok" }`

When deploying to Google Cloud Run or standard container environments, configure your container port to bind to `PORT` (default `3000`).

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
