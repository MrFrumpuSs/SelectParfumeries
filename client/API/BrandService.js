import axios from "axios";
const API_URL = 'https://parfum.beknazaryanstudio.ru:8080/api/brand';

export default class BrandService {

    static async create(data) {
        try {
            const response = await axios.post(API_URL, {
                name: data.name
            }, 
            { 
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                } 
            });
            return response; 
        } catch (e) {
            return e.response;
        }
    }

    static async update(data, id) {
        try {
            const response = await axios.patch(API_URL + '/' + id, {
                name: data.name
            }, 
            { 
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
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

    static async getOne(id) {
        try {
            const response = await axios.get(API_URL + '/' + id);
            return response; 
        } catch (e) {
            return e.response;
        }
    }
    
    static async delete(id) {
        try {
            const response = await axios.delete(API_URL + '/' + id, 
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            });
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