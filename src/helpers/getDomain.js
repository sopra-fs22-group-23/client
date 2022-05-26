import { isProduction } from "../helpers/isProduction";

export const getDomain = () => {
  const prodUrl = "https://sopra-fs22-group-23-server.herokuapp.com/";
  const devUrl = 'https://sopra-fs22-group-23-server.herokuapp.com/';
  // const devUrl = "http://localhost:8080";

  return isProduction() ? prodUrl : devUrl;
};

export const getDomainWS = () => {
  const prodUrl = "wss://sopra-fs22-group-23-server.herokuapp.com/websockets";
  const devUrl = "ws://localhost:8080/websockets";

  return isProduction() ? prodUrl : devUrl;
};
