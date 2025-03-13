import { useEffect } from "react";
import useFilterStore from "../stores/useFilterStore";

export function useFilterInit(filterType) {
  const initTemp = useFilterStore((state) => state.initTemp);

  useEffect(() => {
    initTemp(filterType);
    return () => {
      initTemp(filterType);
    };
  }, [initTemp, filterType]);
}
