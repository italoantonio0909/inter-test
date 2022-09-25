import axios from 'axios';


const baseUrl = `https://pokeapi.co/api/v2`;

/**
 * Instancia de Axios para la API principal
 * @return {AxiosInstance}
 */
const mainApi = axios.create();

mainApi.interceptors.request.use(
    async function (config) {

        config.baseURL = `${baseUrl}`;
        return config;
    },
    function (error: any) {
        return Promise.reject(error);
    }
);


export { mainApi, baseUrl };
