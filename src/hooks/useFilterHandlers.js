import { useCallback } from "react";
import useFilterStore, { FILTER_TYPES } from "../stores/useFilterStore";

export function useFilterHandlers(setOpenedFilter) {
  const filters = useFilterStore();

  const handleApplyDepartments = useCallback(() => {
    filters.commitFilter(FILTER_TYPES.DEPARTMENTS);
    setOpenedFilter(null);
  }, [filters, setOpenedFilter]);

  const handleApplyPriorities = useCallback(() => {
    filters.commitFilter(FILTER_TYPES.PRIORITIES);
    setOpenedFilter(null);
  }, [filters, setOpenedFilter]);

  const handleApplyEmployee = useCallback(() => {
    filters.commitFilter(FILTER_TYPES.EMPLOYEE);
    setOpenedFilter(null);
  }, [filters, setOpenedFilter]);

  return {
    handleApplyDepartments,
    handleApplyPriorities,
    handleApplyEmployee,
  };
}
