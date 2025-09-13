import React from "react";
import { X, AlertTriangle, Shield, BarChart3 } from "lucide-react";
import useDashboardStore from "../stores/dashboardStore";

const Widget = ({ widget, categoryId }) => {
  const { removeWidget } = useDashboardStore();

  const getWidgetIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case "security":
        return <Shield className="text-red-500" size={20} />;
      case "chart":
        return <BarChart3 className="text-blue-500" size={20} />;
      default:
        return <BarChart3 className="text-gray-500" size={20} />;
    }
  };

  const getWidgetBorderColor = (type) => {
    switch (type) {
      case "alert":
        return "border-l-yellow-400";
      case "security":
        return "border-l-red-400";
      case "chart":
        return "border-l-blue-400";
      default:
        return "border-l-gray-400";
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-shadow ${getWidgetBorderColor(
        widget.type
      )} border-l-4`}
    >
      <button
        onClick={() => removeWidget(categoryId, widget.id)}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        title="Remove widget"
      >
        <X size={14} />
      </button>

      <div className="flex items-center gap-2 mb-3">
        {getWidgetIcon(widget.type)}
        <h3 className="font-medium text-gray-900 text-sm truncate pr-6">
          {widget.name}
        </h3>
      </div>

      <div className="text-sm text-gray-600 leading-relaxed">{widget.text}</div>

      <div className="mt-3">
        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
          {widget.type}
        </span>
      </div>
    </div>
  );
};

export default Widget;
