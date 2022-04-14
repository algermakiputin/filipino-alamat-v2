import axios from "axios";

const url = "http://192.168.1.3:8888/filipinoalamat/wp-json/wp/v2/alamat_posts";

export const get = async () => {
    let data = [];
    await axios.get(url + '?_embed')
        .then(res => { 
            data = res.data;
        })
        .catch(err => {
            console.log(err)
        }) 
    return data;
}

export const getById = async (id) => {
    let data = [];
    await axios.get(url + '/' + id + '?_embed')
            .then(res => {
                data = res.data
            })
            .then(err => {
                console.log(err)
            })
    return data;
}

export const getByCategories = () => {
    let data = [];
    axios.get(url)
        .then(res => {
            data = res.data;
        })
        .catch(err => {
            console.log(err)
        })

    return data;
}