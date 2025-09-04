"use client";

import useSWR from "swr";
import { fetcher } from "@/fetchers/fetcher";
import { API_URLS_INTERNAL } from "@/statics";

type Connection = {
  connection_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

type ConnectionResponse = {
  success: boolean;
  message?: string;
  connection?: Connection;
};

export function useConnection() {
  const { CONNECTION_INTERNAL } = API_URLS_INTERNAL;

  const { data, error, isLoading, mutate } = useSWR<ConnectionResponse>(
    `${CONNECTION_INTERNAL}`,
    fetcher,
  );

  return {
    connection: data?.connection,
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
