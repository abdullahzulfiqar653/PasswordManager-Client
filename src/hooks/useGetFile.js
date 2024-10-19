import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const useGetFile = (file_type, file_name) => {
  const apiClient = new APIClient(`/media/${file_type}/${file_name}/`);
  useQuery({
    queryFn: () => apiClient.getFile(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });
};

export default useGetFile;