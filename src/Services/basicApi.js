import axios from 'axios';
const API_PATH = process.env.REACT_APP_BASE_API_PATH + 'api/v1/';


axios.defaults.withCredentials = true;

export const axiosConfigReturn = (path, method = 'get', pathType = null) => {
    return {
        method: method,
        url:  API_PATH  + path,
        headers: {
            'Content-Type': 'application/json',
        },
    };
}

export const postAPI = async(path, data, temHeader) =>{
    let base_path = API_PATH + path;
    let headers = {
        'Accept': 'application/json', 
        'fcmToken': 'dfkldjflksdjfl',
        'platform' : 'web',
        ...temHeader
    };
    var result = await new Promise((resolve, reject) => {
        axios.post(base_path, data, {
            headers: headers}).then((response)=>{
              resolve(response?.data);
        },(err)=>{
            resolve(null);
        });
    })
    return result;
};

export const getAPI = async(path, temHeader) =>{
    let base_path = API_PATH + path;
    let headers = {
        'Accept': 'application/json',
    };

    var result = await new Promise((resolve, reject) => {
        axios.get(base_path, {headers: headers}).then((response)=>{
            if (response.status >= 400 && response.status < 600) {
                reject(Error("get api error"));
                throw new Error("Bad response from server");
              }
              resolve(response.data );
        },(err)=>{
            resolve(null);
        })
    })
    return result;
};

export const putAPI = async(path, data, temHeader) =>{
    let base_path = API_PATH + path;
    var result = await new Promise((resolve, reject) => {
        axios.put(base_path, data, {
            headers: {
                'Accept': 'application/json',
                ...temHeader
            }}).then((response)=>{
            if (response.status >= 400 && response.status < 600) {
                reject(Error("put api error"));
                throw new Error("Bad response from server");
              }
              resolve(response.data );
        },(err)=>{
            resolve(null);
        })
    })
    return result;
};

export const deleteAPI = async(path,data,  temHeader, ) =>{
    let base_path = API_PATH + path;
    var result = await new Promise((resolve, reject) => {
        var config = {
            method: 'delete',
            url: base_path,
            headers: {
                'Accept': 'application/json',
                'fcmToken': 'dfkldjflksdjfl',
                'platform' : 'web',
                ...temHeader
            },
            // data : data
          };
          axios(config).then((response)=>{
            if (response.status >= 400 && response.status < 600) {
                reject(Error("delete api error"));
                throw new Error("Bad response from server");
              }
              resolve( response.data );
        },(err)=>{
            resolve(null);
        })
    })
    return result;
};
