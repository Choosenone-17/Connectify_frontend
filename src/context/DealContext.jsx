import { createContext, useState } from "react";

export const DealContext = createContext();

export const DealProvider = ({ children }) => {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [deals, setDeals] = useState([]);

  const createDeal = (deal) => {
    setSelectedDeal(deal);
  };

  const confirmDeal = () => {
    if (selectedDeal) {
      setDeals([...deals, { ...selectedDeal, status: "Completed" }]);
      setSelectedDeal(null);
    }
  };

  return (
    <DealContext.Provider
      value={{ selectedDeal, createDeal, confirmDeal, deals }}
    >
      {children}
    </DealContext.Provider>
  );
};