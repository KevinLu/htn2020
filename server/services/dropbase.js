const axios = require('axios');

const getPresignedURL = async (token) => {
    const url = 'https://api2.dropbase.io/v1/pipeline/generate_presigned_url';
    const data = {"token": token};
    const response = await axios.post(url, data);
    
    if (response.status == 200) {
        return response.data.upload_url;
    } else {
        return "bad request";
    }
    
}

const getJobId = async (token) => {
    console.log('asdsa');
    const url = 'https://api2.dropbase.io/v1/pipeline/generate_presigned_url';
    const data = {"token": token};
    const response = await axios.post(url, data);
  
    if (response.status == 200) {
        return response.data.job_id;
    } else {
        return "bad request";
    }
}

module.exports = {getPresignedURL, getJobId};
