import { useState, useEffect } from "react";

interface WeatherData {
  temp: number;
  location: string;
  condition: string;
  loading: boolean;
  error: string | null;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 0,
    location: "Loading...",
    condition: "clear",
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // Use reverse geocoding to get city name
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const geoData = await geoRes.json();
        const city = geoData.address.city || geoData.address.town || geoData.address.village || "Unknown";

        // Get Weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const weatherData = await weatherRes.json();

        const temp = Math.round(weatherData.current_weather.temperature);
        const code = weatherData.current_weather.weathercode;

        let condition = "clear";
        if (code >= 1 && code <= 3) condition = "cloudy";
        if (code >= 45 && code <= 48) condition = "foggy";
        if (code >= 51 && code <= 67) condition = "rainy";
        if (code >= 71 && code <= 77) condition = "snowy";
        if (code >= 80 && code <= 82) condition = "rainy";
        if (code >= 95) condition = "stormy";

        setWeather({
          temp,
          location: city,
          condition,
          loading: false,
          error: null,
        });
      } catch (err) {
        setWeather((prev) => ({
          ...prev,
          loading: false,
          error: "Weather error",
        }));
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setWeather((prev) => ({
            ...prev,
            loading: false,
            error: "Location denied",
          }));
        }
      );
    } else {
      setWeather((prev) => ({
        ...prev,
        loading: false,
        error: "Not supported",
      }));
    }
  }, []);

  return weather;
};
