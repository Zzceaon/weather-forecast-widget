const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-md">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      <p className="text-white/90 text-lg">正在获取天气数据...</p>
    </div>
  );
};

export default LoadingSpinner;
