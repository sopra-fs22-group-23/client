import { isProduction } from "../helpers/isProduction";

export const getDomain = () => {
  
    const prodUrl = ''; TODO: insert your groups heroku prod url for server (once deployed)
    const devUrl = 'http://localhost:8080';

    return isProduction() ? prodUrl : devUrl;
};
