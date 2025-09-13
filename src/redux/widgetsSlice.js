import { createSlice } from "@reduxjs/toolkit";
import initialData from "../initialData.json";

const widgetsSlice = createSlice({
  name: "dashboard",
  initialState: {
    categories: initialData.categories,
    allWidgets: initialData.allWidgets,
  },
  reducers: {
    addWidget(state, action) {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category && !category.widgets.find((w) => w.id === widget.id)) {
        category.widgets.push(widget);
      }
    },
    removeWidget(state, action) {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((w) => w.id !== widgetId);
      }
    },
  },
});

export const { addWidget, removeWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;
