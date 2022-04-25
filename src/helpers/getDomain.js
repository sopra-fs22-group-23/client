import { isProduction } from "../helpers/isProduction";

export const getDomain = () => {
  
    const prodUrl = 'https://sopra-fs22-group-23-server.herokuapp.com/';
    const devUrl = 'http://localhost:8080';

    return isProduction() ? prodUrl : devUrl;
};
