const StatsCard = ({ title, value, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    indigo: "bg-indigo-100 text-indigo-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "book":
        return "📚";
      case "copy":
        return "📖";
      case "check":
        return "✓";
      case "people":
        return "👥";
      case "swap_horiz":
        return "🔄";
      case "warning":
        return "⚠️";
      default:
        return "?";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}
        >
          <span className="text-xl">{getIcon(icon)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
