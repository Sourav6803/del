import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';



const register = async(userData)=>{
    const responce = await axios.post("http://localhost:9000/register", userData ,{ headers: {
        'Content-Type': 'multipart/form-data',
      },});
    if(responce.data){
        return responce.data
    }
}



const login = async(userData)=>{
    const responce = await axios.post("http://localhost:9000/login", userData);
    if(responce.data){
        if (responce.data) {
            localStorage.setItem("customer", JSON.stringify(responce.data))
        }
        return responce.data
    }
}

const forgotPassToken = async(data)=>{
    const responce = await axios.post("http://localhost:9000/user/forgot-password", data , config);
    if(responce.data){
        if (responce.data) {
            localStorage.setItem("customer", JSON.stringify(responce.data))
        }
        console.log(responce.data)
        return responce.data
    }
}

const updateAUser = async(data)=>{
    const responce = await axios.put("http://localhost:9000/updateUser",data , config)
    if(responce.data){
        return responce.data
    }
}

const resetPass = async(data)=>{
    const responce = await axios.put(`http://localhost:9000/reset-password/${data.token}`, {password:data?.password} )
    if(responce.data){
        return responce.data
    }
}


export const authService = {
    register, login   , updateAUser , forgotPassToken, resetPass,
}