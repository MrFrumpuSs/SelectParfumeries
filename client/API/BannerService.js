import axios from "axios";
const API_URL = 'https://selectparfumeries.ru:8080/api/banner';

export default class BannerService {
    
    static async update(data, id) {
        try {
            let formData = new FormData();
            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('btnname', data.btnname)
            formData.append('link', data.link)
            formData.append('white', data.white)
            formData.append('img', data.img[0])
            
            const response = await axios.patch(API_URL + '/' + id, formData, 
            { 
                withCredentials: true,
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