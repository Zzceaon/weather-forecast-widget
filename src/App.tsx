import WeatherForecast from "./components/WeatherForecast";

const App: React.FC = () => {
  return (
    <WeatherForecast
      apiHost="YOUR_API_HOST" // Replace with your QWeather API Host
      apiKey="YOUR_API_KEY" // Replace with your QWeather API Key
    />
  );
};

export default App;
