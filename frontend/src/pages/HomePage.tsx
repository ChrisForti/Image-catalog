import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { techniquesApi, galleryApi } from "../api";
import {
  TechnicalCard,
  TechnicalCardDetail,
} from "../components/TechnicalCard";
import { GalleryCard, GalleryDetail } from "../components/GalleryCard";
import { MasterSearch } from "../components/MasterSearch";
import { UnifiedForm } from "../components/UnifiedForm";
import type {
  Technique,
  GalleryItem,
  SearchParams,
  NewTechnique,
  NewGalleryItem,
} from "../types";

type ViewMode = "techniques" | "gallery" | "all";

export const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("techniques");
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(
    null,
  );
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const fetchData = async (params?: SearchParams) => {
    setLoading(true);
    try {
      if (viewMode === "techniques" || viewMode === "all") {
        const techData = await techniquesApi.getAll(params);
        setTechniques(techData);
      }
      if (viewMode === "gallery" || viewMode === "all") {
        const galleryData = await galleryApi.getAll(
          params?.search ? { search: params.search } : {},
        );
        setGalleryItems(galleryData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchParams);
  }, [viewMode]);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    fetchData(params);
  };

  const handleCreateTechnique = async (data: NewTechnique) => {
    try {
      await techniquesApi.create(data);
      setShowForm(false);
      fetchData(searchParams);
      alert("Technique saved successfully!");
    } catch (error) {
      console.error("Error creating technique:", error);
      throw error;
    }
  };

  const handleCreateGallery = async (data: NewGalleryItem) => {
    try {
      await galleryApi.create(data);
      setShowForm(false);
      fetchData(searchParams);
      alert("Gallery item saved successfully!");
    } catch (error) {
      console.error("Error creating gallery item:", error);
      throw error;
    }
  };

  const getTotalCount = () => {
    if (viewMode === "techniques") return techniques.length;
    if (viewMode === "gallery") return galleryItems.length;
    return techniques.length + galleryItems.length;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600 mt-1">
            {getTotalCount()} {getTotalCount() === 1 ? "entry" : "entries"}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Entry
        </button>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode("techniques")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            viewMode === "techniques"
              ? "bg-nautical-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          📋 Technical SOPs
          {viewMode === "techniques" && (
            <span className="ml-2 text-sm">({techniques.length})</span>
          )}
        </button>
        <button
          onClick={() => setViewMode("gallery")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            viewMode === "gallery"
              ? "bg-nautical-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          📸 Gallery
          {viewMode === "gallery" && (
            <span className="ml-2 text-sm">({galleryItems.length})</span>
          )}
        </button>
        <button
          onClick={() => setViewMode("all")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            viewMode === "all"
              ? "bg-nautical-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          🔍 All
          {viewMode === "all" && (
            <span className="ml-2 text-sm">
              ({techniques.length + galleryItems.length})
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      {(viewMode === "techniques" || viewMode === "all") && (
        <MasterSearch onSearch={handleSearch} />
      )}

      {/* Unified Form Modal */}
      {showForm && (
        <UnifiedForm
          onSubmitTechnique={handleCreateTechnique}
          onSubmitGallery={handleCreateGallery}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nautical-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      ) : (
        <>
          {/* Technical SOPs */}
          {(viewMode === "techniques" || viewMode === "all") &&
            techniques.length > 0 && (
              <div className="mb-8">
                {viewMode === "all" && (
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    📋 Technical SOPs
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {techniques.map((technique) => (
                    <TechnicalCard
                      key={technique.id}
                      technique={technique}
                      onClick={() => setSelectedTechnique(technique)}
                    />
                  ))}
                </div>
              </div>
            )}

          {/* Gallery */}
          {(viewMode === "gallery" || viewMode === "all") &&
            galleryItems.length > 0 && (
              <div>
                {viewMode === "all" && (
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    📸 Gallery
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {galleryItems.map((item) => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedGallery(item)}
                    />
                  ))}
                </div>
              </div>
            )}

          {/* Empty State */}
          {((viewMode === "techniques" && techniques.length === 0) ||
            (viewMode === "gallery" && galleryItems.length === 0) ||
            (viewMode === "all" &&
              techniques.length === 0 &&
              galleryItems.length === 0)) && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No entries found.</p>
              <p className="text-gray-500 mt-2">
                Click "Add Entry" to get started.
              </p>
            </div>
          )}
        </>
      )}

      {/* Detail Modals */}
      {selectedTechnique && (
        <TechnicalCardDetail
          technique={selectedTechnique}
          onClose={() => setSelectedTechnique(null)}
        />
      )}
      {selectedGallery && (
        <GalleryDetail
          item={selectedGallery}
          onClose={() => setSelectedGallery(null)}
        />
      )}
    </div>
  );
};
