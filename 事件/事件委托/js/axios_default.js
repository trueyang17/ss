if (typeof axios !== 'undefined') {
    axios.defaults.baseURL = 'http://localhost:4400';
    axios.defaults.withCredentials = true; //允许跨域
    axios.defaults.transformRequest = data => {
        let str = '';
        if (data && typeof data === 'object') {
            for (const key in object) {
                if (data.hasOwnProperty(key)) {
                    str += `${key} = ${data[key]}&`
                }
            }
        }
        return str.substring(0,str.length - 1);
    }
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.interceptors.response.use(result => result.data);
}