import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
const useGetFile = () => {
  const apiClient = new APIClient();

  return useMutation({
    mutationFn: ({ fileType, fileName }) => {
      return apiClient.getFile(`/media/${fileType}/${fileName}/`); // Pass the full URL to getFile
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });
};

export default useGetFile;
