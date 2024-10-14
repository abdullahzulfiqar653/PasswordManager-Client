import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/passwords/");

const useGetUserPasswords = () =>
  useQuery({
    queryKey: ["getPassword"],
    queryFn: () => apiClient.getUserPasswords(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

export default useGetUserPasswords;
