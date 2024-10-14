import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/user/generate-pass-phrase/");

const useGetSeeds = () =>
  useQuery({
    queryKey: ["password"],
    queryFn: () => apiClient.getSeeds(),
  });

export default useGetSeeds;
