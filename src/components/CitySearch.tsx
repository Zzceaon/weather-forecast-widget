interface CitySearchProps {
  city: string;
  setCity: (city: string) => void;
  searchHistory: Array<{ name: string; id: string }>;
  onSearch: (e: React.FormEvent) => void;
  onHistoryClick: (name: string, id: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({
  city,
  setCity,
  searchHistory,
  onSearch,
  onHistoryClick,
}) => {
  return (
    <div className="w-full max-w-md relative">
      <form onSubmit={onSearch} className="flex gap-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="输入城市（如：上海）"
          className="flex-1 p-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl backdrop-blur-md border-2 border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          搜索
        </button>
      </form>
      <div className="mt-2 flex flex-wrap gap-2">
        {searchHistory.map((item) => (
          <button
            key={item.id}
            onClick={() => onHistoryClick(item.name, item.id)}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitySearch;
