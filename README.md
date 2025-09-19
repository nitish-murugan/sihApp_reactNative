# Energy Monitoring App

A React Native application for monitoring energy systems including meters, solar panels, and wind turbines with support ticket management.

## Features

- **Dashboard**: Overview of all energy systems with quick stats and alerts
- **Live Monitoring**: Real-time meter readings with all electrical parameters
- **Solar Monitoring**: Solar panel performance tracking with efficiency metrics
- **Wind Monitoring**: Wind turbine monitoring with wind speed and direction
- **Support Tickets**: Create and manage support tickets for issues

## Tech Stack

- React Native with Expo
- React Navigation (Bottom Tabs)
- Expo Vector Icons
- Linear Gradients
- Modern UI with attractive design

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
- Install Expo Go app on your phone
- Scan the QR code displayed in the terminal
- Or use `npm run android` / `npm run ios` for emulators

## App Structure

```
src/
├── screens/
│   ├── HomeScreen.js      # Dashboard with overview
│   ├── LiveScreen.js      # Real-time meter readings
│   ├── SolarScreen.js     # Solar panel monitoring
│   ├── WindScreen.js      # Wind turbine monitoring
│   └── TicketsScreen.js   # Support ticket management
```

## Features Overview

### Home Screen
- Quick stats cards for total energy, active meters, solar/wind output
- System status overview
- Recent alerts and notifications

### Live Monitoring
- Real-time data for 4 meters
- Parameters: Voltage, Current, Power, Energy, Power Factor, Frequency, Harmonics
- Pull-to-refresh functionality
- Status indicators for each meter

### Solar Monitoring
- Solar panel array monitoring
- Parameters: Voltage, Current, Power, Temperature, Efficiency, Irradiance
- Performance indicators and efficiency tracking
- Summary statistics

### Wind Monitoring
- Wind turbine monitoring
- Parameters: Voltage, Current, Power, Wind Speed, Direction, Rotor Speed
- Wind condition categorization
- Efficiency tracking

### Support Tickets
- View all support tickets with filtering by status
- Create new tickets with priority levels
- Ticket details including ID, description, status, date/time
- Modal-based ticket creation interface

## UI Design

The app features a modern, professional design with:
- Gradient headers for each section
- Card-based layouts for data display
- Color-coded parameters and status indicators
- Responsive design for different screen sizes
- Smooth animations and transitions

## Mock Data

The app currently uses mock data for demonstration purposes. In a production environment, this would be replaced with real API calls to fetch live data from energy monitoring systems.

## Future Enhancements

- Real-time data integration with IoT devices
- Charts and graphs for historical data
- Push notifications for alerts
- User authentication and role management
- Export functionality for reports
- Offline data caching 