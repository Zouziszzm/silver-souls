import axios from "axios";
import { Sliver, SliverType } from "@/lib/types";

export const API_URL = "http://localhost:4000";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("ss_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export interface BackendSliver {
  id: string;
  type: "QUOTE" | "POEM" | "LITERATURE" | "ESSAY";
  contentText: string;
  createdAt: string;
  author: {
    name: string | null;
  };
  genres: {
    genre: {
      name: string;
    };
  }[];
  _count?: {
    prestigeReceived: number;
  };
}

// Helper to validate/cast type
export function mapToSliverType(type: string): SliverType {
  const capitalized =
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  // In a real app, validate against array of allowed types if needed
  return capitalized as SliverType;
}

export async function devLogin(): Promise<string | null> {
  try {
    const { data } = await apiClient.post<{ access_token: string }>(
      "/auth/dev-login"
    );
    return data.access_token;
  } catch (error) {
    console.error("Dev login failed:", error);
    return null;
  }
}

export async function fetchSlivers({ pageParam = 1 }): Promise<Sliver[]> {
  try {
    const { data } = await apiClient.get<BackendSliver[]>(
      `/slivers?page=${pageParam}&limit=10`
    );
    return data.map((item) => ({
      id: item.id,
      type: mapToSliverType(item.type),
      content: item.contentText,
      author: item.author?.name || "Anonymous",
      prestige: item._count?.prestigeReceived || 0,
      tags: item.genres?.map((g) => g.genre?.name).filter(Boolean) || [],
    }));
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}

import { MOCK_SLIVERS } from "@/data/mockSlivers";

export async function fetchMySlivers(): Promise<Sliver[]> {
  // Guest mode check removed to prevent confusion with mock data
  try {
    const { data } = await apiClient.get<BackendSliver[]>(
      "/slivers/my-slivers"
    );
    return data.map((item) => ({
      id: item.id,
      type: mapToSliverType(item.type),
      content: item.contentText,
      author: item.author?.name || "Anonymous",
      prestige: item._count?.prestigeReceived || 0,
      tags: item.genres?.map((g) => g.genre?.name).filter(Boolean) || [],
    }));
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}

export async function fetchSliver(id: string): Promise<Sliver | null> {
  try {
    const { data } = await apiClient.get<BackendSliver>(`/slivers/${id}`);
    return {
      id: data.id,
      type: mapToSliverType(data.type),
      content: data.contentText,
      author: data.author?.name || "Anonymous",
      prestige: data._count?.prestigeReceived || 0,
      tags: data.genres?.map((g) => g.genre?.name).filter(Boolean) || [],
    };
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}
// ... existing code ...
export interface Collection {
  id: string;
  title: string;
  description: string | null;
  count: number;
  previewSlivers: Sliver[];
}

export interface BackendCollection {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  isPublic: boolean;
  _count: {
    slivers: number;
  };
  slivers: {
    sliver: BackendSliver;
  }[];
}

export async function fetchMyCollections(): Promise<Collection[]> {
  // Guest mode check removed
  try {
    const { data } = await apiClient.get<BackendCollection[]>(
      "/collections/my-collections"
    );
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      count: item._count?.slivers || 0,
      previewSlivers:
        item.slivers?.map((s) => ({
          id: s.sliver.id,
          type: mapToSliverType(s.sliver.type),
          content: s.sliver.contentText,
          author: s.sliver.author?.name || "Anonymous",
          prestige: s.sliver._count?.prestigeReceived || 0,
          tags: [],
        })) || [],
    }));
  } catch (error) {
    return [];
  }
}

export async function createCollection(data: {
  title: string;
  description: string;
  isPublic: boolean;
}): Promise<Collection | null> {
  const token = localStorage.getItem("ss_token");
  if (!token) return null;

  try {
    const response = await apiClient.post<BackendCollection>(
      "/collections",
      data
    );
    // Map the response to our Collection interface

    return {
      id: response.data.id,
      title: response.data.title,
      description: response.data.description,
      count: 0,
      previewSlivers: [], // New collection has no slivers
    };
  } catch (error) {
    console.error("Failed to create collection:", error);
    return null;
  }
}

export async function searchSlivers(query: string): Promise<Sliver[]> {
  try {
    // Assuming backend supports q query param
    const { data } = await apiClient.get<BackendSliver[]>(
      `/slivers?search=${query}`
    );
    return data.map((item) => ({
      id: item.id,
      type: mapToSliverType(item.type),
      content: item.contentText,
      author: item.author?.name || "Anonymous",
      prestige: item._count?.prestigeReceived || 0,
      tags: item.genres?.map((g) => g.genre?.name).filter(Boolean) || [],
    }));
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}

export async function togglePrestige(sliverId: string): Promise<boolean> {
  try {
    const { data } = await apiClient.post<{ liked: boolean }>(
      `/slivers/${sliverId}/prestige`
    );
    return data.liked;
  } catch (error) {
    console.error("Failed to toggle prestige", error);
    throw error;
  }
}

export async function toggleSaveSliver(sliverId: string): Promise<boolean> {
  try {
    const { data } = await apiClient.post<{ saved: boolean }>(
      `/collections/save/${sliverId}`
    );
    return data.saved;
  } catch (error) {
    console.error("Failed to toggle save", error);
    throw error;
  }
}

export async function fetchCollection(
  id: string
): Promise<BackendCollection | null> {
  try {
    const { data } = await apiClient.get<BackendCollection>(
      `/collections/${id}`
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch collection:", error);
    return null;
  }
}

export interface SystemStats {
  totalSlivers: number;
  totalAuthors: number;
  pendingReports: number;
  typeDistribution: { name: string; value: number }[];
  activity: { name: string; value: number }[];
}

export async function fetchSystemStats(): Promise<SystemStats | null> {
  try {
    const { data } = await apiClient.get<SystemStats>("/slivers/stats");
    return data;
  } catch (error) {
    console.error("Failed to fetch system stats:", error);
    return null;
  }
}
