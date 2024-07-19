import axios from "axios";
import Cookies from "js-cookie";

const API_ENDPOINT = "http://localhost:3000/api";

export const registerUser = async (data: any) => {
  try {
    const response = await axios.post(API_ENDPOINT + "/users/register", data);
    Cookies.set("access_token", response.data["access_token"], { expires: 1 });
    return { response: response, error: null };
  } catch (error: any) {
    return { error: error.response.data };
  }
};

export const loginUser = async (data: any) => {
    try {
      const response = await axios.post(API_ENDPOINT + "/users/login", data);
      Cookies.set("access_token", response.data["access_token"], { expires: 1 });
      return { response: response, error: null };
    } catch (error: any) {
      return { error: error.response.data };
    }
  };


export const getMe = async () => {
    try {
        const authToken = Cookies.get('access_token');
        const response = await axios.get(API_ENDPOINT + "/users/me", {headers: {'Authorization': 'Bearer ' + authToken}});
        return {response: response, error: null};
    } catch (error: any) {
        return {error: error.response.data};
    }
};