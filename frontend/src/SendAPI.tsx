import axios from 'axios'
import buildPath from './Path'

const sendAPI = async (method:any, path:any, data:any = null) => {
    
    const config = {
        method,
        url: buildPath(path),
        params: '',
        data: ''
    }
    if(method === 'get') config.params =  data;
    else config.data = data;
    const res = await axios(config);
    return res;
}


export default sendAPI;