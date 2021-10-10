import jwtDecode, { JwtPayload } from "jwt-decode"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import Cookies from "universal-cookie"
import { api } from "../api/api"

const REFRESH_TOKEN = 'refresh_token'
const ACCESS_TOKEN = 'access_token'

type AccessToken =  {
    iss: string,
    exp: number,
    Id: string,
    Role: string,
    Permission: string[]
} & JwtPayload

function useAuthState(){

    const [cookie, setCookie] = useState<Cookies>(new Cookies)
    const [isAuthenficated, setIsAuthenficated] = useState(cookie.get(REFRESH_TOKEN)? true : false)

    function isInRole(checkRole: string){
        const decodedToken = jwtDecode<AccessToken>(cookie.get(ACCESS_TOKEN))
        return decodedToken.Role === checkRole? true : false
    }

    function getAccessToken(): string{
        return cookie.get(ACCESS_TOKEN)
    }

    function logout() {
        cookie.remove(REFRESH_TOKEN)
        cookie.remove(ACCESS_TOKEN)
        setIsAuthenficated(false)
    }

    function login(data: {refreshToken: string, token: string}) {
        cookie.set(REFRESH_TOKEN, data.refreshToken)
        cookie.set(ACCESS_TOKEN, data.token)
        setIsAuthenficated(true)
    }

    return {
        isAuthenficated,
        isInRole,
        getAccessToken,
        logout,
        login
    }
}

export { useAuthState }