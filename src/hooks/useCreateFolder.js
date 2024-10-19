import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/folders/");

const useCreateFolder = () =>
    useMutation({
        mutationFn: (name) => apiClient.createFolder(name),
      });

export default useCreateFolder;