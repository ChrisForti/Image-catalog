import React from "react";
import ReactMarkdown from "react-markdown";
import { MapPin, Package, Wrench, FileText, Calendar } from "lucide-react";
import type { Technique } from "../types";

interface TechnicalCardProps {
  technique: Technique;
  onClick?: () => void;
}

export const TechnicalCard: React.FC<TechnicalCardProps> = ({
  technique,
  onClick,
}) => {
  return (
    <div
      className="card hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* Image Section */}
      {technique.imageUrl && (
        <div className="h-64 overflow-hidden bg-gray-100">
          <img
            src={technique.imageUrl}
            alt={technique.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Title & Hardware */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {technique.title}
          </h3>
          {technique.hardwareName && (
            <div className="flex items-center text-nautical-600 font-medium">
              <Wrench size={18} className="mr-2" />
              {technique.hardwareName}
              {technique.hardwarePart && (
                <span className="text-gray-500 text-sm ml-2">
                  ({technique.hardwarePart})
                </span>
              )}
            </div>
          )}
        </div>

        {/* Application Specs Sidebar */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
          <h4 className="font-semibold text-gray-700 border-b pb-2">
            Application Specs
          </h4>

          <div className="flex items-start">
            <MapPin
              size={18}
              className="text-nautical-600 mr-2 mt-1 flex-shrink-0"
            />
            <div>
              <div className="text-xs text-gray-500 uppercase">Location</div>
              <div className="text-sm font-medium text-gray-900">
                {technique.locationContext}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <Package
              size={18}
              className="text-nautical-600 mr-2 mt-1 flex-shrink-0"
            />
            <div>
              <div className="text-xs text-gray-500 uppercase">Material</div>
              <div className="text-sm font-medium text-gray-900">
                {technique.material}
              </div>
            </div>
          </div>

          {technique.customerSpecs && (
            <div className="flex items-start">
              <FileText
                size={18}
                className="text-nautical-600 mr-2 mt-1 flex-shrink-0"
              />
              <div>
                <div className="text-xs text-gray-500 uppercase">
                  Customer Specs
                </div>
                <div className="text-sm text-gray-700">
                  {technique.customerSpecs}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Application Logic */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">
            Why This Hardware?
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {technique.applicationLogic}
          </p>
        </div>

        {/* Material Constraints */}
        {technique.materialConstraints && (
          <div className="mb-4 bg-amber-50 border-l-4 border-amber-400 p-3">
            <h4 className="font-semibold text-amber-900 text-sm mb-1">
              Material Constraints
            </h4>
            <p className="text-amber-800 text-sm">
              {technique.materialConstraints}
            </p>
          </div>
        )}

        {/* Tags */}
        {technique.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technique.tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-nautical-100 text-nautical-700 text-xs rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className="flex items-center text-xs text-gray-500 mt-4 pt-4 border-t">
          <Calendar size={14} className="mr-1" />
          Added {new Date(technique.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

interface TechnicalCardDetailProps {
  technique: Technique;
  onClose: () => void;
}

export const TechnicalCardDetail: React.FC<TechnicalCardDetailProps> = ({
  technique,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with Image */}
        <div className="relative">
          {technique.imageUrl && (
            <img
              src={technique.imageUrl}
              alt={technique.title}
              className="w-full h-96 object-cover"
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title & Hardware */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {technique.title}
            </h2>
            {technique.description && (
              <p className="text-gray-600 mb-4">{technique.description}</p>
            )}
            {technique.hardwareName && (
              <div className="flex items-center text-nautical-600 font-medium text-lg">
                <Wrench size={20} className="mr-2" />
                {technique.hardwareName}
                {technique.hardwarePart && (
                  <span className="text-gray-500 text-sm ml-2">
                    Part# {technique.hardwarePart}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Specs Column */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h3 className="font-bold text-gray-900 mb-4 text-lg border-b pb-2">
                  Application Specs
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-nautical-600 mb-1">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-xs font-semibold uppercase">
                        Location
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 ml-6">
                      {technique.locationContext}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-nautical-600 mb-1">
                      <Package size={16} className="mr-2" />
                      <span className="text-xs font-semibold uppercase">
                        Material
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 ml-6">
                      {technique.material}
                    </div>
                  </div>

                  {technique.customerSpecs && (
                    <div>
                      <div className="flex items-center text-nautical-600 mb-1">
                        <FileText size={16} className="mr-2" />
                        <span className="text-xs font-semibold uppercase">
                          Customer Specs
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 ml-6">
                        {technique.customerSpecs}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Application Logic */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  Why This Hardware?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {technique.applicationLogic}
                </p>
              </div>

              {/* Material Constraints */}
              {technique.materialConstraints && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                  <h3 className="font-bold text-amber-900 mb-2">
                    ⚠️ Material Constraints
                  </h3>
                  <p className="text-amber-800">
                    {technique.materialConstraints}
                  </p>
                </div>
              )}

              {/* Step-by-Step Instructions */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  Step-by-Step Build Instructions
                </h3>
                <div className="prose prose-sm max-w-none bg-white border rounded-lg p-6">
                  <ReactMarkdown>{technique.techniqueDetails}</ReactMarkdown>
                </div>
              </div>

              {/* Tags */}
              {technique.tags && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {technique.tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-nautical-100 text-nautical-700 text-sm rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="text-sm text-gray-500 pt-4 border-t">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  Created: {new Date(technique.createdAt).toLocaleString()}
                </div>
                {technique.updatedAt &&
                  technique.updatedAt !== technique.createdAt && (
                    <div className="flex items-center mt-1">
                      <Calendar size={14} className="mr-2" />
                      Updated: {new Date(technique.updatedAt).toLocaleString()}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
