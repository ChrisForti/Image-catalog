import axios from "axios";
import type {
  Technique,
  GalleryItem,
  NewTechnique,
  NewGalleryItem,
  SearchParams,
} from "../types";

// Use VITE_API_URL for production (full Railway URL), fallback to /api for dev
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Techniques API
export const techniquesApi = {
  getAll: async (params?: SearchParams) => {
    const response = await api.get<Technique[]>("/techniques", { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Technique>(`/techniques/${id}`);
    return response.data;
  },

  create: async (data: NewTechnique) => {
    const response = await api.post<Technique>("/techniques", data);
    return response.data;
  },

  update: async (id: number, data: Partial<NewTechnique>) => {
    const response = await api.put<Technique>(`/techniques/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/techniques/${id}`);
  },
};

// Gallery API
export const galleryApi = {
  getAll: async (params?: { search?: string; category?: string }) => {
    const response = await api.get<GalleryItem[]>("/gallery", { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<GalleryItem>(`/gallery/${id}`);
    return response.data;
  },

  create: async (data: NewGalleryItem) => {
    const response = await api.post<GalleryItem>("/gallery", data);
    return response.data;
  },

  update: async (id: number, data: Partial<NewGalleryItem>) => {
    const response = await api.put<GalleryItem>(`/gallery/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/gallery/${id}`);
  },
};

// Image Upload API
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post<{ imageUrl: string }>("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.imageUrl;
};
