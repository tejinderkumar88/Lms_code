import axios from 'axios';





const config = {

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}


const instance = axios.create({
    baseURL:  process.env.NEXT_PUBLIC_BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

const broadcastAuthInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/broadcasting/`,
    headers: {  
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    console.log('errorIntercept')
    return Promise.reject(error);
});





export {  instance ,broadcastAuthInstance };