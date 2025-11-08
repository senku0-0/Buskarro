# Testing Guide for React Frontend

## Manual Testing Steps

### 1. Build the React Application
```bash
npm run build
```

Expected output:
- `static/react/bundle.js` - JavaScript bundle
- `templates/react_index.html` - HTML template

### 2. Start Django Development Server
```bash
python manage.py runserver
```

### 3. Access the React Application
Navigate to: `http://localhost:8000/react/`

### 4. Test Each Page

#### Home Page (`/`)
- [ ] Search form displays correctly
- [ ] "From" input shows autocomplete suggestions
- [ ] "To" input shows autocomplete suggestions
- [ ] Swap button switches From and To values
- [ ] Date picker works and validates minimum date (today)
- [ ] Search button navigates to booking page with parameters
- [ ] Features section displays with animations
- [ ] Header navigation works
- [ ] Footer links are present

#### Registration Page (`/register`)
- [ ] All form fields display correctly
- [ ] Password validation works (minimum 8 characters)
- [ ] Confirm password validation works
- [ ] Error messages display for validation failures
- [ ] Link to Sign In page works

#### Sign In Page (`/signin`)
- [ ] Username and password fields display
- [ ] Form submission works
- [ ] Link to Registration page works
- [ ] Success message displays if coming from registration

#### Booking Page (`/booking`)
- [ ] Page displays search criteria (From, To, Date)
- [ ] Header and footer display correctly
- [ ] Redirects to home if no search criteria

#### User Panel (`/user-panel`)
- [ ] Page displays with header and footer
- [ ] Welcome message shows username

#### Admin Panel (`/admin-panel`)
- [ ] Page displays with header and footer
- [ ] Admin dashboard placeholder shows

#### Contact Page (`/contact`)
- [ ] Page displays with header and footer

#### About Page (`/about`)
- [ ] Page displays with header and footer

### 5. Test Responsive Design
Test on different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### 6. Test Navigation
- [ ] All React Router links work without page reload
- [ ] Browser back/forward buttons work correctly
- [ ] Direct URL access works for all routes

### 7. Test User Flow
Complete user journey:
1. Visit home page
2. Click Register
3. Fill registration form
4. Sign in with credentials
5. Search for buses
6. View booking page
7. Access user panel
8. Logout

## Browser Compatibility
Test in:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Known Limitations
1. API endpoints are placeholders - actual backend integration needed
2. Authentication uses localStorage - should be replaced with proper token management
3. No actual bus data - needs Django API connection
4. Payment integration not yet implemented
5. Email notification not connected

## Performance Checks
- [ ] Bundle size is reasonable (<300KB)
- [ ] Page loads quickly (<2 seconds)
- [ ] No console errors in browser
- [ ] Animations are smooth

## Security Considerations
- [ ] CSRF token handling for form submissions
- [ ] XSS prevention in user inputs
- [ ] Secure authentication token storage
- [ ] Input validation on client side

## Next Steps for Full Integration
1. Create Django REST API endpoints for all operations
2. Update React components to call real APIs
3. Implement proper authentication with JWT
4. Add error handling for API failures
5. Add loading states for async operations
6. Implement real-time updates if needed
