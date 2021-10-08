import react from 'react'
import {useCookies} from 'react-cookie'
import { withCookies } from 'react-cookie';
import axios from 'axios'   

const LoginPage = () => {

    const REFRESH_TOKEN = 'refresh_token'
    const ACCESS_TOKEN = 'access_token'

    const [cookies, setCookie] = useCookies()
    const [email, setEmail] = react.useState('')
    const [password, setPassword] = react.useState('')

    function handleEmailChange(event: any) {    
        setEmail(event.target.value);  
     }
       
      function handlePasswordChange(event: any) {    
        setPassword(event.target.value);  
     }

    function handleSubmit(event: any){
        event.preventDefault();
    
        axios.post("https://localhost:5001/api/Account/Login", {Email: email, Password: password})
          .then(res => {
            axios.post(`https://localhost:5001/api/Account/Refresh?refreshToken=${res.data.refreshToken}`)
            .then(res => {
                setCookie(REFRESH_TOKEN, res.data.data.refreshToken)
                setCookie(ACCESS_TOKEN, res.data.data.token)
            })
            .catch((error) => {
                console.log(error);
          })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <form onSubmit={handleSubmit}>
                <p>
                    <label>Email:</label><br />
                    <input type="text" value={email} onChange={handleEmailChange}/>
                </p>
                <p>
                    <label>Password:</label><br />
                    <input type="text" value={password} onChange={handlePasswordChange}/>
                </p>
                <input type="submit" value="Войти" />
            </form>
    )
}

export default withCookies(LoginPage)