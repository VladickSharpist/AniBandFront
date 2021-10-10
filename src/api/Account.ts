import axios from 'axios';
import Cookies from 'universal-cookie';
import { config } from './config';
import { ApproveUser, RefreshResponse, RefreshToken } from './types/types';


type HttpRequestResponse<T> = {
    data: T,
    isEmpty: boolean,
    statusCode: number,
    errors: string[],
    isSuccessful: boolean
}

const token = (new Cookies).get('access_token')

const accountService = axios.create(
    { 
        baseURL: config.apiEndpoints.account, 
        headers:{
            Authorization: "Bearer " + token,
        } 
    });

async function register(data: {
    username: string, 
    email: string, 
    password: string, 
    confirmPassword: string 
}) {
    const response = await accountService.post<
      HttpRequestResponse<any>>(`/Register`, data);
    return response.data;
}

async function getUnApprovedUsers() {
    const response = await accountService.get<
      HttpRequestResponse<Array<ApproveUser>>>(`/GetUnApprovedUsers`);
    return response.data;
}

async function logout(){
    const response = await accountService.get<
    HttpRequestResponse<any>>(`/Logout`);
    return response.data
}

async function login(data: { email: string, password: string}){
    const response = await accountService.post<
    HttpRequestResponse<RefreshToken>>(`/Login`, data);
    return response.data
}

async function refresh(refreshToken: string ){
    const response = await accountService.post<
    HttpRequestResponse<RefreshResponse>>(`/Refresh`, {}, { params: { refreshToken: refreshToken }});
    return response.data
}

export const account = {
    register,
    getUnApprovedUsers,
    logout,
    login,
    refresh
}