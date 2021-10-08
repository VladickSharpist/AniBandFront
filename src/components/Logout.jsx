import axios from "axios"
import Cookies from "universal-cookie"

const Logout = () => {

    const cookies = new Cookies()
    const REFRESHTOKEN_KEY = 'refresh_token';
    const ACCESS_KEY = 'access_token';

    const config = {
        headers: { Authorization: `Bearer ${cookies.get(ACCESS_KEY)}` }
    };

    function handleClick(event) {    
        axios.post("https://localhost:5001/api/Account/Logout", {}, config)
        .then(res => {
            cookies.remove(REFRESHTOKEN_KEY)
            cookies.remove(ACCESS_KEY)
        })
    }

    return(
        <button onClick={handleClick}>Logout</button>
    )
}

export default Logout