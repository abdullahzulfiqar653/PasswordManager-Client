import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/folders/");

const useGetFolders = () =>
  useQuery({
    queryKey: ["folders"],
    queryFn: () => apiClient.getFolders(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });

export default useGetFolders;