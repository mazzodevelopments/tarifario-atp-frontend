"use client";

import { useState } from "react";

interface PackageOptionsAttachmentProps {
  onOptionsChange: (options: {
    pickUpCost: number;
    needsRepackaging: boolean;
    needsFumigation: boolean;
  }) => void;
}

export default function PackageOptionsAttachment({
  onOptionsChange,
}: PackageOptionsAttachmentProps) {
  const [pickUpCost, setPickUpCost] = useState<number>(180);
  const [needsRepackaging, setNeedsRepackaging] = useState(false);
  const [needsFumigation, setNeedsFumigation] = useState(false);

  const handlePickUpCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 180 && value <= 650) {
      setPickUpCost(value);
      onOptionsChange({ pickUpCost: value, needsRepackaging, needsFumigation });
    }
  };

  const handleRepackagingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setNeedsRepackaging(checked);
    onOptionsChange({ pickUpCost, needsRepackaging: checked, needsFumigation });
  };

  const handleFumigationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setNeedsFumigation(checked);
    onOptionsChange({ pickUpCost, needsRepackaging, needsFumigation: checked });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div className="space-y-4">
          {/* Pick Up Cost */}
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1">
              <label
                htmlFor="pickUpCost"
                className="block text-md font-medium text-secondary"
              >
                Costo de Pick Up (USD 180 - 650)
              </label>
              <p className="text-sm text-gray-500">
                Depende del peso y el volumen
              </p>
            </div>
            <input
              id="pickUpCost"
              type="number"
              min={180}
              max={650}
              value={pickUpCost}
              onChange={handlePickUpCostChange}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* REPACKAGING */}
          <div className="flex items-center justify-between space-x-4 py-2">
            <div className="flex-1">
              <label
                htmlFor="repackaging"
                className="block text-md font-medium text-secondary"
              >
                Repackaging
              </label>
              <p className="text-sm text-gray-500">Costo Fijo: USD 190</p>
            </div>
            <input
              id="repackaging"
              type="checkbox"
              checked={needsRepackaging}
              onChange={handleRepackagingChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>

          {/* FUMIGACIÓN */}
          <div className="flex items-center justify-between space-x-4 py-2">
            <div className="flex-1">
              <label
                htmlFor="fumigation"
                className="block text-md font-medium text-secondary"
              >
                Fumigación de Pallets
              </label>
              <p className="text-sm text-gray-500">Costo Fijo: USD 250</p>
            </div>
            <input
              id="fumigation"
              type="checkbox"
              checked={needsFumigation}
              onChange={handleFumigationChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Total */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-lg font-semibold text-secondary">
            Total Adicional: USD{" "}
            {pickUpCost +
              (needsRepackaging ? 190 : 0) +
              (needsFumigation ? 250 : 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
