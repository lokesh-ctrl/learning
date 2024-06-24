import axios from "axios";
import Cookies from "js-cookie";

const API_ENDPOINT = "http://localhost:3000/api";

export const getConversations = async () => {
    try {
        const authToken = Cookies.get('access_token');
        const response = await axios.get(API_ENDPOINT + "/conversations/mine", {headers: {'Authorization': 'Bearer ' + authToken}});
        return {response: response, error: null};
    } catch (error: any) {
        return {error: error.response.data};
    }
}

export const getConversationById = async (id: string) => {
    try {
        const authToken = Cookies.get('access_token');
        const response = await axios.get(API_ENDPOINT + "/conversations/" + id, {headers: {'Authorization': 'Bearer ' + authToken}});
        return {response: response, error: null}
    } catch (error: any) {
        return {error: error.response.data};
    }
}

export const sendMessageIntoConversation = async (convId: string, message: string, senderId: string, receiverId: string) => {
    try {
        const authToken = Cookies.get('access_token');
        const response = await axios.post(API_ENDPOINT + '/messages', {
            content: message,
            conversation_id: parseInt(convId),
            sender_id: senderId,
            receiver_id: receiverId
        }, {headers: {'Authorization': 'Bearer ' + authToken}})
        return response
    } catch (e: any) {
    }
}

export const getMessages = async (convId: string) => {
    try {
        const authToken = Cookies.get('access_token')
        const response = await axios.get(API_ENDPOINT + '/messages/conversation/' + convId, {headers: {'Authorization': 'Bearer ' + authToken}})
        return response;
    } catch (e) {
    }
}