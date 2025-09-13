import React from "react";
import { Plus } from "lucide-react";
import Widget from "./Widget";
import useDashboardStore from "../stores/dashboardStore";

const CategorySection = ({ category }) => {
  const { openAddWidgetModal } = useDashboardStore();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
        <button
          onClick={() => openAddWidgetModal(category.id)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Widget
        </button>
      </div>

      {category.widgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {category.widgets.map((widget) => (
            <Widget key={widget.id} widget={widget} categoryId={category.id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <div className="text-lg mb-2">No widgets in this category</div>
          <div className="text-sm">Click "Add Widget" to get started</div>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
