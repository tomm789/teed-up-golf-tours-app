# Teed Up Golf Tours - Combined Project

This is the unified React/TypeScript application combining the homepage and tour detail functionality from both original projects.

## Features

### Homepage
- Hero section with slideshow of tour destinations
- Interactive tour carousel with navigation
- Feature blocks highlighting company benefits
- Newsletter subscription form
- Responsive design with mobile optimization

### Tour Pages
- Detailed tour information with hero images
- Day-by-day itinerary with interactive day selector
- Pricing and booking information
- FAQ section
- Host information
- Similar tours recommendations
- Interactive modals for detailed information

### Technical Features
- React 18 with TypeScript
- React Router for navigation
- Zustand for state management
- Framer Motion for animations
- Tailwind CSS with custom design system
- Error boundaries and loading states
- Responsive design
- SEO-friendly structure

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd combined-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── layout/                # Header, Footer, Navigation
│   ├── homepage/              # Homepage-specific components
│   ├── tour/                  # Tour page-specific components
│   └── shared/                # Shared components (Modal, ErrorBoundary, etc.)
├── pages/
│   ├── HomePage.tsx           # Main homepage
│   ├── TourPage.tsx           # Individual tour page
│   └── LuxuryPage.tsx         # Luxury variant
├── data/
│   ├── types/                 # TypeScript interfaces
│   ├── tours.ts               # Tour data
│   ├── days.ts                # Itinerary data
│   ├── modals.ts              # Modal content
│   └── similar.ts             # Similar tours
├── hooks/
│   └── useStore.ts            # State management
├── lib/
│   └── utils.ts               # Utility functions
├── styles/
│   └── globals.css            # Global styles with design system
├── App.tsx                    # Main app component with routing
└── main.tsx                   # Entry point
```

## Design System

The project uses a unified design system with CSS custom properties:

- `--tu-navy`: Primary navy color (#1f2230)
- `--tu-ink`: Dark ink color (#232635)
- `--tu-gold`: Accent gold color (#c9c39a)
- `--tu-warmgray`: Light warm gray (#f4f4f2)
- `--tu-white`: Pure white (#ffffff)

## Routing

- `/` - Homepage
- `/tour/:slug` - Individual tour pages
- `/luxury` - Luxury tours page

## State Management

The application uses Zustand for state management with two main stores:

- `useAppStore`: Global app state (selected day, active modal, loading states)
- `useTourStore`: Tour-specific state (tours list, current tour, etc.)

## WordPress Integration

The project is designed to integrate with WordPress as a headless CMS. The data structure is prepared for:

- Custom post types for tours
- Custom fields for pricing, itinerary, etc.
- REST API integration
- Media management through WordPress

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## Deployment

The built application can be deployed to any static hosting service such as:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new components
3. Update tests if applicable
4. Ensure responsive design
5. Test on multiple browsers

## License

This project is proprietary to Teed Up Golf Tours.

