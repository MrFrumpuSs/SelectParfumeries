import axios from "axios";
const API_URL = 'https://selectparfumeries.ru:8080/api/parfum';

export default class ParfumService {
    
    static async create(data) {
        try {
            let formData = new FormData();
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('sex', data.sex)
            formData.append('brand', data.brand)
            formData.append('variations', JSON.stringify(data.variations))
            formData.append('img', data.img[0])
            formData.append('characteristics', JSON.stringify(data.characteristics))
            formData.append('raspiv', data.raspiv)
            
            const response = await axios.post(API_URL, formData, 
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

    static async update(data, id) {
        try {
            let formData = new FormData();
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('sex', data.sex)
            formData.append('brand', data.brand)
            formData.append('variations', JSON.stringify(data.variations))
            formData.append('img', data.img[0])
            formData.append('characteristics', JSON.stringify(data.characteristics))
            formData.append('raspiv', data.raspiv)
            
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
    
    static async getAll(payload) {
        try {
            const response = await axios.get(API_URL, {
                params:payload
            });
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