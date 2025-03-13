import { create } from "zustand";

export const FILTER_TYPES = {
  DEPARTMENTS: "departments",
  PRIORITIES: "priorities",
  EMPLOYEE: "employee",
};

const initialState = {
  filters: {
    departments: [],
    priorities: [],
    employee: null,
  },

  temp: {
    departments: [],
    priorities: [],
    employee: null,
  },
};

const useFilterStore = create((set) => ({
  ...initialState,

  // Toggle department selection in temp state
  toggleDepartment: (department) =>
    set((state) => {
      const exists = state.temp.departments.some((d) => d.id === department.id);

      if (exists) {
        return {
          temp: {
            ...state.temp,
            departments: state.temp.departments.filter(
              (d) => d.id !== department.id,
            ),
          },
        };
      } else {
        return {
          temp: {
            ...state.temp,
            departments: [...state.temp.departments, department],
          },
        };
      }
    }),

  // Toggle priority selection in temp state
  togglePriority: (priority) =>
    set((state) => {
      const exists = state.temp.priorities.some((p) => p.id === priority.id);

      if (exists) {
        return {
          temp: {
            ...state.temp,
            priorities: state.temp.priorities.filter(
              (p) => p.id !== priority.id,
            ),
          },
        };
      } else {
        return {
          temp: {
            ...state.temp,
            priorities: [...state.temp.priorities, priority],
          },
        };
      }
    }),

  // Set employee in temp state
  setTempEmployee: (employee) =>
    set((state) => ({
      temp: {
        ...state.temp,
        employee: state.temp.employee?.id === employee.id ? null : employee,
      },
    })),

  // Initialize temp state from filters for a specific filter type
  initTemp: (filterType) =>
    set((state) => ({
      temp: {
        ...state.temp,
        [filterType]: state.filters[filterType],
      },
    })),

  // Commit temp state to filters for a specific filter type
  commitFilter: (filterType) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filterType]: state.temp[filterType],
      },
    })),

  // Remove a department from filters and temp
  removeDepartment: (departmentId) =>
    set((state) => ({
      filters: {
        ...state.filters,
        departments: state.filters.departments.filter(
          (d) => d.id !== departmentId,
        ),
      },
      temp: {
        ...state.temp,
        departments: state.temp.departments.filter(
          (d) => d.id !== departmentId,
        ),
      },
    })),

  // Remove a priority from filters and temp
  removePriority: (priorityId) =>
    set((state) => ({
      filters: {
        ...state.filters,
        priorities: state.filters.priorities.filter((p) => p.id !== priorityId),
      },
      temp: {
        ...state.temp,
        priorities: state.temp.priorities.filter((p) => p.id !== priorityId),
      },
    })),

  // Clear employee filter
  removeEmployee: () =>
    set((state) => ({
      filters: {
        ...state.filters,
        employee: null,
      },
      temp: {
        ...state.temp,
        employee: null,
      },
    })),

  // Clear all filters
  clearAllFilters: () =>
    set(() => ({
      filters: initialState.filters,
      temp: initialState.temp,
    })),
}));

export default useFilterStore;
