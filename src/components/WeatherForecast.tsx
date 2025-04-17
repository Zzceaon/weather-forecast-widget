import axios from "axios";
import { useEffect, useState } from "react";
import { WeatherData } from "types";
import CitySearch from "./CitySearch";
import DarkModeToggle from "./DarkModeToggle";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import WeatherCard from "./WeatherCard";

interface WeatherForecastProps {
  apiHost: string;
  apiKey: string;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  apiHost,
  apiKey,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [city, setCity] = useState<string>("上海");
  const [locationId, setLocationId] = useState<string>("101020100");
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<
    Array<{ name: string; id: string }>
  >([{ name: "上海", id: "101020100" }]);

  const fetchLocationId = async (cityName: string) => {
    try {
      const response = await axios.get(
        `${apiHost}/geo/v2/city/lookup?location=${encodeURIComponent(
          cityName
        )}&key=${apiKey}`
      );
      const locations = response.data.location;
      if (locations && locations.length > 0) {
        const newLocation = { name: cityName, id: locations[0].id };
        setLocationId(newLocation.id);
        setSearchHistory((prev) => {
          const filtered = prev.filter((item) => item.id !== newLocation.id);
          return [newLocation, ...filtered].slice(0, 5);
        });
        setError(null);
      } else {
        setError("城市未找到");
      }
    } catch (err) {
      console.error("City lookup error:", err);
      setError("获取城市信息失败");
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiHost}/v7/weather/7d?location=${locationId}&key=${apiKey}`
      );
      setWeatherData(response.data.daily);
      setError(null);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("获取天气数据失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [locationId]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchLocationId(city);
    }
  };

  const handleHistoryClick = (name: string, id: string) => {
    setCity(name);
    setLocationId(id);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600"
      } flex flex-col items-center p-6 space-y-8 transition-colors duration-500`}
    >
      <DarkModeToggle
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
        未来七天天气预报
      </h1>
      <CitySearch
        city={city}
        setCity={setCity}
        searchHistory={searchHistory}
        onSearch={handleCitySearch}
        onHistoryClick={handleHistoryClick}
      />
      {error && <ErrorMessage message={error} />}
      {loading && <LoadingSpinner />}
      {!loading && weatherData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl p-4">
          {weatherData.map((day) => (
            <WeatherCard key={day.fxDate} day={day} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
