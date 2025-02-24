# Space Insights

## Overview
Space Insights is a web application that provides real-time and historical space weather data. It features a dashboard displaying the latest astronomy picture of the day (APOD) and notifications from NASA's DONKI API. Users can explore detailed analyses of Coronal Mass Ejections (CMEs) and Solar Flares through interactive graphs and data tables.

## Setup Instructions

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/afieif/SpaceInsights.git
   cd SpaceInsights
   ```
2. Install dependencies and run frontend:
   ```sh
   cd frontend && npm run bounce
   ```
3. (In another terminal) Install dependencies and run backend:
   ```sh
   cd backend && npm run bounce
   ```

The application will be available at:
```
http://localhost:5173
```

## Screenshots

### Home Page
Dashboard displaying space weather events and the Astronomy Picture of the Day.


https://github.com/user-attachments/assets/e8fb4670-623a-48d3-9795-9bd94dc83c80




### CME Analysis Page
Graphical representation of Coronal Mass Ejection data.


https://github.com/user-attachments/assets/ff24713a-f02d-42a5-9396-bed162d41bbf




### Solar Flare Analysis Page
Graphical representation of Solar Flare data.
  ![image](https://github.com/user-attachments/assets/d50ee31d-7040-40e3-8877-746df304dea7)


## Bonus Features Implemented
- **User Interactivity**:
  - Search functionality for notifications.
  - Filtering CME and Solar Flare data by date.
  - Sorting CME and Solar Flare data tables by various fields.
- **Responsive Design**:
  - Optimized for different screen sizes.
- **Performance Enhancements**:
  - Implemented in-memory caching on the backend to improve response times.

