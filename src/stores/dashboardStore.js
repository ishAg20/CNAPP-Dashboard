import { create } from "zustand";
import initialConfig from "../data/dashboard-config.json";

const useDashboardStore = create((set, get) => ({
  categories: initialConfig.categories,
  searchQuery: "",
  isAddWidgetModalOpen: false,
  selectedCategoryId: null,

  addWidget: (categoryId, widget) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: [
                ...category.widgets,
                {
                  ...widget,
                  id: `widget-${Date.now()}`,
                },
              ],
            }
          : category
      ),
    })),

  removeWidget: (categoryId, widgetId) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(
                (widget) => widget.id !== widgetId
              ),
            }
          : category
      ),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  openAddWidgetModal: (categoryId) =>
    set({
      isAddWidgetModalOpen: true,
      selectedCategoryId: categoryId,
    }),

  closeAddWidgetModal: () =>
    set({
      isAddWidgetModalOpen: false,
      selectedCategoryId: null,
    }),

  getFilteredCategories: () => {
    const { categories, searchQuery } = get();
    if (!searchQuery) return categories;

    return categories
      .map((category) => ({
        ...category,
        widgets: category.widgets.filter(
          (widget) =>
            widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            widget.text.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((category) => category.widgets.length > 0);
  },

  getAllWidgets: () => {
    const { categories } = get();
    return categories.flatMap((category) =>
      category.widgets.map((widget) => ({
        ...widget,
        categoryId: category.id,
        categoryName: category.name,
      }))
    );
  },
}));

export default useDashboardStore;
