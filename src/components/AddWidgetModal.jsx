import React from "react";
import { X, Plus } from "lucide-react";
import useDashboardStore from "../stores/dashboardStore";
import { useState } from "react";

const AddWidgetModal = () => {
  const { selectedCategoryId, closeAddWidgetModal, addWidget, categories } =
    useDashboardStore();

  const [formData, setFormData] = useState({
    name: "",
    text: "",
    type: "metric",
  });

  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.text.trim()) {
      addWidget(selectedCategoryId, formData);
      closeAddWidgetModal();
      setFormData({ name: "", text: "", type: "metric" });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Widget to {selectedCategory?.name}
          </h2>
          <button
            onClick={closeAddWidgetModal}
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Widget Name *
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter widget name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Widget Content *
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows="3"
              placeholder="Enter widget content/description"
              value={formData.text}
              onChange={(e) => handleInputChange("text", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Widget Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
            >
              <option value="metric">Metric</option>
              <option value="chart">Chart</option>
              <option value="alert">Alert</option>
              <option value="security">Security</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeAddWidgetModal}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700"
            >
              <Plus size={16} />
              Add Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWidgetModal;
