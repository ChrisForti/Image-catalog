# Nautical Carpentry Knowledge Base

A comprehensive SOP (Standard Operating Procedure) documentation system for marine carpentry, built with Node.js/Express backend and React/TypeScript/Tailwind frontend.

## Features

### 🔧 Technical SOP Library

- **Location-Based Documentation**: Record techniques specific to boat locations (e.g., "High-moisture/Head", "Exterior/Aft Deck")
- **Material-Specific Instructions**: Document joinery and fastening methods for different materials (Teak, Mahogany, Marine Plywood)
- **Hardware Applications**: Track why specific hardware was chosen and how to install it
- **Step-by-Step Instructions**: Detailed build instructions with Markdown support
- **Master Search**: Query across Hardware Name + Material + Location combinations

### 📸 General Gallery

- Browse completed projects and work samples
- Simple image-based documentation
- Category and tag organization

### 🎯 Key Capabilities

- **Toggle Mode**: Switch between "General Gallery" and "Technical SOP" modes
- **Required Fields**: Technical SOP enforces Location, Material, and Technique Instructions
- **Image Upload**: High-resolution photos of installations
- **Technical Cards**: Rich UI displaying application specs, logic, and instructions
- **Advanced Search**: Filter by material, location, hardware, and free text

## Tech Stack

### Backend

- **Node.js** + **Express**: REST API server
- **TypeScript**: Type-safe backend code
- **Drizzle ORM**: Type-safe database interactions
- **PostgreSQL**: Production-ready relational database
- **Zod**: Runtime validation
- **Multer**: File upload handling

### Frontend

- **React 18**: Modern UI framework
- **TypeScript**: Type-safe frontend code
- **Vite**: Fast development and build tool
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Markdown**: Render markdown instructions
- **Lucide React**: Beautiful icons

## Project Structure

```
image-catalog/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   ├── schema.ts          # Drizzle schema definitions
│   │   │   └── index.ts           # Database connection
│   │   └── index.ts               # Express server & API routes
│   ├── drizzle.config.ts          # Drizzle configuration
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── index.ts           # API client functions
    │   ├── components/
    │   │   ├── Forms.tsx          # Technical SOP & Gallery forms
    │   │   ├── TechnicalCard.tsx  # Technical card display
    │   │   ├── GalleryCard.tsx    # Gallery item display
    │   │   └── MasterSearch.tsx   # Advanced search component
    │   ├── pages/
    │   │   ├── TechniquesPage.tsx # Technical SOP page
    │   │   └── GalleryPage.tsx    # Gallery page
    │   ├── types/
    │   │   └── index.ts           # TypeScript interfaces
    │   ├── App.tsx                # Main app component
    │   ├── main.tsx               # React entry point
    │   └── index.css              # Tailwind styles
    ├── index.html
    ├── vite.config.ts
    ├── tailwind.config.js
    └── package.json
```

## Database Schema

### Techniques Table

```typescript
{
  id: number
  title: string                    // e.g., "Blum Hinge Installation - Teak Cabinet"
  description?: string

  // Core SOP Fields (Required)
  locationContext: string          // e.g., "High-vibration area", "High-moisture/Head"
  material: string                 // e.g., "Teak", "Mahogany", "Marine Plywood"
  applicationLogic: string         // WHY this hardware was chosen
  techniqueDetails: string         // Step-by-step instructions (Markdown)

  // Additional Fields
  customerSpecs?: string           // Customer requirements
  materialConstraints?: string     // Grain orientation, screw depth notes
  hardwareName?: string            // e.g., "Blum Hinge", "Southco Latch"
  hardwarePart?: string            // Part numbers
  imageUrl?: string                // High-res installation photo
  tags?: string                    // JSON array for searchability

  createdAt: timestamp
  updatedAt: timestamp
}
```

### Gallery Items Table

