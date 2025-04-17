import { WeatherData } from "types";

interface WeatherCardProps {
  day: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ day }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col items-center space-y-3">
      <p className="text-xl font-semibold">
        {new Date(day.fxDate).toLocaleDateString("zh-CN", {
          weekday: "short",
          month: "numeric",
          day: "numeric",
        })}
      </p>
      <i className={`qi-${day.iconDay} text-4xl`}></i>
      <p className="text-lg text-white/90">{day.textDay}</p>
      <p className="text-2xl font-bold">
        {day.tempMin}°C - {day.tempMax}°C
      </p>
      <div className="text-sm text-white/80 space-y-1">
        <p>降水量: {day.precip}mm</p>
        <p>湿度: {day.humidity}%</p>
        <p>风向: {day.windDirDay}</p>
        <p>风力: {day.windScaleDay}级</p>
      </div>
    </div>
  );
};

export default WeatherCard;
