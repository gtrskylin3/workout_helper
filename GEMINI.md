# Project: Workout Helper

This project is a local-first web application designed to guide users through pre-defined workouts. It tracks workout history, calculates workout streaks, and operates fully offline, storing all data in the browser's `localStorage`.

## Key Technologies

*   **Frontend:** HTML, CSS, Alpine.js
*   **Data:** JSON for workout definitions and `localStorage` for user data.
*   **Server:** None. This is a purely client-side application.

## Project Structure

The application follows a simple, static web project structure.

*   `index.html`: The main entry point of the application.
*   `css/style.css`: Main stylesheet.
*   `js/`: Contains the application logic, separated into modules for handling the workout, timer, storage, and streak calculations.
*   `data/workouts.json`: Contains the definitions for the different workouts (e.g., Workout A, Workout B).
*   `techspec.md`: The technical specification document.
*   `workout.json`: The JSON file containing the workout data.

## How to Run

1.  There is no build process.
2.  Open the `index.html` file in a web browser to start the application.

## Development Conventions

*   The application state and user data are managed through `localStorage`. The following keys are used:
    *   `workout-history`: Stores a log of all completed workouts.
    *   `workout-stats`: Stores aggregate statistics (e.g., total workouts).
    *   `workout-streak`: Stores data for calculating the current workout streak.
*   Workout definitions are read from `workout.json`.
*   The application logic is intended to be modular, as outlined in the `techspec.md`.
*   The application should be installable as a Progressive Web App (PWA).
