import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/passwords/");

const useAddPassword = () =>
  useMutation({ mutationFn: (data) => apiClient.create(data) });

export default useAddPassword;
