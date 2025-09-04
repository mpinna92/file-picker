"use client";

import useSWR from "swr";
import { fetcher } from "@/fetchers/fetcher";
import { API_URLS_INTERNAL } from "@/statics";

type SessionResponse = {
  success: boolean;
  message: string;
  details?: string;
};

export function useSession() {
  const { AUTH_SESSION_INTERNAL } = API_URLS_INTERNAL;

  const { data, error, isLoading, mutate } = useSWR<SessionResponse>(
    `${AUTH_SESSION_INTERNAL}`,
    fetcher,
    {
      refreshInterval: 1000 * 60 * 10,
    },
  );

  return {
    session: data,
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
