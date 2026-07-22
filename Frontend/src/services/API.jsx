import React from "react";
import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL;

const API = async(method, endpoint, data = null) => {

    const token = localStorage.getItem("token");

    const response = await axios({
      method,
      url: `${BASE_URL}/${endpoint}`,
      data,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

   

    return response;
};

export default API;

