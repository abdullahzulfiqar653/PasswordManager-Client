import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/api-client";

const useGenerateRandomPassword = () => useMutation({
    mutationFn:(detail) => {
        console.log(detail);
        const jsonDetail = JSON.stringify(detail);
      return apiClient
 .post('/passwords/generate-random/',jsonDetail, getTokenIncludedConfig())
        .then(res=> res.data)
        .catch(er => console.log("Error is",er))
  },
  onError:(error)=>{
    console.log(error);
  }
});

export default useGenerateRandomPassword;