import axios from "axios";

const setAuthenticationToken = (token) => {
  if (token) axios.defaults.headers.common["authentication-token"] = token;
  else delete axios.defaults.headers.common["authentication-token"];
};

export default setAuthenticationToken;
