import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
}

const FilterContext = createContext<FilterContextType>({
  selectedDepartment: "all",
  setSelectedDepartment: () => {},
});

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  return (
    <FilterContext.Provider value={{ selectedDepartment, setSelectedDepartment }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);
