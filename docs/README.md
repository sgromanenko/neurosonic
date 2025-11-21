# Brain.fm Clone - Documentation

This directory contains all project documentation. Start here to understand the system architecture, tech decisions, and implementation guidelines.

## 📚 Documentation Index

### Project Overview
- **[project_requirements.md](./project_requirements.md)** - Product vision, key features, and success criteria
- **[tech_stack.md](./tech_stack.md)** - Technologies, frameworks, and libraries used
- **[file_structure.md](./file_structure.md)** - Monorepo layout and naming conventions

### Architecture & Design
- **[backend_structure.md](./backend_structure.md)** - API architecture, endpoints, authentication, and database schema
- **[frontend_guidelines.md](./frontend_guidelines.md)** - UI/UX rules, component patterns, and styling approach
- **[app_flow.md](./app_flow.md)** - User journey from onboarding to playback

### Development
- **[system_prompts.md](./system_prompts.md)** - AI assistant guidelines and behavioral expectations
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and feature timeline

## 🎯 Quick Start

**New to the project?** Read in this order:
1. [project_requirements.md](./project_requirements.md) - Understand what we're building
2. [tech_stack.md](./tech_stack.md) - Learn the technologies
3. [file_structure.md](./file_structure.md) - Navigate the codebase
4. [backend_structure.md](./backend_structure.md) + [frontend_guidelines.md](./frontend_guidelines.md) - Dive into implementation

**Adding a feature?** Check:
- `app_flow.md` - Does this fit the user journey?
- `backend_structure.md` - Which API endpoint to use/create?
- `frontend_guidelines.md` - Follow the UI patterns

## 📝 Keeping Docs Updated

**When to update:**
- ✅ Added/removed a major feature → Update `CHANGELOG.md` + relevant docs
- ✅ Changed tech stack → Update `tech_stack.md`
- ✅ Modified user flow → Update `app_flow.md`
- ✅ Architectural changes → Update `backend_structure.md` or `frontend_guidelines.md`

**How to update:**
1. Make your code changes
2. Update the relevant doc(s)
3. Add entry to `CHANGELOG.md`
4. Check off "Update Documentation" in `task.md`
