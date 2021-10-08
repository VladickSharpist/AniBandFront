

const baseURL = 'https://localhost:5001/api'


const endpoints: ApiEndpointsType = {
    account: `${baseURL}/account/`,
    comment: `${baseURL}/comment/`,
    video: `${baseURL}/video/`,
    season: `${baseURL}/season/`
};

const config: ConfigType = {
    apiEndpoints: endpoints,
};
  
type ApiEndpointsType = {
    account: string,
    comment: string,
    video: string,
    season: string
};

type ConfigType = {
    apiEndpoints: ApiEndpointsType,
};

export { config };
  