// LIBRARY IMPORT
import axios from 'axios'

// ====================== MAIN CODE ========================
const TokenHandle = (token, callback) =>{

    const formData = new FormData();
    formData.append('access_token', token);
    console.log(token)
    axios
        .post('https://cybersmartserver.as.r.appspot.com/CheckToken', formData, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })

        .then(response => {
            const data = response.data
            if(data){
                callback()
            } else {
                console.log('Access token invalid')
            }
        })
        .catch(error => {
            console.error(error)
        })
}

export default TokenHandle