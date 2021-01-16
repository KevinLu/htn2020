const axios = require('axios');

// returns presigned url (upload_url) and jobid (job_id)
const getUrlAndId = async (token) => {
    const url = 'https://api2.dropbase.io/v1/pipeline/generate_presigned_url';
    const data = {"token": token};
    const response = await axios.post(url, data);
    
    if (response.status == 200) {
        return response.data;
    } else {
        return "bad request";
    }
    
}

module.exports = {getUrlAndId};
