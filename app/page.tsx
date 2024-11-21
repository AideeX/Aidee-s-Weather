'use client';

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import AppSkeleton from "./ui/Skeleton";

interface WeatherData {
  city: string;
  description: string;
  temperature: number;
  icon: string;
  time: string;
  sunrise: string;
  sunset: string;
}

interface CitySuggestion {
  name: string;
  country: string;
}

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [backgroundClass, setBackgroundClass] = useState<string>("bg-default");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatTime = (timestamp: number, offset: number): string =>
    new Date(timestamp * 1000 + offset).toLocaleTimeString();

  const fetchCitySuggestions = async (query: string) => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!apiKey || query.trim() === "") return;

    try {
      const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
      const response = await fetch(geocodeURL);

      if (response.ok) {
        const data = await response.json();
        setCitySuggestions(
          data.map((city: any) => ({
            name: city.name,
            country: city.country,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to fetch city suggestions:", err);
    }
  };

  const fetchWeather = async () => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!apiKey) {
      setError("API key is missing. Please check your environment variables.");
      return;
    }

    if (city.trim() === "") {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    setIsLoading(true);

    try {
      const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
      const geocodeResponse = await fetch(geocodeURL);

      if (!geocodeResponse.ok) {
        if (geocodeResponse.status === 429) {
          setError("API limit reached. Please try again later.");
        } else {
          setError("Failed to fetch city details. Please try again.");
        }
        return;
      }

      const geocodeData = await geocodeResponse.json();
      if (!geocodeData.length) {
        setError("City not found. Please check the spelling.");
        return;
      }

      const { lat, lon } = geocodeData[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const weatherResponse = await fetch(weatherURL);

      if (!weatherResponse.ok) {
        setError("Failed to fetch weather data. Please try again.");
        return;
      }

      const weatherData = await weatherResponse.json();
      const timezoneOffset = weatherData.timezone * 1000;

      const sunriseTime = formatTime(weatherData.sys.sunrise, timezoneOffset);
      const sunsetTime = formatTime(weatherData.sys.sunset, timezoneOffset);

      setWeatherData({
        city: weatherData.name,
        description: weatherData.weather[0].description,
        temperature: Math.round(weatherData.main.temp - 273.15),
        icon: weatherData.weather[0].icon,
        time: new Date(
          Date.now() + timezoneOffset - new Date().getTimezoneOffset() * 60000
        ).toLocaleTimeString("en-US", { timeZone: "UTC" }),
        sunrise: sunriseTime,
        sunset: sunsetTime,
      });

      setBackgroundClass(
        weatherData.weather[0].description.toLowerCase().includes("cloud")
          ? "bg-cloudy"
          : weatherData.weather[0].description.toLowerCase().includes("rain")
          ? "bg-rainy"
          : "bg-clear"
      );

      setError(null);
      setIsModalOpen(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setCitySuggestions([]); // Clear suggestions after fetching weather
    }
  };

  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    fetchCitySuggestions(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") fetchWeather();
  };

  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    setCity(`${suggestion.name}, ${suggestion.country}`);
    setCitySuggestions([]); // Clear suggestions after selection
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCity("");
    setWeatherData(null);
    setError(null);
    setBackgroundClass("bg-default");
  };

  return (
    <>
      {isLoading ? (
        <AppSkeleton />
      ) : (
        <div
          className={`min-h-screen p-6 flex flex-col items-center justify-center ${backgroundClass}`}
          style={{ backgroundColor: "#28343B", color: "#4A4A4A" }}
        >
          <main className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h1
              className="text-3xl font-bold mb-4 text-center"
              style={{ color: "#512DA8" }}
            >
              Aidee's Weather Report
            </h1>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={handleCityInput}
                onKeyDown={handleKeyDown}
                className="flex-1 p-3 border rounded-md focus:ring focus:ring-purple-200 focus:outline-none w-full"
                aria-label="City name"
                style={{ borderColor: "#673AB7", color: "#4A4A4A" }}
              />
              {citySuggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto rounded-md shadow-lg z-10">
                  {citySuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestion.name}, {suggestion.country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={fetchWeather}
              className="p-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 focus:ring focus:ring-purple-200 w-full"
              aria-label="Search for weather"
            >
              Search
            </button>
            {error && (
              <p className="text-red-500 text-center mt-4" role="alert">
                {error}
              </p>
            )}
          </main>

          {isModalOpen && weatherData && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              role="dialog"
              aria-labelledby="weatherModal"
            >
              <div
                className="bg-white rounded-lg p-6 relative shadow-lg w-11/12 max-w-lg"
                style={{ color: "#4A4A4A" }}
              >
                <button
                  className="absolute top-3 right-3"
                  onClick={closeModal}
                  aria-label="Close weather details"
                >
                  <IoClose className="text-2xl text-gray-600 hover:text-gray-800" />
                </button>
                <div
                  className="flex flex-col items-center text-center gap-4"
                  id="weatherModal"
                >
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
                    alt={weatherData.description}
                    className="w-20 h-20"
                  />
                  <h2
                    className="text-2xl font-semibold"
                    style={{ color: "#512DA8" }}
                  >
                    {weatherData.city}
                  </h2>
                  <p>
                    <strong>Temp:</strong> {weatherData.temperature}°C
                  </p>
                  <p>
                    <strong>Condition:</strong> {weatherData.description}
                  </p>
                  <p>
                    <strong>Local Time:</strong> {weatherData.time}
                  </p>
                  <p>
                    <strong>Sunrise:</strong> {weatherData.sunrise}
                  </p>
                  <p>
                    <strong>Sunset:</strong> {weatherData.sunset}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
