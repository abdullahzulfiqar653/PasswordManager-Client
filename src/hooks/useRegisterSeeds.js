import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/user/generate-pass-phrase/");

const useRegisterSeeds = () =>
    useMutation({
        mutationFn: (payload) => apiClient.registerSeeds(payload),
      });

export default useRegisterSeeds;