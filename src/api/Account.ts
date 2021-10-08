import axios from 'axios';
import Cookies from 'universal-cookie';
import { config } from './config';
import { ApproveUser } from './types/ApprovedUser';


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

export const account = {
    register,
    getUnApprovedUsers
}