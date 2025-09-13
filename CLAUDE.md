# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AskMe is an AI-powered price comparison platform built with Laravel 12 and React 18. It provides a ChatGPT-style conversational interface for users to inquire about product prices based on their location.

### Technology Stack

- **Backend**: Laravel 12 (PHP 8.3+)
- **Frontend**: React 18 with TypeScript (strict mode)
- **SPA Integration**: Inertia.js v2
- **Database**: SQLite (default), MySQL supported
- **UI Framework**: Shadcn/ui (Radix UI + Tailwind CSS v3)
- **State Management**: React Query v5.63 + Jotai for client state
- **Form Handling**: React Hook Form v7.54 + Zod v3.24
- **Build Tool**: Vite 6.2
- **Package Manager**: npm (Node.js 18+)

## Development Commands

### Installation & Setup
```bash
# Clone and install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database setup
php artisan migrate
php artisan db:seed  # Optional sample data
```

### Development Servers
```bash
# Start all development servers (recommended)
composer run dev
# This runs: server, queue, logs, and vite concurrently

# Alternative: Start servers individually
php artisan serve       # Backend server (port 8000)
npm run dev            # Frontend development server
php artisan queue:listen --tries=1  # Queue worker
php artisan pail --timeout=0        # Log viewer
```

### Code Quality & Testing
```bash
# PHP code formatting (MUST run before commits)
vendor/bin/pint --dirty

# Run tests
php artisan test                    # All tests
php artisan test --filter=SomeTest # Specific test
php artisan test tests/Feature/     # Feature tests only
php artisan test tests/Unit/        # Unit tests only

# Frontend build
npm run build  # Production build
npm run dev    # Development build with watch
```

### Debugging & Development Tools
```bash
# Laravel Tinker for debugging
php artisan tinker

# Generate application key
php artisan key:generate

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Laravel Boost commands (use MCP tools when available)
# - database-query tool for database queries
# - tinker tool for PHP debugging
# - search-docs tool for documentation
```

## Project Architecture

### Laravel 12 Streamlined Structure
This project uses Laravel 12's modern streamlined file structure:

- **No `app/Http/Middleware/`** - Middleware registered in `bootstrap/app.php`
- **No `app/Console/Kernel.php`** - Console configuration in `bootstrap/app.php` or `routes/console.php`
- **Auto-registered commands** - Files in `app/Console/Commands/` are automatically available
- **Simplified configuration** - Core config in `bootstrap/app.php` and `bootstrap/providers.php`

### Frontend Architecture (React + Inertia)
```
resources/js/
├── app.tsx              # Main application entry point
├── bootstrap.ts         # Bootstrap configuration
├── providers.tsx        # React providers setup
├── components/          # Reusable React components (33+ components)
├── pages/               # Inertia page components (21+ pages)
├── layouts/             # Layout components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
├── context/             # React context providers
├── config/              # Frontend configuration
└── types/               # TypeScript type definitions
```

### Backend Architecture (Laravel)
```
app/
├── Http/
│   ├── Controllers/     # Feature controllers
│   └── Requests/        # Form request validation classes
├── Models/              # Eloquent models
└── Providers/           # Service providers

routes/
├── web.php              # Web routes
├── auth.php             # Authentication routes  
├── dashboard.php        # Dashboard routes
└── console.php          # Console commands

bootstrap/
├── app.php              # Application configuration
└── providers.php        # Service provider registration
```

### Key Architectural Patterns

#### Authentication System
- Laravel Sanctum for API authentication
- Custom authentication routes in `routes/auth.php`
- Inertia-based auth pages in `resources/js/pages/auth/`

#### Form Handling Pattern
- **Backend**: Form Request classes for validation (check existing requests for array vs string rules)
- **Frontend**: React Hook Form + Zod for client-side validation
- **Integration**: Inertia forms with error handling

#### State Management Strategy
- **Server State**: React Query v5.63 for API data, caching, and synchronization
- **Client State**: Jotai for component state management
- **Theme State**: next-themes for light/dark mode persistence

#### Component Architecture
- **Design System**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS v3 with CSS variables for theming
- **Responsive**: Mobile-first approach with dark mode support
- **Accessibility**: WCAG compliance through Radix UI

