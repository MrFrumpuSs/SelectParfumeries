import axios from "axios";
const API_URL = 'https://parfum.beknazaryanstudio.ru:8080/api/request';

export default class RequestService {

    static async create(data) {
        try {
            const response = await axios.post(API_URL, {
                aroma: data.aroma,
                fio: data.fio,
                number: data.number,
                email: data.email
            }, 
            { withCredentials: true });
            return response; 
        } catch (e) {
            return e.response;
        }
    }

    static async getAll(payload) {
        try {
            const response = await axios.get(API_URL, {
                params: payload,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                } 
            });
            return response; 
        } catch (e) {
            return e.response;
        }
    }
}