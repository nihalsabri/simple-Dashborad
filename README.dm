# SpaceX Payload & Events Dashboard

A web application that visualizes SpaceX payload data and event history using interactive charts and tables. This project fetches real-time data from the SpaceX API and provides users with insights into payload types and historical events.

## Features 🚀

Payload Data Visualization: Displays payload details in a table and pie chart.

Events History Analysis: Visualizes the number of SpaceX events per year in a line chart.

Interactive Filters: Users can filter payloads by type.

Dynamic Navigation: Users can switch between "Payload" and "Events History" sections.

Highcharts Integration: Charts are rendered using the Highcharts library.

## Technologies Used 🛠️

HTML, CSS, JavaScript: For frontend structure and styling.

Fetch API: For retrieving data from the SpaceX API.

Highcharts.js: For data visualization.

Event Handling: JavaScript event listeners for interactive navigation

## How It Works 🎯

### Payload Data

Fetches SpaceX payload data from https://api.spacexdata.com/v4/payloads.

Populates a dropdown menu with unique payload types.

Displays selected payloads in a table and pie chart.

### Event History

Fetches SpaceX event history from https://api.spacexdata.com/v4/history.

Organizes events by year and visualizes them in a line chart.
