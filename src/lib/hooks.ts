import { useState, useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchSlivers, fetchSliver, fetchMyCollections } from "./api";

export function useSlivers() {
  return useInfiniteQuery({
    queryKey: ["slivers"],
    queryFn: fetchSlivers,
    getNextPageParam: (lastPage, allPages) => {
      // Assuming page size is 10. If less, we are at the end.
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

export function useSliver(id: string) {
  return useQuery({
    queryKey: ["sliver", id],
    queryFn: () => fetchSliver(id),
    enabled: !!id,
  });
}

export function useMyCollections() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("ss_token") : null;
  return useQuery({
    queryKey: ["my-collections"],
    queryFn: fetchMyCollections,
    enabled: !!token,
  });
}

export function useMySlivers() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("ss_token") : null;
  return useQuery({
    queryKey: ["my-slivers"],
    queryFn: () => import("./api").then((m) => m.fetchMySlivers()),
    enabled: !!token,
  });
}

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return mounted;
}
