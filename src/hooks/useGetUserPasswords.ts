import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/passwords/");

const useGetUserPasswords = (folder_id,search) =>
  useQuery({
    queryKey: ["getPassword"],
    queryFn: () => apiClient.getUserPasswords(folder_id,search),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

export default useGetUserPasswords;
