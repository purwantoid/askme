# AskMe - AI-Powered Price Comparison Platform

A conversational AI platform that helps customers find and compare product prices based on their location. Built with Laravel 12 and React 18, AskMe provides ChatGPT-style price inquiry through intelligent location-based comparisons.

![AskMe Platform](public/images/askme-platform.png)

## Key Features

### 🤖 Conversational AI Interface
- ChatGPT-style chat experience for natural price inquiries
- Multi-session chat management for organized conversations
- Streaming responses for real-time interaction

### 📍 Location-Based Intelligence
- Automatic location detection and filtering
- Geographic price comparisons from nearby retailers
- Privacy-conscious location handling

### 💰 Intelligent Price Analysis
- LLM-powered product price research
- Comparative analysis across multiple sources
- Real-time pricing data integration

### 🎨 Modern User Experience
- Light/dark mode support with smooth transitions
- Fully responsive design for all devices
- Accessible interface following WCAG guidelines
- Built with Shadcn/ui design system

## Technology Stack

### Core Architecture
- **Backend**: [Laravel](https://laravel.com/) 12.x with PHP 8.3+
- **Frontend**: [React](https://react.dev/) 18 with [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **SPA Integration**: [Inertia.js](https://inertiajs.com/) v2 for seamless Laravel-React communication
- **Database**: MySQL with optimized indexing for location-based queries

### Key Dependencies
- **UI Framework**: [Shadcn/ui](https://ui.shadcn.com) (Radix UI + Tailwind CSS v3.4)
- **State Management**: [React Query v5.63](https://tanstack.com/query) for server state
- **Form Handling**: [React Hook Form v7.54](https://react-hook-form.com) + [Zod v3.24](https://zod.dev)
- **Development Tools**: [Vite](https://vitejs.dev), [Laravel Boost](https://laravel-boost.dev)
- **Code Quality**: [ESLint](https://eslint.org), [Prettier](https://prettier.io), [Laravel Pint](https://laravel.com/docs/pint)

### AI & Integration (Planned)
- LLM API integration for conversational price queries
- Geolocation services for location-based filtering
- Real-time price data synchronization

## Installation & Setup

### Prerequisites
- PHP 8.3 or higher
- Node.js 18+ and npm/bun
- MySQL database
- Composer

### Installation Steps

1. **Clone the repository**
```bash
git clone [repository-url]
cd askme
```

2. **Install dependencies**
```bash
# PHP dependencies
composer install

# JavaScript dependencies
npm install
```

3. **Environment configuration**
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database connection in .env
# Set up any required API keys
```

4. **Database setup**
```bash
# Run migrations
php artisan migrate

# (Optional) Seed with sample data
php artisan db:seed
```

5. **Start development servers**
```bash
# Start both frontend and backend servers
composer run dev

# Alternative: Start servers separately
# npm run dev (frontend)
# php artisan serve (backend)
```

6. **Access the application**
Open your browser and visit `http://localhost:8000`

## Development Workflow

### Development Guidelines
This project follows comprehensive development standards documented in `CLAUDE.md`. Key practices include:

- **Laravel Boost Integration**: All development tasks must use Laravel Boost tools for debugging and enhancement
- **Spec-Driven Development**: New features follow the specification workflow in `.claude/specs/`
- **Code Quality Standards**: Laravel Pint (PHP), ESLint & Prettier (TypeScript/React)
- **Testing Approach**: PHPUnit for backend, feature tests preferred over unit tests

### Project Structure
The codebase follows Laravel 12's streamlined structure with React/TypeScript frontend:

```
app/Http/Controllers/     # Feature controllers
app/Models/              # Eloquent models  
resources/js/pages/      # Inertia page components
resources/js/components/ # Reusable React components
routes/                  # Laravel route definitions
```

See `.claude/steering/structure.md` for complete organization guidelines.

### Development Commands
```bash
# Code formatting
vendor/bin/pint           # Format PHP code
npm run lint             # Lint TypeScript/React
npm run format           # Format with Prettier

# Testing
php artisan test         # Run PHP tests
npm run test            # Run JavaScript tests (if configured)

# Development server
composer run dev        # Full-stack development server
```

## Project Roadmap

### Phase 1: Core Platform ✅ *In Progress*
- [x] Authentication and user management system
- [x] Theme-aware responsive UI foundation
- [ ] Multi-session chat interface
- [ ] Basic LLM integration for price queries
- [ ] Location-based price filtering

### Phase 2: Advanced Features *Planned*
- Enhanced price comparison algorithms
- Real-time pricing updates
- Mobile optimization
- Advanced analytics dashboard
- Chat conversation persistence

### Phase 3: Expansion *Future*
- API for third-party integrations
- Premium features for power users
- Merchant partnerships
- Advanced recommendation engine
- Multi-language support

### Contributing
This project uses a spec-driven development workflow. To contribute:

1. Check existing specifications in `.claude/specs/`
2. Follow development guidelines in `CLAUDE.md`
3. Use Laravel Boost for all development and debugging tasks
4. Ensure all code follows the established conventions in `.claude/steering/`

For detailed contribution guidelines, see the project's steering documents.



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*For detailed development guidelines, see [CLAUDE.md](CLAUDE.md)*  
*For project specifications, see [.claude/specs/](.claude/specs/)*  
*For architectural decisions, see [.claude/steering/](.claude/steering/)*
