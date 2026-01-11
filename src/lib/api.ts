import { Sliver, SliverType } from "@/lib/types";
import sliversData from "@/data/slivers.json";

// Type assertion for the imported JSON data
const ALL_SLIVERS: Sliver[] = sliversData as Sliver[];

export const API_URL = ""; // No API URL needed anymore

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
  return capitalized as SliverType;
}

export async function devLogin(): Promise<string | null> {
  return "mock-token-123";
}

export async function fetchSlivers({ pageParam = 1 }): Promise<Sliver[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return slices of local data to simulate pagination
  const start = (pageParam - 1) * 10;
  const end = start + 10;
  return ALL_SLIVERS.slice(start, end);
}

export async function fetchMySlivers(): Promise<Sliver[]> {
  // Return random subset for "my" slivers from local data
  return ALL_SLIVERS.slice(0, 5);
}

export async function fetchSliver(id: string): Promise<Sliver | null> {
  return ALL_SLIVERS.find((s) => s.id === id) || null;
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
  // Mock collections using local data
  return [
    {
      id: "col-1",
      title: "Favorites",
      description: "My favorite quotes",
      count: 3,
      previewSlivers: ALL_SLIVERS.slice(0, 3),
    },
    {
      id: "col-2",
      title: "Deep Thoughts",
      description: null,
      count: 2,
      previewSlivers: ALL_SLIVERS.slice(5, 7),
    },
  ];
}

export async function createCollection(data: {
  title: string;
  description: string;
  isPublic: boolean;
}): Promise<Collection | null> {
  // Mock creation
  return {
    id: `new-col-${Date.now()}`,
    title: data.title,
    description: data.description,
    count: 0,
    previewSlivers: [],
  };
}

export async function searchSlivers(query: string): Promise<Sliver[]> {
  const lowerQ = query.toLowerCase();
  return ALL_SLIVERS.filter(
    (s) =>
      s.content.toLowerCase().includes(lowerQ) ||
      s.author.toLowerCase().includes(lowerQ)
  );
}

export async function togglePrestige(sliverId: string): Promise<boolean> {
  // In a real local-first app, we'd update local state or localStorage here.
  // For now, just return success.
  return true;
}

export async function toggleSaveSliver(sliverId: string): Promise<boolean> {
  return true;
}

export async function fetchCollection(
  id: string
): Promise<BackendCollection | null> {
  // Mock returning a collection
  return {
    id: id,
    title: "Mock Collection",
    description: "This is a mock collection",
    createdAt: new Date().toISOString(),
    isPublic: true,
    _count: { slivers: 2 },
    slivers: ALL_SLIVERS.slice(0, 2).map((s) => ({
      sliver: {
        id: s.id,
        type: s.type.toUpperCase() as any, // Cast for mock simplicity
        contentText: s.content,
        createdAt: new Date().toISOString(),
        author: { name: s.author },
        genres: s.tags.map((t) => ({ genre: { name: t } })),
        _count: { prestigeReceived: s.prestige },
      },
    })),
  };
}

export interface SystemStats {
  totalSlivers: number;
  totalAuthors: number;
  pendingReports: number;
  typeDistribution: { name: string; value: number }[];
  activity: { name: string; value: number }[];
}

export async function fetchSystemStats(): Promise<SystemStats | null> {
  return {
    totalSlivers: ALL_SLIVERS.length,
    totalAuthors: new Set(ALL_SLIVERS.map(s => s.author)).size,
    pendingReports: 0,
    typeDistribution: [
      { name: "Quote", value: ALL_SLIVERS.filter(s => s.type === "Quote").length },
      { name: "Poem", value: ALL_SLIVERS.filter(s => s.type === "Poem").length },
      { name: "Literature", value: ALL_SLIVERS.filter(s => s.type === "Literature").length },
      { name: "Essay", value: ALL_SLIVERS.filter(s => s.type === "Essay").length },
    ],
    activity: [
      { name: "Mon", value: 10 },
      { name: "Tue", value: 20 },
      { name: "Wed", value: 15 },
    ],
  };
}
