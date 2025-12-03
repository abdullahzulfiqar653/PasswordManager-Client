import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/user/generate-token/");

const useCreateToken = () =>
  useMutation({
    mutationFn: (payload) => apiClient.createToken(payload),
  });

export default useCreateToken;
