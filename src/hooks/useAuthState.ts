import jwtDecode, { JwtPayload } from "jwt-decode"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"

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
    const isAuthenficated = cookie.get(REFRESH_TOKEN)? true : false

    function isInRole(checkRole: string){
        const decodedToken = jwtDecode<AccessToken>(cookie.get(ACCESS_TOKEN))
        return decodedToken.Role === checkRole? true : false
    }

    function getAccessToken(): string{
        return cookie.get(ACCESS_TOKEN)
    }

    return {
        isAuthenficated,
        isInRole,
        getAccessToken
    }
}

export { useAuthState }