import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient(`/passwords/delete/`);

const useDeletePasswords = () => {
    return useMutation({
        mutationFn: (pass_id) => apiClient.deletePasswords(pass_id),
    })
};

export default useDeletePasswords;