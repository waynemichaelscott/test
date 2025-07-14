# World Clock Feature Implementation Plan

**GitHub Issue**: [#2 - Implement world clock feature on the homepage](https://github.com/waynemichaelscott/test/issues/2)

## Requirements
1. Display time for London, New York, and Paris
2. Auto-update every second
3. Provide both digital and analog clock displays
4. Allow users to toggle between digital and analog views

## Technical Approach

### Component Structure
```
src/
├── components/
│   └── WorldClock/
│       ├── WorldClock.tsx        # Main component
│       ├── WorldClock.css        # Styles
│       ├── DigitalClock.tsx     # Digital clock display
│       ├── AnalogClock.tsx      # Analog clock display
│       └── WorldClock.test.tsx  # Unit tests
```

### Implementation Steps

1. **Create WorldClock Component**
   - Main container that manages state for clock type (digital/analog)
   - Handles time updates using setInterval
   - Manages timezone conversions for the three cities

2. **Digital Clock Component**
   - Display time in HH:MM:SS format
   - Show city name and timezone
   - Update every second

3. **Analog Clock Component**
   - SVG-based clock face
   - Hour, minute, and second hands
   - City label

4. **Timezone Handling**
   - London: Europe/London (GMT/BST)
   - New York: America/New_York (EST/EDT)
   - Paris: Europe/Paris (CET/CEST)
   - Use JavaScript's Intl.DateTimeFormat for timezone conversion

5. **Toggle Feature**
   - Button or switch to toggle between views
   - Maintain state in WorldClock component
   - Smooth transition between views

### Key Technical Decisions

1. **No external dependencies**: Use native JavaScript Date and Intl APIs for timezone handling
2. **React hooks**: useState for toggle state, useEffect for interval management
3. **CSS modules**: Keep styles scoped to components
4. **Accessibility**: Ensure ARIA labels for screen readers

### Testing Strategy

1. **Unit Tests**
   - Test timezone conversion accuracy
   - Test clock updates every second
   - Test toggle functionality
   - Test component rendering

2. **Visual Testing with Puppeteer**
   - Verify clocks display correctly
   - Test toggle functionality
   - Ensure auto-update works

### Potential Challenges

1. **Timezone handling**: Daylight saving time transitions
2. **Performance**: Updating 3 clocks every second
3. **Analog clock math**: Calculating hand positions from time

### Success Metrics

- All three clocks display correct time for their timezones
- Clocks update smoothly every second
- Toggle between digital/analog works seamlessly
- No performance issues or memory leaks
- All tests pass