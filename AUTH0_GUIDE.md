# Auth0 Integration Guide for FIGS Dubai

This guide provides instructions for setting up and using Auth0 authentication in the FIGS Dubai application.

## Setup Steps

### 1. Install Auth0 Dependencies

```bash
npm install @auth0/auth0-spa-js
```

### 2. Create Auth0 Application

1. Sign up/login at [https://manage.auth0.com/](https://manage.auth0.com/)
2. Create a new Application:
   - Go to "Applications" → "Create Application"
   - Name: "FIGS Dubai"
   - Choose "Single Page Web Application"
   - Click "Create"

### 3. Configure Auth0 Application Settings

In your Auth0 application settings:

1. Add Allowed Callback URLs:
   ```
   http://localhost:3000
   https://your-production-domain.com
   ```

2. Add Allowed Logout URLs:
   ```
   http://localhost:3000
   https://your-production-domain.com
   ```

3. Add Allowed Web Origins:
   ```
   http://localhost:3000
   https://your-production-domain.com
   ```

4. Save changes

### 4. Environment Variables

Create a `.env` file in your project root with the following Auth0 settings:

```
# Auth0 Configuration
REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_AUDIENCE=https://api.yourapp.com
REACT_APP_AUTH0_REDIRECT_URI=http://localhost:3000

# API Configuration
REACT_APP_API_URL=http://localhost:5000/api/v1
```

Replace the placeholder values with your actual Auth0 application values.

## Usage Instructions

### Logging In

1. Navigate to the Auth0 login page at `/auth0-login`
2. Click the "Log In with Auth0" button
3. You'll be redirected to Auth0's login page
4. After successful authentication, you'll be redirected back to your application

### Protected Routes

The application uses a `ProtectedRoute` component to secure routes that require authentication:

```jsx
<Route path="/profile" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
} />
```

Users who are not authenticated will be redirected to the login page.

### User Profile

The Auth0Profile component displays user information from Auth0:

- Profile picture
- Name
- Email
- Auth0 user ID
- Email verification status

### API Authentication

The application automatically sends the Auth0 access token with API requests:

1. Auth0 token is obtained when the user logs in
2. API interceptor adds the token to the Authorization header of each request
3. Backend can validate the token against Auth0

## Troubleshooting

### Login Issues

- Check browser console for errors
- Verify Auth0 domain and client ID are correct in the environment variables
- Ensure the callback URLs are correctly configured in Auth0 dashboard

### API Authentication Issues

- Check if token is being correctly included in API requests (look in browser's network tab)
- Verify token expiration (access tokens typically expire after 24 hours)
- Check if your backend is configured to validate Auth0 tokens

## Further Customization

### Social Logins

Enable social connections in your Auth0 dashboard:
1. Go to "Authentication" → "Social"
2. Choose providers (Google, Facebook, etc.)
3. Follow provider-specific setup instructions

### Multi-Factor Authentication (MFA)

Enable MFA for additional security:
1. Go to "Security" → "Multi-factor Auth"
2. Enable and configure MFA settings

### Customizing the Login Page

Auth0 provides options to customize the appearance of the login page:
1. Go to "Branding" → "Universal Login"
2. Customize colors, logo, and other branding elements 