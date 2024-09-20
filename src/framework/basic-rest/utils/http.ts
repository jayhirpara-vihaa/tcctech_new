import axios from "axios";
import { getToken } from "./get-token";
import Cookies from "js-cookie";
import {
  AUTH_TOKEN,
  CARTPRODUCTDETAIL,
  CART_TOTAL,
  USER_DETAILS,
} from "@utils/constants";
import { decryptRequestData, encryptResponesData } from "@utils/encrypt-decrypt-data";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  async (config) => {

    const token = getToken();
    console.log("token", token);
    config.headers = {
      ...config.headers,
      Authorization: `${token ? token : "PUBLIC_AUTHORIZATION_TOKEN"}`,
      // Authorization: "PUBLIC_AUTHORIZATION_TOKEN",
    };
    // console.log("=======================", config.data);

    if (config.data && process.env.NEXT_PUBLIC_SECURE_COMMUNICATION) {
      if (config.headers['Content-Type'] != "multipart/form-data") {
        config.data = { data: encryptResponesData(config.data) };
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(

  (response) => {
    // console.log("----------------------------", decryptRequestData(response.data));

    if (process.env.NEXT_PUBLIC_SECURE_COMMUNICATION) {
      const data = decryptRequestData(response.data)
      return { ...response, data: JSON.parse(data) };
    } else {
      return response
    }
  },
  (error) => {
    // console.log("++++++++++++++++++++++++++++++++++++++++", decryptRequestData(error?.response?.data));

    // Do something with response error
    if (error?.response?.status === 401 || error?.response?.status === "401") {
      Cookies.remove(AUTH_TOKEN);
      Cookies.remove(USER_DETAILS);
      Cookies.remove("modelclose");
      Cookies.remove("newsAnnounce");
      Cookies.remove(CART_TOTAL);
      Cookies.remove(CARTPRODUCTDETAIL);
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default http;
