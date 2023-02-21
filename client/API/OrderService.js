import axios from "axios";
const API_URL = 'https://parfum.beknazaryanstudio.ru:8080/api/order';

export default class OrderService {

    static async create(data) {
        try {
            const response = await axios.post(API_URL, {
                name: data.name,
                sname: data.sname,
                number: data.number,
                email: data.email,
                adress: data.adress,
                cart: data.cart
            }, 
            { withCredentials: true });
            return response; 
        } catch (e) {
            return e.response;
        }
    }

    static async getOne(id) {
        try {
            const response = await axios.get(API_URL + '/' + id);
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