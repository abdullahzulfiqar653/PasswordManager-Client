import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/user/token/verify/");

const useVerifyToken = (login) => {
  return useMutation({
    mutationFn: (token) => apiClient.verifyToken(token, login),
  });
};

export default useVerifyToken;
