import axios from "axios";
const API_URL = 'https://parfum.beknazaryanstudio.ru:8080/api/review';

export default class ReviewService {

    static async create(data, parfum_id) {
        try {
            const response = await axios.post(API_URL, {
                parfum_id: parfum_id,
                fio: data.fio,
                email: data.email,
                text: data.text,
            }, 
            { withCredentials: true });
            return response; 
        } catch (e) {
            return e.response;
        }
    }

    static async getAll() {
        try {
            const response = await axios.get(API_URL)
            return response; 
        } catch (e) {
            return e.response;
        }
    }
}