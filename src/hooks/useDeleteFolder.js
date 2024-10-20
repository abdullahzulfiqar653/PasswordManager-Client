import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient(`/folders`);

const useDeleteFolders = () => {
    return useMutation({
        mutationFn: (id) => apiClient.delete(id),
    })
};

export default useDeleteFolders;