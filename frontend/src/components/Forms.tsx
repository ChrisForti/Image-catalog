import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadImage } from "../api";
import type { NewTechnique, NewGalleryItem } from "../types";

interface TechnicalSOPFormProps {
  onSubmit: (data: NewTechnique) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<NewTechnique>;
}

export const TechnicalSOPForm: React.FC<TechnicalSOPFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState<NewTechnique>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    locationContext: initialData?.locationContext || "",
    material: initialData?.material || "",
    customerSpecs: initialData?.customerSpecs || "",
    applicationLogic: initialData?.applicationLogic || "",
    techniqueDetails: initialData?.techniqueDetails || "",
    materialConstraints: initialData?.materialConstraints || "",
    hardwareName: initialData?.hardwareName || "",
    hardwarePart: initialData?.hardwarePart || "",
    imageUrl: initialData?.imageUrl || "",
    tags: initialData?.tags || "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.locationContext ||
      !formData.material ||
      !formData.applicationLogic ||
      !formData.techniqueDetails
    ) {
      alert(
        "Please fill in all required fields: Title, Location, Material, Application Logic, and Technique Details",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save technique. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-nautical-50 border-l-4 border-nautical-600 p-4 mb-6">
        <h3 className="font-semibold text-nautical-900 mb-1">
          Technical SOP Mode
        </h3>
        <p className="text-sm text-nautical-700">
          Required: Location, Material, and Technique Instructions must be
          filled before saving.
        </p>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Blum Hinge Installation - Teak Cabinet"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hardware Name
          </label>
          <input
            type="text"
            name="hardwareName"
            value={formData.hardwareName}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Blum Hinge, Southco Latch"
          />
        </div>
      </div>

      {/* Core SOP Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location Context <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="locationContext"
            value={formData.locationContext}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., High-moisture/Head, Exterior/Aft Deck"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Material <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Teak, Mahogany, Marine Plywood"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input-field"
          rows={2}
          placeholder="Brief overview of this technique"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Application Logic (Why this hardware?){" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          name="applicationLogic"
          value={formData.applicationLogic}
          onChange={handleChange}
          className="input-field"
          rows={3}
          placeholder="Explain WHY this hardware was chosen. E.g., 'Customer requested soft-close due to heavy sea-state use'"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technique Details (Step-by-Step){" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          name="techniqueDetails"
          value={formData.techniqueDetails}
          onChange={handleChange}
          className="input-field"
          rows={8}
          placeholder="Detailed instructions. Markdown supported. E.g., 
1. Pre-drill pilot holes 1/8 inch from edge
2. Apply marine-grade adhesive to mortise
3. Install with #8 screws at 3/4 inch depth"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Material Constraints
          </label>
          <textarea
            name="materialConstraints"
            value={formData.materialConstraints}
            onChange={handleChange}
            className="input-field"
            rows={3}
            placeholder="Notes on grain orientation, screw depth, adhesive types, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Specifications
          </label>
          <textarea
            name="customerSpecs"
            value={formData.customerSpecs}
            onChange={handleChange}
            className="input-field"
            rows={3}
            placeholder="Any specific customer requirements or preferences"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hardware Part Number
        </label>
        <input
          type="text"
          name="hardwarePart"
          value={formData.hardwarePart}
          onChange={handleChange}
          className="input-field"
          placeholder="Part number for reference"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., hinge, cabinet, teak, moisture-resistant"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Installation Photo
        </label>
        <div className="flex items-start gap-4">
          {formData.imageUrl ? (
            <div className="relative">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, imageUrl: "" }))
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-nautical-500 transition-colors">
              <Upload className="text-gray-400 mb-2" size={32} />
              <span className="text-sm text-gray-500">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          )}
          {isUploading && (
            <div className="text-sm text-gray-600">Uploading...</div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Save Technique"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

interface GalleryFormProps {
  onSubmit: (data: NewGalleryItem) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<NewGalleryItem>;
}

export const GalleryForm: React.FC<GalleryFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState<NewGalleryItem>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
    category: initialData?.category || "",
    tags: initialData?.tags || "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.imageUrl) {
      alert("Please provide a title and upload an image");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save gallery item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          placeholder="Gallery item title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input-field"
          rows={4}
          placeholder="Describe this project or work"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., Cabinets, Furniture, Trim Work"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., teak, custom, yacht"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image <span className="text-red-500">*</span>
        </label>
        <div className="flex items-start gap-4">
          {formData.imageUrl ? (
            <div className="relative">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, imageUrl: "" }))
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-nautical-500 transition-colors">
              <Upload className="text-gray-400 mb-2" size={32} />
              <span className="text-sm text-gray-500">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          )}
          {isUploading && (
            <div className="text-sm text-gray-600">Uploading...</div>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Save Gallery Item"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
