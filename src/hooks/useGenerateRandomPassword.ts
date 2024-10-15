import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/passwords/generate-random/");

const useGenerateRandomPassword = () =>
  useMutation({
    mutationFn: (data) => apiClient.create(data),
  });

export default useGenerateRandomPassword;
