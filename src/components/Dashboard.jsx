import React from "react";
import Navbar from "./Navbar";
import CategorySection from "./CategorySection";
import AddWidgetModal from "./AddWidgetModal";
import useDashboardStore from "../stores/dashboardStore";

const Dashboard = () => {
  const { getFilteredCategories, isAddWidgetModalOpen, searchQuery } =
    useDashboardStore();

  const filteredCategories = getFilteredCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-l font-bold text-gray-900 mb-4">
            CNAPP Dashboard
          </h1>
        </div>

        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>

        {searchQuery && filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No widgets found for "{searchQuery}"
            </div>
            <div className="text-gray-400 mt-2">
              Try adjusting your search query
            </div>
          </div>
        )}
      </div>

      {isAddWidgetModalOpen && <AddWidgetModal />}
    </div>
  );
};

export default Dashboard;