#### Database Design
- **Default**: SQLite for development (configured in `.env.example`)
- **Production**: MySQL/PostgreSQL support
- **Migrations**: Standard Laravel migrations in `database/migrations/`
- **Relationships**: Eloquent relationships with return type hints

## Development Conventions

### PHP/Laravel Conventions
- **Constructor Property Promotion**: Use PHP 8 syntax `public function __construct(public Service $service)`
- **Type Declarations**: Always use explicit return types and parameter types
- **Eloquent**: Prefer `Model::query()` over `DB::`, use eager loading to prevent N+1 queries
- **Validation**: Form Request classes over inline validation
- **Configuration**: Use `config()` helper, never `env()` outside config files
- **Testing**: Feature tests preferred over unit tests, use model factories

### Frontend/React Conventions
- **TypeScript**: Strict mode enabled, explicit typing required
- **Components**: Functional components with proper prop typing
- **Hooks**: Custom hooks for reusable logic in `resources/js/hooks/`
- **Styling**: Tailwind classes, use gap utilities over margins for spacing
- **Forms**: React Hook Form + Zod validation schema
- **State**: React Query for server state, Jotai for client state

### Code Style Enforcement
- **PHP**: Laravel Pint (must run `vendor/bin/pint --dirty` before commits)
- **JavaScript/TypeScript**: ESLint + Prettier (configured)
- **CSS**: Tailwind CSS conventions

### Testing Requirements
- Every code change must include corresponding tests
- Run affected tests: `php artisan test --filter=SpecificTest`
- Feature tests for full functionality, unit tests for isolated logic
- Use model factories for test data setup

## Key Development Guidelines

### Laravel Boost Integration
This project uses Laravel Boost MCP server with specialized tools:
- **search-docs**: Search Laravel ecosystem documentation (use before coding)
- **database-query**: Execute database queries for debugging
- **tinker**: Run PHP code in Laravel context
- **list-artisan-commands**: Check available Artisan commands
- **browser-logs**: Read browser console logs for debugging

### Error Handling Strategy
- **Custom Error Pages**: Inertia error components in `resources/js/pages/errors/`
- **Exception Handling**: Configured in `bootstrap/app.php`
- **Development**: `php artisan pail` for real-time log monitoring

### Performance Considerations
- **Frontend**: Vite for fast HMR and optimized builds
- **Backend**: Laravel's built-in caching and optimization
- **Database**: Proper indexing and eager loading for location-based queries
- **Assets**: Optimized image loading and lazy loading patterns

### Security Practices
- **Authentication**: Laravel Sanctum with proper token management
- **CSRF Protection**: Built-in Laravel CSRF middleware
- **Input Validation**: Form Request classes with comprehensive rules
- **Environment**: Sensitive data in `.env`, never committed

## Common Development Tasks

### Creating New Features
1. **Database**: `php artisan make:migration`, `php artisan make:model`
2. **Backend Logic**: `php artisan make:controller`, `php artisan make:request`
3. **Frontend**: Create React components in appropriate directories
4. **Routes**: Add routes to appropriate route files
5. **Tests**: `php artisan make:test --feature FeatureName`

### Debugging Workflow
1. **Backend Issues**: Use `php artisan pail` for logs, `tinker` tool for testing
2. **Frontend Issues**: Browser dev tools, React Query devtools
3. **Database Issues**: Use `database-query` tool or Laravel debugbar
4. **Performance**: Laravel Telescope (if installed), browser performance tools

### Building for Production
```bash
npm run build           # Build frontend assets
composer install --no-dev --optimize-autoloader  # Optimize backend
php artisan config:cache    # Cache configuration
php artisan route:cache     # Cache routes
php artisan view:cache      # Cache views
```

<laravel-boost-guidelines>
=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to enhance the user's satisfaction building Laravel applications.

## Foundational Context
This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.3.10
- inertiajs/inertia-laravel (INERTIA) - v2
- laravel/framework (LARAVEL) - v12
- laravel/prompts (PROMPTS) - v0
- tightenco/ziggy (ZIGGY) - v2
- laravel/pint (PINT) - v1
- react (REACT) - v18
- tailwindcss (TAILWINDCSS) - v3


## Conventions
- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts
- Do not create verification scripts or tinker when tests cover that functionality and prove it works. Unit and feature tests are more important.

