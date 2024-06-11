import axios from "axios";
import Cookies from "js-cookie";

const API_ENDPOINT = "http://localhost:3000/api";

export const registerUser = async (data: any) => {
  try {
    const response = await axios.post(API_ENDPOINT + "/register", data);
    Cookies.set("access_token", response.data["access_token"], { expires: 1 });
    return { response: response, error: null };
  } catch (error: any) {
    return { error: error.response.data };
  }
};

export const loginUser = async (data: any) => {
    try {
      const response = await axios.post(API_ENDPOINT + "/login", data);
      Cookies.set("access_token", response.data["access_token"], { expires: 1 });
      return { response: response, error: null };
    } catch (error: any) {
      return { error: error.response.data };
    }
  };
  