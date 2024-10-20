import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/passwords");

const useUpdatePassword = () =>
  useMutation({ mutationFn: (data) => apiClient.updatePassword(data) });

export default useUpdatePassword;

