import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

function getTokenIncludedConfig() {
  return {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  };
}

let getTokenForMultipartData = getTokenIncludedConfig();
getTokenForMultipartData.headers['Content-Type'] = 'multipart/form-data';

class APIClient {
  endpoint;
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  post = (data = {}) => {
    return axiosInstance
      .post(this.endpoint, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };
  
  postConfig = (data = {}, config = getTokenIncludedConfig()) => {
    return axiosInstance
      .post(this.endpoint, data, config)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };
  get = (config = getTokenIncludedConfig()) => {
    return axiosInstance
      .get(this.endpoint, config)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  patch = (data, body, config = getTokenIncludedConfig()) => {
    return axiosInstance
      .patch(`${this.endpoint}/${data?.id}/`, body, config)
      .then((res) => ({
        data: res.data,
        status: res.status,
      }))
      .catch((error) => {
        throw error;
      });
  };

  delete=(id)=>{
    return axiosInstance
    .delete(`${this.endpoint}/${id}`, getTokenIncludedConfig())
    .then((res) => res.data)
    .catch((error) => {throw error});
}

deletePasswords=(pass_id)=>{
   return this.postConfig(pass_id);
}

  createToken = (pass_phrase) => {
    return this.post({ pass_phrase });
  };

  getSeeds = () => {
    return this.post();
  };

  createFolder = (name) => {
    return this.postConfig(name);
  };

  create = (data) => {
    return axiosInstance
    .post(this.endpoint, data, getTokenForMultipartData)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
  };

  verifyToken = (token, login) => {
    return this.postConfig({ token }).then(() => login());
  };

  getUserPasswords = (id, search) => {
    let url = `${this.endpoint}?folder=${id}`;
    if (search) { url += `&search=${search}`; }
    return axiosInstance
    .get(url, getTokenIncludedConfig())
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
  };

  getFolders = (search) => {
    let url = `${this.endpoint}`;
    if (search) { url += `?search=${search}`; }
    return axiosInstance
    .get(url, getTokenIncludedConfig())
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
  };
  
  getFile = () => {
    let url = `${this.endpoint}`;
    return axiosInstance
    .get(url, getTokenIncludedConfig(), )
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      console.log(url)
      const a = document.createElement('a');
    a.href = url;
    
    // Set the file name (you may want to extract this from headers or other means)
    a.download = 'filename.pdf'; // Replace with your desired file name and extension
    
    // Append the link to the DOM and trigger the click
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    })
    .catch((error) => {
      throw error;
    });
  };

  updatePassword = (data) => {
    const body = JSON.stringify(data);
     return axiosInstance
    .patch(`${this.endpoint}/${data?.id}/`, body, getTokenIncludedConfig())
    .then((res) => ({
      data: res.data,
      status: res.status,
    }))
    .catch((error) => {
      throw error;
    });
  };
}

export default APIClient;
