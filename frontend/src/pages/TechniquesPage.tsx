import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { techniquesApi } from "../api";
import {
  TechnicalCard,
  TechnicalCardDetail,
} from "../components/TechnicalCard";
import { MasterSearch } from "../components/MasterSearch";
import { TechnicalSOPForm } from "../components/Forms";
import type { Technique, SearchParams } from "../types";

export const TechniquesPage: React.FC = () => {
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const fetchTechniques = async (params?: SearchParams) => {
    setLoading(true);
    try {
      const data = await techniquesApi.getAll(params);
      setTechniques(data);
    } catch (error) {
      console.error("Error fetching techniques:", error);
      alert("Failed to load techniques");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechniques();
  }, []);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    fetchTechniques(params);
  };

  const handleCreateTechnique = async (data: any) => {
    try {
      await techniquesApi.create(data);
      setShowForm(false);
      fetchTechniques(searchParams);
      alert("Technique saved successfully!");
    } catch (error) {
      console.error("Error creating technique:", error);
      throw error;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Technical SOP Library
          </h1>
          <p className="text-gray-600 mt-1">
            Document techniques based on Location, Material, and Customer Specs
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Technique
        </button>
      </div>

      {/* Search */}
      <MasterSearch onSearch={handleSearch} />

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Add Technical SOP
              </h2>
              <TechnicalSOPForm
                onSubmit={handleCreateTechnique}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nautical-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading techniques...</p>
        </div>
      ) : techniques.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No techniques found.</p>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or add a new technique.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techniques.map((technique) => (
            <TechnicalCard
              key={technique.id}
              technique={technique}
              onClick={() => setSelectedTechnique(technique)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedTechnique && (
        <TechnicalCardDetail
          technique={selectedTechnique}
          onClose={() => setSelectedTechnique(null)}
        />
      )}
    </div>
  );
};
