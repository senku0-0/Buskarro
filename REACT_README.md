# Buskarro React Frontend

This document describes the React.js implementation for the Buskarro Bus Reservation System.

## Overview

The Buskarro frontend has been converted to use React.js for a modern, component-based UI architecture while maintaining the Django backend.

## Architecture

- **Backend**: Django REST Framework (existing)
- **Frontend**: React.js 18.2.0 with React Router
- **Build Tool**: Webpack 5
- **Styling**: CSS with existing Buskarro design system

## Project Structure

```
Buskarro/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── Header.css
│   │   │   ├── Footer.js
│   │   │   └── Footer.css
│   │   ├── pages/            # Page components
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── Registration.js
│   │   │   ├── Registration.css
│   │   │   ├── SignIn.js
│   │   │   ├── SignIn.css
│   │   │   ├── Booking.js
│   │   │   ├── Booking.css
│   │   │   ├── UserPanel.js
│   │   │   ├── AdminPanel.js
│   │   │   ├── Contact.js
│   │   │   └── About.js
│   │   ├── App.js            # Main app component with routing
│   │   ├── App.css
│   │   └── index.js          # React entry point
│   └── public/
│       └── index.html        # HTML template
├── static/react/             # Built React bundle
│   ├── bundle.js
│   └── bundle.js.LICENSE.txt
├── templates/
│   └── react_index.html      # Django template for React app
├── package.json              # Node.js dependencies
├── webpack.config.js         # Webpack configuration
└── .babelrc                  # Babel configuration
```

## Features Implemented

### Components

1. **Header Component**
   - Navigation bar with company branding
   - User authentication status display
   - Dropdown menu for logged-in users
   - Responsive design

2. **Footer Component**
   - Company information
   - Quick links
   - Responsive layout

### Pages

1. **Home Page**
   - Search interface for buses (From, To, When)
   - City autocomplete functionality
   - Location swap feature
   - Features showcase with animations
   - Date picker with validation

2. **Registration Page**
   - User registration form
   - Password validation
   - Error handling

3. **Sign In Page**
   - User login functionality
   - Error messages
   - Redirect to dashboard after login

4. **Booking Page**
   - Display search criteria
   - Bus listing (placeholder)

5. **User Panel**
   - User dashboard (placeholder)

6. **Admin Panel**
   - Admin dashboard (placeholder)

7. **Contact & About Pages**
   - Information pages

## Setup Instructions

### Prerequisites
- Node.js (v20.x or higher)
- npm (v10.x or higher)
- Python 3.x
- Django 5.x

### Installation

1. Install Node.js dependencies:
```bash
npm install
```

2. Build the React application:
```bash
npm run build
```

3. The build process will generate:
   - `/static/react/bundle.js` - Bundled React application
   - `/templates/react_index.html` - HTML template with React root

### Development

For development with hot reloading:
```bash
npm run dev
```

For production build:
```bash
npm run build
```

## Accessing the React Application

The React application is accessible at:
```
http://your-domain/react/
```

The traditional Django templates remain accessible at their original URLs for backward compatibility.

## Technical Details

### Routing
React Router DOM is used for client-side routing:
- `/` - Home page with search
- `/register` - User registration
- `/signin` - User login
- `/booking` - Bus search results
- `/user-panel` - User dashboard
- `/admin-panel` - Admin dashboard
- `/contact` - Contact page
- `/about` - About page

### State Management
- Local component state using React Hooks (useState, useEffect)
- localStorage for user authentication tokens
- React Router's location state for passing data between routes

### Styling
- CSS modules maintaining the original Buskarro design
- CSS variables for theming (supports dark mode capability)
- Responsive design for mobile and tablet devices

### API Integration
- Axios configured for API calls to Django backend
- CSRF token handling for Django compatibility
- Authentication token management

## Future Enhancements

1. **API Integration**: Connect all pages to Django REST API endpoints
2. **State Management**: Implement Redux or Context API for global state
3. **Testing**: Add Jest and React Testing Library tests
4. **Dark Mode**: Implement theme switcher
5. **Real-time Features**: WebSocket integration for live updates
6. **Progressive Web App**: Add service workers for offline capability
7. **Internationalization**: Multi-language support

## Migration from Traditional Templates

The React application exists alongside the traditional Django templates. To fully migrate:

1. Test all React pages thoroughly
2. Update Django views to return JSON responses
3. Create API endpoints for all functionality
4. Update URL routing to serve React app as default
5. Remove old templates after verification

## Notes

- The React app currently uses placeholder API calls
- Actual backend integration requires Django REST Framework endpoints
- Static files are served by Django's static files system
- Development and production builds use the same entry point
