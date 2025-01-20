import { useState } from "react";
import BudgetList from "./Budgets/BudgetList";
import TransportList from "./Transports/TransportList";
import DeliveryList from "./Deliveries/DeliveryList";
import { Item, Budget } from "@/app/(dashboard)/create/types";

interface TabsContainerProps {
  items: Item[];
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
}

const tabs = [
  { id: "budgets", label: "Presupuestos" },
  { id: "transport", label: "Transportes" },
  { id: "delivery", label: "Entregas" },
];

export default function TabsContainer({
  items,
  budgets,
  setBudgets,
}: TabsContainerProps) {
  const [activeTab, setActiveTab] = useState("budgets");

  const renderContent = () => {
    switch (activeTab) {
      case "budgets":
        return (
          <BudgetList items={items} budgets={budgets} setBudgets={setBudgets} />
        );
      case "transport":
        return <TransportList />;
      case "delivery":
        return <DeliveryList />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 text-md font-[600]
              ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-grow mt-4">{renderContent()}</div>
    </div>
  );
}
