import React, { useState } from "react";
import { TechnicalSOPForm, GalleryForm } from "../components/Forms";
import type { NewTechnique, NewGalleryItem } from "../types";

type FormMode = "technical" | "gallery";

interface UnifiedFormProps {
  onSubmitTechnique: (data: NewTechnique) => Promise<void>;
  onSubmitGallery: (data: NewGalleryItem) => Promise<void>;
  onCancel: () => void;
}

export const UnifiedForm: React.FC<UnifiedFormProps> = ({
  onSubmitTechnique,
  onSubmitGallery,
  onCancel,
}) => {
  const [mode, setMode] = useState<FormMode>("technical");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Mode Toggle */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Add New Entry
            </h2>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setMode("technical")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  mode === "technical"
                    ? "bg-nautical-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                📋 Technical SOP
              </button>
              <button
                type="button"
                onClick={() => setMode("gallery")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  mode === "gallery"
                    ? "bg-nautical-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                📸 General Gallery
              </button>
            </div>

            {/* Mode Description */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              {mode === "technical" ? (
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    Technical SOP Mode
                  </p>
                  <p className="text-gray-600">
                    Document specific techniques with required Location,
                    Material, and Step-by-Step Instructions. Perfect for
                    hardware installations and replicable procedures.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    General Gallery Mode
                  </p>
                  <p className="text-gray-600">
                    Quick photo documentation for completed work and projects.
                    No required technical fields - just title and image.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form Content */}
          {mode === "technical" ? (
            <TechnicalSOPForm
              onSubmit={onSubmitTechnique}
              onCancel={onCancel}
            />
          ) : (
            <GalleryForm onSubmit={onSubmitGallery} onCancel={onCancel} />
          )}
        </div>
      </div>
    </div>
  );
};
