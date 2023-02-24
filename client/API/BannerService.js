import axios from "axios";
const API_URL = 'https://selectparfumeries.ru:8080/api/banner';

export default class BannerService {

    static async getAll() {
        try {
            const response = await axios.get(API_URL)
            return response; 
        } catch (e) {
            return e.response;
        }
    }

    /*static async auth() {
        try {
            const response = await axios.get(API_URL + '/auth', 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }, 
            { withCredentials: true })
            if(!response.data?.error) {
                localStorage.setItem('token', response.data.token);
            }
            return response; 
        } catch (e) {
            localStorage.removeItem('token');
            return e.response;
        }
    }*/
}