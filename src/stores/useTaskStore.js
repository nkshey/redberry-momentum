import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
}));

export default useTaskStore;
