import axios from "axios";

const url = "http://192.168.1.6:8888/filipinoalamat/wp-json/wp/v2/";
const errorStatus = {
    error: true,
    message: "Network error, please check your internet connection and try again"
};

export const get = async (query = '') => {
    let response = [];
    await axios.get(url + 'alamat_posts?_embed&search=' + query)
        .then(res => {  
            response = res;
        })
        .catch(() => { 
            data = errorStatus;
        })   
    return {
        data: response.data,
        totalRecords:  response.headers['x-wp-total'],
        totalPages: response.headers['x-wp-totalpages']
    };
}
// This function accept alamat ID as parameter and returns alamat object
export const getById = async (id) => {
    let data = [];
    await axios.get(url + 'alamat_posts/' + id.toString() + '?_embed')
        .then(res => { 
            data = res.data; 
        })
        .catch(() => { 
            data = errorStatus;
        })     
    return data; 
}

export const getAlamatByCategory = async(id,query = '', page=1) => { 
    let response = [];
    const endpoint = url + 'alamat_posts?_embed&alamat=' + id + '&search=' + query + '&per_page=10&page=' + page;
    await axios.get(endpoint)
        .then(res => { 
            response = res; 
        })
        .catch(() => { 
            data = errorStatus;
        })     
    return {
        data: response.data,
        totalRecords:  response.headers['x-wp-total'],
        totalPages: response.headers['x-wp-totalpages']
    };
}

export const getRecommendations = async() => { 
    let response = [];
    await axios.get('http://192.168.1.6:8888/filipinoalamat/wp-json/alamat/api/recommendations?_embed')
        .then(res => { 
            response = res; 
        })
        .catch(() => { 
            data = errorStatus;
        })     
    return {
        data: response.data,
        totalRecords:  response.headers['x-wp-total'],
        totalPages: response.headers['x-wp-totalpages']
    };
}

export const getCategories = async () => {
    let data = []; 
    let url = 'http://192.168.1.6:8888/filipinoalamat/wp-json/alamat/api/taxonomies';
    await axios.get(url)
        .then(res => { 
            data = res.data;  
        })
        .catch(() => {
            data = errorStatus;
        }) 
    return data;
}

export const search = (query) => {
    let response = [];
    axios.get(url + '?search=' + query)
        .then(res => {
            response = res;
        })
        .catch(() => {
            data = errorStatus;
        }) 
    return {
        data: response.data,
        totalRecords:  response.headers['x-wp-total'],
        totalPages: response.headers['x-wp-totalpages']
    };
}