## Application Structure & Architecture
- Stick to existing directory structure - don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling
- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `npm run build`, `npm run dev`, or `composer run dev`. Ask them.

## Replies
- Be concise in your explanations - focus on what's important rather than explaining obvious details.

## Documentation Files
- You must only create documentation files if explicitly requested by the user.


=== boost rules ===

## Laravel Boost
- Laravel Boost is an MCP server that comes with powerful tools designed specifically for this application. Use them.

## Artisan
- Use the `list-artisan-commands` tool when you need to call an Artisan command to double check the available parameters.

## URLs
- Whenever you share a project URL with the user you should use the `get-absolute-url` tool to ensure you're using the correct scheme, domain / IP, and port.

## Tinker / Debugging
- You should use the `tinker` tool when you need to execute PHP to debug code or query Eloquent models directly.
- Use the `database-query` tool when you only need to read from the database.

## Reading Browser Logs With the `browser-logs` Tool
- You can read browser logs, errors, and exceptions using the `browser-logs` tool from Boost.
- Only recent browser logs will be useful - ignore old logs.

## Searching Documentation (Critically Important)
- Boost comes with a powerful `search-docs` tool you should use before any other approaches. This tool automatically passes a list of installed packages and their versions to the remote Boost API, so it returns only version-specific documentation specific for the user's circumstance. You should pass an array of packages to filter on if you know you need docs for particular packages.
- The 'search-docs' tool is perfect for all Laravel related packages, including Laravel, Inertia, Livewire, Filament, Tailwind, Pest, Nova, Nightwatch, etc.
- You must use this tool to search for Laravel-ecosystem documentation before falling back to other approaches.
- Search the documentation before making code changes to ensure we are taking the correct approach.
- Use multiple, broad, simple, topic based queries to start. For example: `['rate limiting', 'routing rate limiting', 'routing']`.
- Do not add package names to queries - package information is already shared. For example, use `test resource table`, not `filament 4 test resource table`.

### Available Search Syntax
- You can and should pass multiple queries at once. The most relevant results will be returned first.

1. Simple Word Searches with auto-stemming - query=authentication - finds 'authenticate' and 'auth'
2. Multiple Words (AND Logic) - query=rate limit - finds knowledge containing both "rate" AND "limit"
3. Quoted Phrases (Exact Position) - query="infinite scroll" - Words must be adjacent and in that order
4. Mixed Queries - query=middleware "rate limit" - "middleware" AND exact phrase "rate limit"
5. Multiple Queries - queries=["authentication", "middleware"] - ANY of these terms


=== php rules ===

## PHP

- Always use curly braces for control structures, even if it has one line.

### Constructors
- Use PHP 8 constructor property promotion in `__construct()`.
    - <code-snippet>public function __construct(public GitHub $github) { }</code-snippet>
- Do not allow empty `__construct()` methods with zero parameters.

### Type Declarations
- Always use explicit return type declarations for methods and functions.
- Use appropriate PHP type hints for method parameters.

<code-snippet name="Explicit Return Types and Method Params" lang="php">
protected function isAccessible(User $user, ?string $path = null): bool
{
    ...
}
</code-snippet>

## Comments
- Prefer PHPDoc blocks over comments. Never use comments within the code itself unless there is something _very_ complex going on.

## PHPDoc Blocks
- Add useful array shape type definitions for arrays when appropriate.

## Enums
- Typically, keys in an Enum should be TitleCase. For example: `FavoritePerson`, `BestLake`, `Monthly`.


=== inertia-laravel/core rules ===

## Inertia Core

- Inertia.js components should be placed in the `resources/js/Pages` directory unless specified differently in the JS bundler (vite.config.js).
- Use `Inertia::render()` for server-side routing instead of traditional Blade views.

<code-snippet lang="php" name="Inertia::render Example">
// routes/web.php example
Route::get('/users', function () {
    return Inertia::render('Users/Index', [
        'users' => User::all()
    ]);
});
</code-snippet>


=== inertia-laravel/v2 rules ===

## Inertia v2

- Make use of all Inertia features from v1 & v2. Check the documentation before making any changes to ensure we are taking the correct approach.

### Inertia v2 New Features
- Polling
- Prefetching
- Deferred props
- Infinite scrolling using merging props and `WhenVisible`
- Lazy loading data on scroll

