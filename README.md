# Aidee's Weather Report

Aidee's Weather Report is a simple React application that allows users to fetch and display weather information for a specified city. The app uses the OpenWeatherMap API to retrieve weather data and displays it in a user-friendly interface.

## Features

- Fetch weather data for a specified city
- Display city name, temperature, weather condition, local time, sunrise, and sunset times
- Responsive design
- Error handling for various scenarios (e.g., missing API key, city not found, API limit reached)
- Loading skeleton while fetching data
- Modal to display detailed weather information

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- OpenWeatherMap API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AideeX/Aidee-s-Weather
   cd weather-app

2.  Install dependencies:

`npm install`

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key. You can get the API key by signing up [here](https://openweathermap.org/api):
   

`NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here`


4. Start the development server:

`npm run dev`

5.  Open your browser and navigate to http://localhost:3000.

#### Usage

1. Enter the name of the city you want to get weather information for in the input field.
2. Press the "Enter" key or click the "Search" button.
3. The app will fetch and display the weather information for the specified city.
4. If there is an error (e.g., city not found, API limit reached), an error message will be displayed.
5. Click on the weather details to open a modal with more detailed information.
6. Click the close button (X) in the modal to close it.

##### License
This project is licensed under the MIT License. See the LICENSE file for details.

##### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
