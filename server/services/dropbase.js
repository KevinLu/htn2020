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

// Takes in the pipeline token and uploads fileUrl to the token
const runPipelineUrl = async (token, fileUrl) => {
    const url = 'https://api2.dropbase.io/v1/pipeline/run_pipeline';
    const data = {
        "token": token,
        "fileUrl": fileUrl
    };
    const response = await axios.post(url, data);

    if (response.status == 200) {
        return response.data;
    } else {
        return "bad request";
    }
}

const runPipelineFile = async (token, filePath) => {
    const url = await getUrlAndId(token).upload_url;
    const data = filePath;
    const config = {
        headers: {
            'Content-Type': 'text/plain'
        }
    };
    
    await axios.post(url, data, config);
}

module.exports = {getUrlAndId, runPipelineUrl, runPipelineFile};
