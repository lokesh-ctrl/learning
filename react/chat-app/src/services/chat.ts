import axios from "axios";
import Cookies from "js-cookie";

const API_ENDPOINT = "http://13.233.130.111:3000/api";

export const getConversations = async () => {
    try {
        const authToken = Cookies.get('access_token');
        const response = await axios.get(API_ENDPOINT + "/conversations/mine", {headers: {'Authorization': 'Bearer ' + authToken}});
        console.log(response);
        return {response: response, error: null};
    } catch (error: any) {
        console.log(error.response.data);
        return {error: error.response.data};
    }
}