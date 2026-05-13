import React from "react";
import type { GalleryItem } from "../types";
import { getImageUrl } from "../utils/url";

interface GalleryCardProps {
  item: GalleryItem;
  onClick?: () => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
  return (
    <div
      className="card hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="h-64 overflow-hidden bg-gray-100">
        <img
          src={getImageUrl(item.imageUrl)}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {item.description}
          </p>
        )}
        {item.category && (
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {item.category}
          </span>
        )}
      </div>
    </div>
  );
};

interface GalleryDetailProps {
  item: GalleryItem;
  onClose: () => void;
}

export const GalleryDetail: React.FC<GalleryDetailProps> = ({
  item,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-96 object-contain bg-gray-100"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {item.title}
          </h2>
          {item.description && (
            <p className="text-gray-700 mb-4 leading-relaxed">
              {item.description}
            </p>
          )}
          {item.category && (
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                {item.category}
              </span>
            </div>
          )}
          {item.tags && (
            <div className="flex flex-wrap gap-2">
              {item.tags.split(",").map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-nautical-100 text-nautical-700 text-sm rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
