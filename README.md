# 🚀 AutoDev Squad

AI-powered multi-agent development workspace built using React, TypeScript, Supabase, and Edge Functions.

AutoDev Squad is an intelligent developer collaboration platform designed to automate workflows, manage AI agents, generate outputs, and provide a modern dashboard experience for software teams and hackathon projects.

👉 [Click here to view demo](https://drive.google.com/file/d/1iYSFYvbL0PDZBvxathAioR-SYDsuBzbn/view?usp=drivesdk)
---

# 🌟 Features

## 🤖 AI Agent Workflow
- Multi-agent architecture
- Real-time AI output panel
- Workflow timeline visualization
- Agent orchestration system
- Markdown rendering support

## 🎨 Modern Frontend
- React + TypeScript
- TailwindCSS UI
- Responsive dashboard
- Sidebar navigation system
- Reusable UI components

## ☁️ Backend & Infrastructure
- Supabase integration
- Edge Functions support
- Authentication-ready architecture
- Database migration support
- Scalable cloud backend

## 📊 Dashboard System
- Workspace management
- Saved projects page
- Interactive agent cards
- Loading animations
- Modular layouts

---

# 🛠️ Tech Stack

## Frontend
- React
- TypeScript
- Vite
- TailwindCSS

## Backend
- Supabase
- Supabase Edge Functions
- PostgreSQL

## Development Tools
- ESLint
- npm
- Git & GitHub

---

# 📂 Project Structure

```bash
src/
│
├── components/
│   ├── agents/
│   ├── layout/
│   └── ui/
│
├── lib/
│   ├── api.ts
│   ├── agents.ts
│   └── supabase.ts
│
├── pages/
│   ├── DashboardPage.tsx
│   ├── LandingPage.tsx
│   ├── SavedProjectPage.tsx
│   └── WorkspacePage.tsx
│
├── types/
│
└── main.tsx
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AutoDev-Squad.git
```

## 2️⃣ Navigate into the Project

```bash
cd AutoDev-Squad
```

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

# 🧩 Running the Project

## Start Development Server

```bash
npm run dev
```

Project will run at:

```bash
http://localhost:5173
```

---

# 🗄️ Database Setup

Run Supabase migrations:

```bash
supabase db push
```

Example schema:

```sql
create table profiles (
  id uuid references auth.users(id) primary key,
  username text unique,
  created_at timestamptz default now()
);
```

---

# ☁️ Supabase Edge Functions

Edge functions are located in:

```bash
supabase/functions/
```

Deploy functions:

```bash
supabase functions deploy autodev-ai
```

---

# 🧠 AI Architecture

The platform follows a modular AI-agent architecture:

- Planner Agent
- Execution Agent
- Output Formatter
- Workflow Tracker
- Dashboard Renderer

Each agent is isolated and communicates through centralized orchestration logic.

---

# 🎨 UI Components

## Core Components
- AgentCard
- GlowCard
- LoadingOrb
- WorkflowTimeline
- MarkdownOutput

## Layout Components
- Sidebar
- AppLayout

---

# 📈 Future Improvements

- Multi-user collaboration
- Real-time WebSocket communication
- AI memory system
- Vector database integration
- RAG pipeline
- Voice-based AI interaction
- Docker deployment
- CI/CD pipelines

---

# 🔒 Security

- Never expose service role keys
- Environment variables stored securely
- Row Level Security (RLS) support
- Supabase authentication integration

---

# 🤝 Contributing

Contributions are welcome.

## Steps

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

AutoDev Squad Team

---

# ⭐ Support

If you found this project useful:
- Star the repository
- Share the project
- Contribute improvements

---

# 🚀 Vision

AutoDev Squad aims to become a next-generation AI-powered software engineering workspace capable of orchestrating autonomous development workflows using collaborative AI agents.
