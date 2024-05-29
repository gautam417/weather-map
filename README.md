# Weather Map Application

This project is a weather map application that allows users to search for a city and view the current weather and 5-day forecast on an interactive map. The application is built using React and Mapbox GL.

## Prerequisites

- Node.js (v14.x.x or v16.x.x)
- npm (v6.x.x or v7.x.x)

## Getting Started

Follow these instructions to set up and run the project on your local machine.


### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory of the project and add your Mapbox and OpenWeatherMap API keys:

```
REACT_APP_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
REACT_APP_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

### Run the Application

```bash
npm start
```

This will start the development server and open the application in your default web browser at `http://localhost:3000`.

## Usage

1. Enter a city name in the search bar and click the "Search" button.
2. The map will update to show the location of the city, along with the current weather and 5-day forecast.
3. Use the "Play" button to start the 5-day forecast animation, which will display weather changes at 3-hour increments.
4. Use the "Change Temperature" button to toggle between Celsius and Fahrenheit.

## Dependencies

- React
- React Map GL
- Axios
- Mapbox GL JS

## Troubleshooting

If you encounter issues, make sure you have the correct versions of Node.js and npm installed. You can check your versions by running:

```bash
node -v
npm -v
```

For any other issues, please refer to the console output for error messages and debugging information.

## Node Version

This project has been tested with Node.js v14.x.x and v16.x.x. Using other versions of Node.js may result in compatibility issues.
