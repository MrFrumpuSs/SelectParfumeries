import axios from "axios";
const API_URL = 'https://selectparfumeries.ru:8080/api/review';

export default class ReviewService {

    static async create(data, parfum_id) {
        try {
            let formData = new FormData();
            formData.append('parfum_id', parfum_id);
            formData.append('fio', data.fio);
            formData.append('email', data.email);
            formData.append('text', data.text);
            if(data.img) {
                formData.append('img', data.img[0]);
            }
            

            const response = await axios.post(API_URL, formData, 
            { 
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
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