```typescript
{
  id: number
  title: string
  description?: string
  imageUrl: string
  category?: string
  tags?: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

## API Endpoints

### Techniques (Technical SOP)

- `GET /api/techniques` - Get all techniques (with optional search params)
- `GET /api/techniques/:id` - Get single technique
- `POST /api/techniques` - Create new technique
- `PUT /api/techniques/:id` - Update technique
- `DELETE /api/techniques/:id` - Delete technique

### Gallery

- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get single item
- `POST /api/gallery` - Create new item
- `PUT /api/gallery/:id` - Update item
- `DELETE /api/gallery/:id` - Delete item

### Utilities

- `POST /api/upload` - Upload image
- `GET /api/health` - Health check

### Search Parameters

```typescript
{
  search?: string      // Full-text search
  material?: string    // Filter by material
  location?: string    // Filter by location
  hardware?: string    // Filter by hardware name
}
```

## Installation & Setup

### Quick Start with Docker (Recommended)

The easiest way to run the application:

```bash
# Start all services (PostgreSQL, Backend, Frontend)
docker-compose up
```

Access at http://localhost:3000

See [DOCKER.md](DOCKER.md) for complete Docker documentation.

### Manual Installation

#### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- PostgreSQL 14+ installed and running

### PostgreSQL Setup

1. Create a new PostgreSQL database:

```bash
# Using psql
createdb nautical_carpentry

# Or using psql command
psql -U postgres
CREATE DATABASE nautical_carpentry;
\q
```

2. Note your connection details for the `.env` file.

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Edit `.env` and update the `DATABASE_URL`:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/nautical_carpentry
```

Replace `username`, `password`, and database name with your PostgreSQL credentials.

5. Generate and run database migrations:

```bash
npm run db:generate
npm run db:migrate
```

6. Create uploads directory:

```bash
mkdir uploads
```

7. Start development server:

```bash
npm run dev
```

Backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Development

### Running Both Servers

You can run both backend and frontend simultaneously in separate terminals:

**Terminal 1 (Backend):**

```bash
cd backend && npm run dev
```

**Terminal 2 (Frontend):**

```bash
cd frontend && npm run dev
```

### Building for Production

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## Usage Guide

### Creating a Technical SOP

1. Navigate to "Technical SOPs" tab
2. Click "Add Technique"
3. Fill in required fields:
   - **Title**: Descriptive name for the technique
   - **Location Context**: Where this is used on the boat
   - **Material**: What material you're working with
   - **Application Logic**: WHY you chose this approach
   - **Technique Details**: Step-by-step instructions (Markdown supported)
4. Optionally add:
   - Hardware name and part number
   - Material constraints
   - Customer specifications
   - Installation photo
   - Tags for searchability
5. Click "Save Technique"

### Searching Techniques

Use the Master Search to find techniques by:

- **Free text**: Search across all fields
- **Material filter**: Find all techniques for a specific material
- **Location filter**: Find techniques for specific boat locations
- **Hardware filter**: Find all uses of a specific hardware piece

Example: Search for "Blum Hinge" + "Teak" + "Upper Galley Cabinet"

### Viewing Technical Cards

Technical Cards display:

- High-resolution installation photo
- Application specs sidebar (Location, Material, Customer Specs)
- Why this hardware was chosen (Application Logic)
- Material constraints and warnings
- Full step-by-step build instructions
- Tags and metadata

## Design Decisions

### Why This Architecture?

1. **PostgreSQL + Drizzle**: Production-ready relational database with type-safe ORM - scalable for teams and multi-user deployments
2. **TypeScript Everywhere**: End-to-end type safety catches errors at compile time
3. **Tailwind CSS**: Rapid UI development with consistent design system
4. **Vite**: Fast hot-reload during development, optimized production builds
5. **Monorepo Structure**: Backend and frontend in same repo for easier development

### Form Toggle Logic

The form enforces different validation rules based on mode:

- **Technical SOP Mode**: Requires Location, Material, and Technique Details
- **Gallery Mode**: Only requires Title and Image

This is implemented in the respective form components with clear visual indicators.

## Future Enhancements

Potential improvements:

- [ ] User authentication and multi-user support
- [ ] PDF export of technical SOPs
- [ ] Print-friendly layouts for shop use
- [ ] Additional image attachments per technique
- [ ] Video upload support
- [ ] Version history for techniques
- [ ] Comments and annotations
- [ ] Mobile app version
- [ ] Cloud backup integration
- [ ] Advanced reporting and analytics

## License

MIT

## Author

Built for marine carpenters who need to document and share their craft knowledge.
