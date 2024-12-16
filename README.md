# PWA Burton On Trent - Member Management System

A comprehensive member management system built for PWA Burton On Trent, designed to handle member registrations, collector management, payments, and administrative tasks.

## Table of Contents

- [Installation Guide](#installation-guide)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Application Structure](#application-structure)
- [Troubleshooting](#troubleshooting)
- [Development Guidelines](#development-guidelines)

## Installation Guide

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- Git

### Standard Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pwa-burton
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Failsafe Installation Options

If you encounter issues with the standard installation, try these alternatives:

1. **Clean Installation**
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

2. **Using Legacy Peer Dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Force Resolution**
```bash
npm install --force
```

4. **Using Specific Node Version**
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js v18
nvm install 18
nvm use 18

# Install dependencies
npm install
```

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **React Router DOM** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Lucide React** - Icon library
- **Recharts** - Chart visualization

### Backend (Supabase)
- **PostgreSQL** - Database
- **Row Level Security** - Data access control
- **Edge Functions** - Serverless functions
- **Auth** - Authentication and authorization
- **Storage** - File storage

## Features

### 1. Authentication System
- Email-based authentication
- Role-based access control (Member, Collector, Admin)
- Password reset functionality
- Session management

### 2. Member Management
- Member registration and profile management
- Family member/dependant tracking
- Member status tracking
- Member number generation system
- Document management

### 3. Collector Management
- Collector assignment and tracking
- Member-collector relationship management
- Collector performance monitoring
- Territory management

### 4. Financial Management
- Payment tracking and processing
- Payment history
- Financial reporting
- Expense tracking

### 5. Administrative Features
- User role management
- System-wide analytics
- Database management tools
- Backup and restore functionality

### 6. Support System
- Ticket management
- Response tracking
- Priority management
- Support history

## Application Structure

### Core Components

1. **Admin Layout**
   - Dashboard
   - Members management
   - Collectors management
   - Database management
   - Finance management
   - Support system

2. **Member Components**
   - Registration forms
   - Profile management
   - Payment history
   - Document upload

3. **Collector Components**
   - Member assignment
   - Collection tracking
   - Performance metrics

### Database Schema

The application uses a comprehensive database schema with the following main tables:
- members
- collectors
- payments
- family_members
- support_tickets
- registrations
- profiles
- admin_notes

## Troubleshooting

### Common Issues and Solutions

1. **Authentication Issues**
   - Clear browser cache and cookies
   - Check email verification status
   - Verify correct credentials

2. **Database Connection Issues**
   - Verify Supabase connection settings
   - Check RLS policies
   - Confirm API keys are correct

3. **Build Issues**
   - Clear npm cache
   - Update dependencies
   - Check TypeScript errors

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Implement proper error handling
- Use React Query for data fetching
- Implement proper loading states

### Testing
- Write unit tests for utilities
- Test components in isolation
- Verify database operations
- Test authentication flows

### Security
- Implement proper authentication checks
- Use RLS policies
- Sanitize user inputs
- Handle sensitive data properly

## Deployment

The application can be deployed using various methods:

1. **Using Lovable**
   - Visit [Lovable](https://lovable.dev/projects/5018a081-4446-4e2b-9eb8-d6f0d7535c2a)
   - Click on Share -> Publish

2. **Custom Domain Setup**
   - Currently not supported directly through Lovable
   - Can be deployed to Netlify for custom domain support
   - Follow [Custom domains documentation](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## Support

For support and questions:
1. Check the documentation
2. Contact system administrators
3. Submit a support ticket through the application
4. Visit our [Discord community](https://discord.gg/your-discord)

## License

This project is proprietary software. All rights reserved.