"use client";

import { useState } from "react";
import styles from "./Home.module.css"; 

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError("Please enter your city.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/weather?query=${city}`);
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.message || "An error occurred while fetching weather data.");
      }
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather App</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.input}
          aria-label="City Name"
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Fetching..." : "Get Weather"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {weather && (
        <div className={styles.weatherContainer}>
          <h2 className={styles.weatherTitle}>Weather in {weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
