import axios from 'axios';

export async function login(credentials) {
    console.log(credentials)
    let result = await axios.post(`http://localhost:3001/v1/login`, credentials).then((response)=>{
        console.log(response)
        return response.data.status === "ok" ? response.data.data : false
    })
    .catch((error) => {
        console.error(error);
        return false
    })
    return result !== false ? result : {userId: "notFounded", sessionId: "nifdrnsfk"}
}