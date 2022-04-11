import { isProduction } from "../helpers/isProduction";

export const getDomain = () => {
  
    const prodUrl = '';
    const devUrl = 'http://localhost:8080';

    return isProduction() ? prodUrl : devUrl;
};