### Deferred Props & Empty States
- When using deferred props on the frontend, you should add a nice empty state with pulsing / animated skeleton.


=== laravel/core rules ===

## Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using the `list-artisan-commands` tool.
- If you're creating a generic PHP class, use `artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

### Database
- Always use proper Eloquent relationship methods with return type hints. Prefer relationship methods over raw queries or manual joins.
- Use Eloquent models and relationships before suggesting raw database queries
- Avoid `DB::`; prefer `Model::query()`. Generate code that leverages Laravel's ORM capabilities rather than bypassing them.
- Generate code that prevents N+1 query problems by using eager loading.
- Use Laravel's query builder for very complex database operations.

### Model Creation
- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `list-artisan-commands` to check the available options to `php artisan make:model`.

### APIs & Eloquent Resources
- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

### Controllers & Validation
- Always create Form Request classes for validation rather than inline validation in controllers. Include both validation rules and custom error messages.
- Check sibling Form Requests to see if the application uses array or string based validation rules.

### Queues
- Use queued jobs for time-consuming operations with the `ShouldQueue` interface.

### Authentication & Authorization
- Use Laravel's built-in authentication and authorization features (gates, policies, Sanctum, etc.).

### URL Generation
- When generating links to other pages, prefer named routes and the `route()` function.

### Configuration
- Use environment variables only in configuration files - never use the `env()` function directly outside of config files. Always use `config('app.name')`, not `env('APP_NAME')`.

### Testing
- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] <name>` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.

### Vite Error
- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run `npm run build` or ask the user to run `npm run dev` or `composer run dev`.


=== laravel/v12 rules ===

## Laravel 12

- Use the `search-docs` tool to get version specific documentation.
- Since Laravel 11, Laravel has a new streamlined file structure which this project uses.

### Laravel 12 Structure
- No middleware files in `app/Http/Middleware/`.
- `bootstrap/app.php` is the file to register middleware, exceptions, and routing files.
- `bootstrap/providers.php` contains application specific service providers.
- **No app\Console\Kernel.php** - use `bootstrap/app.php` or `routes/console.php` for console configuration.
- **Commands auto-register** - files in `app/Console/Commands/` are automatically available and do not require manual registration.

### Database
- When modifying a column, the migration must include all of the attributes that were previously defined on the column. Otherwise, they will be dropped and lost.
- Laravel 11 allows limiting eagerly loaded records natively, without external packages: `$query->latest()->limit(10);`.

### Models
- Casts can and likely should be set in a `casts()` method on a model rather than the `$casts` property. Follow existing conventions from other models.


=== pint/core rules ===

## Laravel Pint Code Formatter

- You must run `vendor/bin/pint --dirty` before finalizing changes to ensure your code matches the project's expected style.
- Do not run `vendor/bin/pint --test`, simply run `vendor/bin/pint` to fix any formatting issues.


=== tailwindcss/core rules ===

## Tailwind Core

- Use Tailwind CSS classes to style HTML, check and use existing tailwind conventions within the project before writing your own.
- Offer to extract repeated patterns into components that match the project's conventions (i.e. Blade, JSX, Vue, etc..)
- Think through class placement, order, priority, and defaults - remove redundant classes, add classes to parent or child carefully to limit repetition, group elements logically
- You can use the `search-docs` tool to get exact examples from the official documentation when needed.

### Spacing
- When listing items, use gap utilities for spacing, don't use margins.

    <code-snippet name="Valid Flex Gap Spacing Example" lang="html">
        <div class="flex gap-8">
            <div>Superior</div>
            <div>Michigan</div>
            <div>Erie</div>
        </div>
    </code-snippet>


### Dark Mode
- If existing pages and components support dark mode, new pages and components must support dark mode in a similar way, typically using `dark:`.


=== tailwindcss/v3 rules ===

## Tailwind 3

- Always use Tailwind CSS v3 - verify you're using only classes supported by this version.


=== tests rules ===

## Test Enforcement

- Every change must be programmatically tested. Write a new test or update an existing test, then run the affected tests to make sure they pass.
- Run the minimum number of tests needed to ensure code quality and speed. Use `php artisan test` with a specific filename or filter.
</laravel-boost-guidelines>