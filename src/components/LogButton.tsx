import { useMutation } from "react-query"
import styled from "styled-components"
import { api } from "../api/api"
import { useAuthState } from "../hooks/useAuthState"
import { openRouteLogin } from "../routes"

export default function LogButton() {

    const user = useAuthState()

    const logoutRequest = useMutation(api.account.logout,{
        onSuccess: (response) => {
            if(response.isSuccessful){
                user.logout()
            }
        }
    })

    function handleLogout(){
        logoutRequest.mutate()
    }

    function handleLogin(){
        openRouteLogin()
    }

    return(
        user.isAuthenficated 
        ? <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        : <LoginButton onClick={handleLogin}>Login</LoginButton>
    )
}

const LoginButton = styled.button``
const LogoutButton = styled.button``