# Google Analytics Setup for UniMoney

## Overview
Google Analytics has been implemented across the entire UniMoney website to track user behavior, page views, and interactions.

## Configuration

### Environment Variables
The Google Analytics tracking ID is stored in `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-4RX4RQJEG4
```

### Implementation Details

#### 1. Core Setup (`pages/_document.tsx`)
- Google Analytics script is loaded globally
- Only loads when GA ID environment variable is present
- Uses environment variable for tracking ID configuration

#### 2. Page View Tracking (`pages/_app.tsx`)
- Automatically tracks page views on route changes
- Tracks initial page load
- Uses Next.js router events for seamless tracking

#### 3. Utility Functions (`utils/gtag.ts`)
Provides helper functions for:
- `pageview(url)` - Track page views
- `event()` - Send custom events
- `trackButtonClick()` - Track button interactions
- `trackFormSubmission()` - Track form submissions
- `trackInteraction()` - Track general interactions

## Usage Examples

### Track Button Clicks
```tsx
import * as gtag from '../utils/gtag'

<button onClick={() => {
  gtag.trackButtonClick('CTA Button', 'Hero Section')
  // Your button logic here
}}>
  Click Me
</button>
```

### Track Form Submissions
```tsx
const handleSubmit = (e) => {
  e.preventDefault()
  gtag.trackFormSubmission('Contact Form')
  // Your form logic here
}
```

### Track Custom Events
```tsx
gtag.event({
  action: 'download',
  category: 'engagement',
  label: 'PDF Guide',
  value: 1
})
```

## What's Being Tracked

### Automatic Tracking
- Page views on all pages
- Route changes within the application
- Session data and user behavior
- Basic user demographics (if enabled in GA)

### Custom Tracking (Currently Implemented)
- **Hero Section**: 
  - "Compare Loans" button clicks
  - "Join Waitlist" button clicks
- **Waitlist Form**: 
  - Form submissions
  - Conversion events for signups

### Available for Implementation
- Navigation menu clicks
- Document downloads
- Video interactions
- Scroll depth tracking
- Search interactions

## Production vs Development
- Google Analytics only loads in production environment (`NODE_ENV === 'production'`)
- Development environment skips tracking to avoid test data pollution
- Use `gtag.isGAEnabled` to check if tracking is active

## Adding More Tracking

To track additional interactions:

1. Import the gtag utility:
```tsx
import * as gtag from '../utils/gtag'
```

2. Add tracking to your event handlers:
```tsx
const handleClick = () => {
  gtag.trackButtonClick('Button Name', 'Section Name')
  // Your existing logic
}
```

3. For custom events:
```tsx
gtag.event({
  action: 'custom_action',
  category: 'engagement',
  label: 'description',
  value: 1
})
```

## Viewing Analytics Data

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your UniMoney property (G-4RX4RQJEG4)
3. View real-time data, audience reports, and custom events

### Key Reports to Monitor

- **Real-time**: See live user activity
- **Audience**: Demographics and user behavior
- **Acquisition**: How users find your site
- **Behavior**: Page performance and user flow
- **Conversions**: Goal completions and events

## Key Metrics to Monitor

- **Page Views**: Which pages are most popular
- **User Sessions**: How long users stay on site
- **Bounce Rate**: Pages where users leave quickly
- **Conversion Events**: Waitlist signups, form submissions
- **User Flow**: How users navigate through the site
- **Demographics**: Age, location, device type of visitors

## Event Categories Used

### Current Events
- **engagement**: Button clicks, interactions
- **form**: Form submissions
- **interaction**: General user interactions

### Suggested Additional Events
- **navigation**: Menu clicks, internal links
- **media**: Video plays, image views
- **download**: Document downloads
- **search**: Search queries and results

## Privacy Considerations

- Google Analytics is configured to respect user privacy
- No personally identifiable information (PII) is tracked
- Data is processed according to Google's privacy policies
- Consider adding a cookie consent banner if required by law (GDPR/CCPA)
- You can enable IP anonymization in GA settings if needed

## Security

- GA tracking ID is public (safe to expose in client-side code)
- No sensitive data is transmitted to Google Analytics
- Events are anonymized by default
- Environment variables protect configuration management

## Troubleshooting

### Analytics Not Working?
1. Check that `NEXT_PUBLIC_GA_ID` is set in `.env.local`
2. Verify you're testing in production mode:
   ```bash
   npm run build
   npm start
   ```
3. Check browser console for any JavaScript errors
4. Use Google Analytics Real-Time view to see immediate data
5. Verify the tracking ID format: `G-XXXXXXXXXX`

### Testing Events
1. Open Google Analytics Real-Time > Events
2. Interact with tracked elements on your site
3. Events should appear within seconds in the dashboard
4. Use browser dev tools to check if `gtag` function is available

### Common Issues
- **No data in development**: This is expected - analytics only works in production
- **Events not showing**: Check that the component is properly importing and calling gtag functions
- **Page views not tracked**: Ensure router events are properly set up in `_app.tsx`

## Performance Impact

- Google Analytics is loaded asynchronously and doesn't block page rendering
- Scripts are only loaded when GA ID is present
- Tracking calls are lightweight and don't impact user experience
- Production-only loading prevents development performance impact

## Future Enhancements

Consider implementing:
1. **Enhanced E-commerce tracking** for loan applications
2. **Custom dimensions** for user segmentation
3. **Goal funnels** for conversion optimization
4. **A/B testing integration** with Google Optimize
5. **Cross-domain tracking** if expanding to subdomains
6. **Server-side tracking** for more accurate data

## Compliance

- Ensure compliance with local privacy laws (GDPR, CCPA, etc.)
- Consider implementing cookie consent management
- Review Google Analytics data retention settings
- Document data collection practices in privacy policy
- Provide opt-out mechanisms if required by law