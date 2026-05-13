// API Types
export interface Technique {
  id: number;
  title: string;
  description?: string;
  locationContext: string;
  material: string;
  customerSpecs?: string;
  applicationLogic: string;
  techniqueDetails: string;
  materialConstraints?: string;
  hardwareName?: string;
  hardwarePart?: string;
  imageUrl?: string;
  additionalImages?: string;
  isTechnicalSOP: boolean;
  tags?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  tags?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewTechnique {
  title: string;
  description?: string;
  locationContext: string;
  material: string;
  customerSpecs?: string;
  applicationLogic: string;
  techniqueDetails: string;
  materialConstraints?: string;
  hardwareName?: string;
  hardwarePart?: string;
  imageUrl?: string;
  additionalImages?: string;
  tags?: string;
}

export interface NewGalleryItem {
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  tags?: string;
}

export interface SearchParams {
  search?: string;
  material?: string;
  location?: string;
  hardware?: string;
}
